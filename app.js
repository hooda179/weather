const express = require("express");
const app = express();
const https = require("https");
const bodyParser = require("body-parser");
const ejs = require("ejs");

app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));
app.set("view engine","ejs");

app.get("/",function (req,res) {

    res.sendFile(__dirname + "/index.html");

})

app.post("/weather" , function (req,res) {
    const apikey = "d82658548f63a4e3a221948a732608da";
const query = req.body.cityName;
const unit = "metric";
const url = "https://api.openweathermap.org/data/2.5/weather?appid=" + apikey + "&q=" + query + "&units=" + unit;
https.get(url,function (response) {
    console.log(response.statusCode);

    response.on("data",function (data) {
        const weatherData = JSON.parse(data);
        const temp = weatherData.main.temp;
        const description = weatherData.weather[0].description;
        const icon = weatherData.weather[0].icon;
        const iconUrl = "http://openweathermap.org/img/wn/"+ icon +"@2x.png";
        res.render("weather",{query: query, temp: temp,description: description,iconUrl: iconUrl});
    })
})
})

app.listen(3000,function () {
    console.log("The server is working at port 3000");
})
