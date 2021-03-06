const https = require('https');
const express = require('express');
const { response } = require('express');

const app = express();

app.get('/', (req, res) => {

    //FETCHING API URL FROM WEB 
    const url = "https://api.openweathermap.org/data/2.5/weather?q=Delhi&appid=9b36cbf4c576a9ed018e6b5f2d4d708f";

    //FETCHING DATA AND SENDING TO THE PAGE
    https.get(url, (response) => {
        // console.log(res.statusCode);

        response.on("data", (data) => {
            //CREATING OBJECT FROM JSON STRING
            const weatherData = JSON.parse(data);
            // GETTING TEMPERATURE FROM DATA
            const temp = Math.floor(weatherData.main.temp);
            // GETTING WEATHER CONDITION
            const weatherDescription = weatherData.weather[0].description;
            // GETTING REALTIME WEATHER ICON NUMBER FROM JSON
            const iconn = weatherData.weather[0].icon;
            // CONCATENATION OF WEATHER URL AND ICON NUMBER
            const imageUrl = 'http://openweathermap.org/img/wn/'+iconn+'@2x.png';
            // NOW SEND THE WHOLE THING
            res.write(`<h1>Currently wheather is ${weatherDescription} in delhi.</h1>`);
            res.write("<img src=" + imageUrl +">");
            res.write(`<h2>The temperature in Delhi is ${temp} Kelvin.</h2>`);
            res.send();
        });
    });
});


app.listen(80, (req, res) => {
    console.log('server running');
});