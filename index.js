const express = require('express')
const request = require('request')
// var tuc = require('temp-units-conv')
const app = express()
const port = 5316
const path = require("path")


app.set("views", path.join(__dirname, "views"))
app.set("view engine", "pug")
app.use(express.static(path.join(__dirname, "/public")))
app.use(express.urlencoded({
    extended: true
}))

app.get("/", (req, res) => {
    res.render('index', 
    {
        weather_data: {
            temp: '-',

        }
    }
    )
})


app.post('/getweather', (req, res) => {
    zip = req.body.zip
    api_key = '1beb1023574491ec8718de83478e5abc'
    api = `https://api.openweathermap.org/data/2.5/weather?zip=${zip}&appid=${api_key}`
    var weather_data = {}


    request(api, {json: true}, (err, res, body) => {

        // temp = tuc.celsiusToKelvin(tuc.fahrenheitToCelsius(body.main.temp))
        

        weather_data = {
            // temp: temp,
            type: body.weather[0].main,
            desc: body.weather[0].description,
            city: body.name,
            windSpeed: body.wind.speed,
            icon: body.weather[0].icon
        }
        console.log(weather_data)
    })
    console.log(weather_data)
    setTimeout(function() {
        res.render('index', {
            // temp: tuc,
            type: weather_data.type,
            desc: weather_data.desc,
            city: weather_data.city,
            windSpeed: weather_data.windSpeed,
            icon: weather_data.icon
        })
    }, 2000)
    
})

app.listen(port, () => {
    console.log(`Web app running at http://localhost:${port}`)
})