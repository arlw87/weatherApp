import {key} from "./apikey.js"; 

function postDataObj(temp, date, userResponse){
    this.temp = temp;
    this.date = date;
    this.userResponse = userResponse;
}

const button = document.querySelector('#generate');
button.addEventListener('click', (event) => {
    event.preventDefault();
    //get Data from form
    const zip = document.getElementById('zip').value;
    const country = document.getElementById('country').value;
    let apiURL = `http://api.openweathermap.org/data/2.5/weather?zip=${zip},${country}&appid=${key}&units=metric`;
    //api calls
    getWeatherData(apiURL)
    .then((data) => postData('/sendData', data))
    .then((values) => updateUI(values)); 
});


const postData = async (url="", data = {}) => {
    //gather data to post
    const date = todaysDate();
    const temp = data.main.temp;
    const comments = getUserComments();

    const obj = new postDataObj(temp, date, comments);
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
        console.log(response);
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
    return document.getElementById('feeling').value;
}

const getWeatherData = async(url = "") => {
    const response = await fetch(url);

    try{
        const data = await response.json();
        console.log(data);
        return data;
    } catch (error){
        console.log("There has been an error");
        console.log(error);
        throw error;
    }
}

const updateUI = async (data)=>{
    document.getElementById('temp').innerHTML = `${data.main.temp} &#176;C`;
    document.getElementById('wind').innerHTML = `${data.wind.deg}&#176; ${data.wind.speed} m/s`;
    document.getElementById('content').innerHTML = `${getUserComments()}`;
    document.getElementById('date').innerHTML = `${todaysDateString()}`;
    document.getElementById('weather-description').innerHTML = `${data.weather[0].description}`;
    document.getElementById('location').innerHTML = `${data.name}`;
    //set the weather icon
    const icon = data.weather[0].icon;
    console.log(document.querySelector('.weather-result-image-container'));
    document.querySelector('.weather-result-image-container').setAttribute('style',`background-Image: url(http://openweathermap.org/img/wn/${icon}@2x.png);`);
};


