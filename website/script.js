console.log("Hello Client");

//lets do a fetch

const postData = async (url="", data = {}) => {
    const response = await fetch( url, {
        method: 'POST',
        headers: {
            'content-type':'application/json'
        },
        body: JSON.stringify(data)
    });
};

const dummyData = {temp: 32, date: "Monday 1st March", userResponse: "its a nice day"};

postData("/sendData", dummyData);

//weather API
const apiKey = '';
let loc = 'Southampton';

const getWeatherData = async(url = "") => {
    const response = await fetch(url);

    try{
        const data = await response.json();
        console.log(data);
    } catch (error){
        console.log("There has been an error");
        console.log(error);
    }
}

let apiURL = `http://api.openweathermap.org/data/2.5/weather?q=${loc}&appid=${apiKey}&units=metric`;
getWeatherData(apiURL);
