//Author: Varun Pasupuleti

const express = require("express");
const bodyParser = require("body-parser");
const https = require("https");

const app = express();

app.use(bodyParser.urlencoded({extended: true}));

app.get("/", function(req, res) {
    res.sendFile(__dirname + "/index.html");
});

app.post("/", function(req, res) {
    const city = req.body.c;
    const apiKey = req.body.key;
    const url = "https://api.openweathermap.org/data/2.5/weather?q=" + city + "&appid=" + apiKey + "6&units=imperial";
    https.get(url, function(httpsRes) {
        httpsRes.on("data", function(data) {
            const weatherData = JSON.parse(data);
            const icon = weatherData.weather[0].icon;
            const imgURL = "https://openweathermap.org/img/wn/" + icon + "@2x.png";
            res.write("<h1>Conditions in " + city + ": " + weatherData.weather[0].description+"</h1>");
            res.write("<p>The temperature is: "+weatherData.main.temp+"</p>");
            res.write("<img src=" + imgURL + ">");
            res.send();
        });
    });
});

app.listen(3000, function() {
    console.log("Server running on local host 3000");
});