import {key} from "./apikey.js"; 

function postDataObj(temp, date, userResponse, wind, description, icon, location){
    this.temp = temp;
    this.date = date;
    this.userResponse = userResponse;
    this.wind = wind;
    this.description = description;
    this.icon = icon;
    this.location = location;
}

const buttonCallback = (event) => {
    event.preventDefault();

    //get data for open weather API Call
    const zip = document.getElementById('zip').value;
    const country = document.getElementById('country').value;
    let url = `http://api.openweathermap.org/data/2.5/weather?zip=${zip},${country}&appid=${key}&units=metric`;

    //api calls
    getAPICall(url)
    .then((data) => postData('/sendData', data))
    .then(() => getAPICall('/data-latest'))
    .then((values) => updateUI(values)); 
    //catch the errors here
};

const button = document.querySelector('#generate');
button.addEventListener('click', buttonCallback);


const postData = async (url="", data = {}) => {
    //gather data to post
    const date = todaysDateString();
    const temp = data.main.temp;
    const comments = getUserComments();
    const description = data.weather[0].description;
    const wind = data.wind;
    const icon = data.weather[0].icon;
    const location = data.name;

    const obj = new postDataObj(temp, date, comments, wind, description, icon, location);
    const response = await fetch( url, {
        method: 'POST',
        headers: {
            'content-type':'application/json'
        },
        body: JSON.stringify(obj)
    });

    //check the data was received at the server
    //if the status is Send Complete then continue
    //if not then there was an error and report it
    try{
        const status = await response.json();
        console.log(status);
        // if (status === 'complete'){
        //     return data;
        // } else {
        //     throw "Server could not save data";
        // }
        console.log('hello from postData');
        return data;
    } catch(error){
        console.log(error);
    }


};

const todaysDate = () => {
    return new Date();
}

const todaysDateString = () => {
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return todaysDate().toLocaleDateString('en-UK', options);
}

const getUserComments = () => {
    return document.getElementById('feelings').value;
}

const getAPICall = async(url = '') => {
   
        const response = await fetch(url);
        try{
            const data = await response.json();
            console.log(data);
            return data;
        } catch (error){
            console.log(error);
            throw error;
        }
}

const updateUI = async (data)=>{
    console.log("update UI");
    console.log(data);
    document.getElementById('temp').innerHTML = `${data.temp} &#176;C`;
    document.getElementById('wind').innerHTML = `${data.wind.deg}&#176; ${data.wind.speed} m/s`;
    document.getElementById('content').innerHTML = `${data.userResponse}`;
    document.getElementById('date').innerHTML = `${data.date}`;
    document.getElementById('weather-description').innerHTML = `${data.description}`;
    document.getElementById('location').innerHTML = `${data.location}`;
    //set the weather icon
    const icon = data.icon;
    console.log(document.querySelector('.weather-result-image-container'));
    document.querySelector('.weather-result-image-container').setAttribute('style',`background-Image: url(http://openweathermap.org/img/wn/${icon}@2x.png);`);
    //hide placeholder and show results
    document.querySelector('.weather-placeholder').setAttribute('style','display: none;');
    document.querySelector('.weather-results').setAttribute('style','display: flex;');
};


