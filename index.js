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

//data
const data = {
    location: "Horsham",
    temperature: 5,
    feeling: "good"
}

const dataArray = [];

//API
app.get('/data', (req, res) => {
    //JSON.stringify - convert Javascript object or value into a JSON string
    //res.end(JSON.stringify(data));
    res.send(data);
});

app.post('/sendData', (req, res) => {
    console.log(`PUT API CALL`);
    console.log(req.body);
    res.send("Send Complete");
});

app.post('/', (req, res) => {
    console.log("Request recieved");
});


