import {key} from "./apikey.js"; 
//key for the API call saved in a different file so its not publicly exposed on Github

//Data structure to send data back to the server
function postDataObj(temp, date, userResponse, wind, description, icon, location){
    this.temp = temp;
    this.date = date;
    this.userResponse = userResponse;
    this.wind = wind;
    this.description = description;
    this.icon = icon;
    this.location = location;
}

/**
 * Callback that runs when the search button is clicked. Constructs URL to gather weather data from Open Weather API
 * Validates user input and uses async functions and promises to:
 * - Get requested data from open weather api
 * - POST that data, user comments and todays date to the local server
 * - Retrieve the latest saved data
 * - Update the client UI to display all the data 
 * @param {*} event 
 */
const buttonCallback = (event) => {
    event.preventDefault();

    //get data for open weather API Call
    const zip = document.getElementById('zip').value;
    const country = document.getElementById('country').value;
    let url = `http://api.openweathermap.org/data/2.5/weather?zip=${zip},${country}&appid=${key}&units=metric`;

    //get comments for input validation
    const comments = getUserComments();

    //input validation
    if (zip === '' || country === '' || comments === ''){
        alert("ERROR - One or more input fields are blank");
        return;
    }

    //api calls
    getAPICall(url)
    .then((data) => postData('/sendData', data))
    .then(() => getAPICall('/data-latest'))
    .then((values) => updateUI(values))
    .catch((error)=>alert(error));
};

//get button and add on event listener for when the button is clicked
const button = document.querySelector('#generate');
button.addEventListener('click', buttonCallback);

/**
 * An asynchronise function that posts weather data and user data to the local server
 * @param {*} url - The url to send the post request too
 * @param {*} data - The data to send to the post request
 */
const postData = async (url="", data = {}) => {
    //gather data to post
    const date = todaysDateString();
    const temp = data.main.temp;
    const comments = getUserComments();
    const description = data.weather[0].description;
    const wind = data.wind;
    const icon = data.weather[0].icon;
    const location = data.name;

    //create new object with that data
    const obj = new postDataObj(temp, date, comments, wind, description, icon, location);
    const response = await fetch( url, {
        method: 'POST',
        headers: {
            'content-type':'application/json'
        },
        body: JSON.stringify(obj)
    });

    //check the server got the API request
    if (response.status != 200){
        throw `Did not get response from POST API call to - ${url}`;
    }

    //check the data was received at the server
    //if the status is complete then continue
    //if not then there was an error and report it
    try{
        const status = await response.json();
        console.log(status);
        if (status.status == 'complete'){
            return data;
        } else {
            throw `Server could not save data`;
        }
    } catch(error){
        throw error;
    }
};

/**
 * Simple function that returns a object representing now
 */
const todaysDate = () => {
    return new Date();
}

/**
 * Simple function that returns today date as a string
 */
const todaysDateString = () => {
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return todaysDate().toLocaleDateString('en-UK', options);
}

/**
 * Simple function to get the user comments from the textarea on the client UI
 */
const getUserComments = () => {
    return document.getElementById('feelings').value;
}

/**
 * Asynchronise function for generic GET API call
 * @param url - url to make the API call too
 */
const getAPICall = async(url = '') => {
   
        const response = await fetch(url);
        //if server doesnt respond with OK then throw error
        if (response.status != 200){
            throw `Did not get response from GET API call to - ${url}`;
        }
        //parse response into JSON and return data
        try{
            const data = await response.json();
            return data;
        } catch (error){
            throw error;
        }
}

/**
 * Asynchronise function that updates the UI with data returned from the local server
 * @param {*} data - data used to update the UI
 */
const updateUI = async (data)=>{
    try{
        document.getElementById('temp').innerHTML = `${data.temp} &#176;C`;
        document.getElementById('wind').innerHTML = `${data.wind.deg}&#176; ${data.wind.speed} m/s`;
        document.getElementById('content').innerHTML = `${data.userResponse}`;
        document.getElementById('date').innerHTML = `${data.date}`;
        document.getElementById('weather-description').innerHTML = `${data.description}`;
        document.getElementById('location').innerHTML = `${data.location}`;
        //set the weather icon
        const icon = data.icon;
        document.querySelector('.weather-result-image-container').setAttribute('style',`background-Image: url(http://openweathermap.org/img/wn/${icon}@2x.png);`);
        //hide placeholder and show results
        document.querySelector('.weather-placeholder').setAttribute('style','display: none;');
        document.querySelector('.weather-results').setAttribute('style','display: flex;');
    } catch(error){
        throw error;
    }
};


