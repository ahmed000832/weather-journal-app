/*Server*/

// Setup empty JS array to act as endpoint for all routes
projectData = {};
// Install Express to run server and routes
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const app = express(); // Start up an instance of app
// _________________________________________________________________________________________
app.use(bodyParser.urlencoded({ extended: false })); /* Middleware*/ //Here we are configuring express to use body-parser as middle-ware.
app.use(bodyParser.json());
app.use(cors());  // Cors for cross origin allowance
app.use(express.static('website')); // Initialize the main project folder
// _________________________________________________________________________________________
const port = 3000; //Setup server
app.listen(port, (req,res) => { 
  console.log('the server is running...'); //Feedback to console.log
  console.log('running on Localport :'+ port); //Feedback to console.log
});
//Get reqest to send data to app.js
app.get('/all',(req,res)=>{  
  res.send(projectData);
  projectData = {}; //To make projectData empty before the next generate
});
// _________________________________________________________________________________________
//Post reqest to receive data from app.js
app.post('/add',(req,res)=>{
  newsave = {
    date : req.body.date, //Reset value of date
    temp : req.body.temp, //Reset value of temp
    content : req.body.content  //Reset value of content
  };
  projectData={newsave} //To replace data in newsave in projectData by newdata in newsave to end point of my project that is projectData = []
  // Console.log(nEntry);  
});

// _________________________________________________________________________________________

/* Finish  */
