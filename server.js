//Local server that hosts the static webpage and provides an API Interface for
//saving weather data and retrieving that saved data

//imports
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

//start instance of express
const app = express();

//configure express to use bodyParser as middleware
app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());

//configure express to use cors as middleware
app.use(cors());

//serves up static files at the root page from the folder website
app.use(express.static('website'));

//starts the server
const port = 8000;
const server = app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});

//all posted data saved in this array
let projectData = {};

//Server end points

/**
 * @description: GET request that returns the last saved data in the projectData object
 */
app.get('/data-latest', (req, res) => {
    res.send(projectData);
});

/**
 * @description: POST request to save the data send from the client into projectData array. 
 * If the save is succesful then the status complete is sent back, if its not, incomplete is
 * sent back
 */
app.post('/sendData', (req, res) => {

    try{
        projectData = req.body;
        res.send({status : 'complete'});
    } catch(error) {
        console.log(error);
        //if there was an issue let the client know
        res.send({status : 'incomplete'});
    }

});