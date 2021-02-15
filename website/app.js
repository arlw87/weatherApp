import {key} from "./apikey.js"; 

function postDataObj(temp, date, userResponse){
    this.temp = temp;
    this.date = date;
    this.userResponse = userResponse;
}


//TODO
//backgorund color and button color change depending on the weather 
//blue for rain
//grey for clouds
//yellow for sun?

const button = document.querySelector('#generate');
button.addEventListener('click', (event) => {
    event.preventDefault();
    console.log("Hello Client");
    //get Data from form
    const zip = document.getElementById('zip').value;
    const country = document.getElementById('country').value;
    // let apiURL = `http://api.openweathermap.org/data/2.5/weather?q=${loc}&appid=${key}&units=metric`;
    let apiURL = `http://api.openweathermap.org/data/2.5/weather?zip=${zip},${country}&appid=${key}`;
    console.log(apiURL);

    getWeatherData(apiURL)
    .then((data) => postData('/sendData', data))
    .then((values) => updateUI(values)); 

});



//lets do a fetch

const postData = async (url="", data = {}) => {

    //gather data to post
    const userComments = document.getElementById('feeling').value;
    const date = todaysDate();
    const temp = data.main.temp;

    const obj = new postDataObj(temp, todaysDate(), userComments);
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
    const today = new Date();
    return today.toUTCString();
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
    console.log('hello from updatUI');
    console.log(data);
    //update the UI here
    // console.log(document.getElementById('temp'));
    document.getElementById('temp').innerHTML = `Temperature: ${data.main.temp}`;
};


