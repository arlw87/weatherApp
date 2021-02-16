# weatherApp

A simpe weather application that displays basic weather information and graphics for the location that the user entered.

This is a full stack solution that includes a backend server created using Node with Express and a frontend webpage using html, css and vanilla javascript.

## How to use

The weather data is gathered using the [Open Weather Map API](https://openweathermap.org/api). To use this API you need an API key, this has not been included in this repo for security reasons. To add an API key to the project create a file called apikey.js in the website folder and add the following line of code:

```
export const key = '';
```

Enter your own API key between the quotion marks.

To run the project goto the root directory of the project on a command line program, make sure you have node installed (this project was developed using v14.15.4). Then do the following:

- Install all the project dependencies using `npm install`
- Add the apikey.js file with your own API key as described above
- Start the Node server `node server.js`
- Visit http://localhost:8000/ in your browser

### Using the Frontend interface

Type in a ZIP code for somewhere in the USA. Use the Country code US and then type in a comment on how you feel. Click the search button and see the displayed results.

Note the app has only been tested for the USA.

## Overview

### Frontend

The front end client is a responsive, mobile ready, webpage. The user enters the ZIP code for the location they want to find the weather for and the country 'US'. They also enter a brief comment on how they feel. Once they click search the app will:

- Gather the weather data from the Open Weather Map API using a GET request
- Bundle a selection of that data up with the Date and the user comment and POST that to the local server
- Use a GET request to the local server to gather the latest searched for weather which was just posted
- Display that data on the UI with text and graphics

The user interface provides a basic validation, where if there are any blank input boxes when the user clicks search an error will be displayed. The GET and POST request are handled in the javascript using the fetch API. The javascript uses asynchronous functions and promises to control the flow of the fetch calls and the updating of the UI.

### Backend

The backend is a node server using the express framework. It uses body-parser and cors for middleware.
It provides a basic API with 2 GET endpoint and one POST endpoint.

_POST ‘/sendData’_ – This receives JSON data converts it into a object and saves it to the projectData array.

_GET ‘/data-latest’_ – Sends the last data object saved to the projectData array in JSON format.

_GET ‘/data-all’_ – returns all the data saved in projectData in JSON format.
