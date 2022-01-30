const express = require('express')
const crypto = require('crypto')
var bodyParser = require('body-parser');
const jwt = require('jsonwebtoken');
const app = express()
const port = 3000
const BASE_PATH = "/v1/"
// Risk: Add to secrets/environment
const TOKEN_SECRET = 'cd47d09523b2a3e304209f8aeb63c06c5d8ece4bf36d6df1bf72b2d98d080536'

const corvallisWeather = {
    "coord": {
        "lon": -123.262,
        "lat": 44.5646
    },
    "weather": [
        {
            "id": 804,
            "main": "Clouds",
            "description": "overcast clouds",
            "icon": "04d"
        }
    ],
    "base": "stations",
    "main": {
        "temp": 282.37,
        "feels_like": 282.09,
        "temp_min": 281.16,
        "temp_max": 283.41,
        "pressure": 1020,
        "humidity": 78
    },
    "visibility": 10000,
    "wind": {
        "speed": 1.34,
        "deg": 135,
        "gust": 2.24
    },
    "clouds": {
        "all": 100
    },
    "dt": 1642095101,
    "sys": {
        "type": 2,
        "id": 2040223,
        "country": "US",
        "sunrise": 1642088828,
        "sunset": 1642121762
    },
    "timezone": -28800,
    "id": 5720727,
    "name": "Corvallis",
    "cod": 200
}

// Add headers before the routes are defined
app.use(function (req, res, next) {

    // Website you wish to allow to connect
    res.setHeader('Access-Control-Allow-Origin', ['https://editor.swagger.io', 'https://hoppscotch.io', 'http://ec2-34-217-113-76.us-west-2.compute.amazonaws.com:3000']);

    // Request methods you wish to allow
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');

    // Request headers you wish to allow
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');

    // Set to true if you need the website to include cookies in the requests sent
    // to the API (e.g. in case you use sessions)
    res.setHeader('Access-Control-Allow-Credentials', true);

    // Pass to next layer of middleware
    next();
});

// for parsing application/json
app.use(bodyParser.json()); 

// for parsing application/xwww-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true })); 

app.get(BASE_PATH + 'weather', (req, res) => {
    res.setHeader("content-type", "application/json")
    res.send(corvallisWeather)
})

app.get(BASE_PATH + 'hello', (req, res) => {
    res.setHeader("content-type", "application/json")
    res.send({"Hello" : "World!"})
})

app.post(BASE_PATH + 'auth', (req, res) => {
    var username = req.body.username;
    var password = req.body.password;
    // All tokens have 60 mins validity
    var expiresIn = new Date(new Date().getTime() + 3600000).toJSON()
    res.setHeader("content-type", "application/json")

    if(username == undefined || password == undefined || username.length == 0 || password.length == 0){
        res.status(400)
        res.send({
            "type": "error",
            "message": "Invalid Input"
          })
    }else{
        res.send({
            "access-token": jwt.sign({"username" : username, "expiry": expiresIn}, TOKEN_SECRET),
            "expires": expiresIn
          }
        )
    }
})

app.listen(port, () => {
    console.log(`API Mocker app listening at http://localhost:${port}`)
})
