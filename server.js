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
//put your static website here
app.use(express.static('website'));


const port = 8000;
const server = app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});

const projectData = [];

//API
app.get('/data-all', (req, res) => {
    res.send(projectData);
});

app.get('/data-latest', (req, res) => {
    res.send(projectData[projectData.length-1]);
});

app.post('/sendData', (req, res) => {

    try{
        projectData.push(req.body);
        res.send({status : 'complete'});
    } catch(error) {
        console.log(error);
        //if there was an issue let the client know
        res.send({status : 'incomplete'});
    }

});

app.post('/', (req, res) => {
    console.log("Request recieved");
});


