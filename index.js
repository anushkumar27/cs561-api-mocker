const express = require('express')
const crypto = require('crypto')
var bodyParser = require('body-parser');
const app = express()
const port = 3000
const BASE_PATH = "/v1/"

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
    res.setHeader("content-type", "application/json")

    if(username == undefined || password == undefined || username.length == 0 || password.length == 0){
        res.status(400)
        res.send({
            "type": "error",
            "message": "Invalid Input"
          })
    }else{
        res.send({
            "token": crypto.randomBytes(32).toString('hex'),
            "expiry": Math.floor(new Date().getTime() + 30 * 60000)
          }
        )
    }
})

app.listen(port, () => {
    console.log(`API Mocker app listening at http://localhost:${port}`)
})
