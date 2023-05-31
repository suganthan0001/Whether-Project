const express = require("express");
const bodyParser = require("body-parser");
const https = require("https");    // to communicate with another server api

const app = express();
app.use(bodyParser.urlencoded({ extended: true }));


app.get("/",function(req,res){

    res.sendFile(__dirname+"/index.html"); 

});

app.post("/",function(req,res){

    const cityName = req.body.cityName;
    const api = "https://api.openweathermap.org/data/2.5/weather?q="+cityName+"&appid=c1da3204259f5bd2e5c760cc82d8005c&units=metric";

    https.get(api,function(response){
        console.log(response.statusCode);


        response.on("data",function(data){
            const whetherData = JSON.parse(data);        // should convert the data to json format
            console.log(whetherData.main.temp);
            const pic = "https://openweathermap.org/img/wn/"+whetherData.weather[0].icon+"@2x.png";
            res.write("<h1>"+"The temperature in "+cityName+" is: "+whetherData.main.temp+"</h1>");
            res.write("<br><h2>The Weather description is: "+whetherData.weather[0].description+"</h2>");
            res.write("<img src=\""+pic+"\">");
            res.send();
        });
    });
})


app.listen(3000,function(){
    console.log("server is running on port 3000");
});