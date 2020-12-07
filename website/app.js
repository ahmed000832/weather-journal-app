/*clint*/

/* Global Variables */
const baseURL = 'http://api.openweathermap.org/data/2.5/weather?q='; //baseURL of api on https://openweathermap.org/api
const apiKey = '&APPID=/*apikey*/&units=metric'; //my api key after sign up on https://openweathermap.org/api

// Create a new date instance dynamically with JS
const d = new Date();
const newDate = d.getMonth()+ 1 +'.'+ d.getDate()+'.'+ d.getFullYear(); //add 1 to getMonth to correct its value
// ______________________________________________________________________________________
//Add event by click to button go to start generate data to user

document.getElementById('generate').addEventListener('click', performAction);
function performAction(e){
    const zipCode = document.getElementById('zip').value //get zip code from document<input> that be entered by the user
    const userfeeling = document.getElementById('feelings').value //get feelings from document<textarea> that be entered by the user
if (zipCode == "") { //In order to make it clear to the user that the zipcod must be entered
      alert("zipCode must be filled out");
      return false;
    };
  // ____________________________________________________________________________________
  //Collect the path to call weather data from https://openweathermap.org/api
    const gettemp = async(baseURL , zipCode , apiKey)=>{  //use promise method
        const res = await fetch(baseURL + zipCode + apiKey);
         try{
         const adata = await res.json();
        //  console.log(adata);  =======>>>>  // to test code
         return adata;
         }catch(error){
         console.log('error' , error);

        };
 
     }; 
          

     
    const postData =  async (url = '' , data = {}) => {   //use promise method
        console.log(data);
        const response = await fetch(url,{    //send function to server
            method:'POST',
            credentials:'same-origin',
            headers:
                {
                'Content-type':'application/json'
                },
            body: JSON.stringify(data)  //convert data to string data to nEntry in the end point is object

        });
        try{ //resolve
            const newdata = await response.json(); //convert data to string data
            // console.log(newdata);
            return newdata
        }catch(error){
            console.log('error' , error);  // if reject print error

        };
    };
    // _____________________________________________________________________________________
    //function of update UI 
    const updateUI = async ()=>{
        const request = await fetch('/all') //By get method to get data by route called /all
        try{
            const UIdata = await request.json();
            document.getElementById('date').innerHTML = 'Date:' + UIdata.newsave.date;
            document.getElementById('temp').innerHTML = 'Temperature:' + UIdata.newsave.temp + '°C';
            document.getElementById('content').innerHTML = 'your feeling:' + UIdata.newsave.content;

        }catch(error){
            console.log('error' , error);
        };

    };
    // _______________________________________________________________________________________
    // Calling the functions in order by chaining Promises
    gettemp(baseURL , zipCode , apiKey)
       .then(function(adata){
           //   console.log(adata); //to test  
          postData('/add',{date : newDate , temp : adata.main.temp , content : userfeeling});          
          updateUI(); //Dynamic UI Updates //the user can see the data 

    });

};

// __________________________________________________________________________________________________

/* Finish  */

