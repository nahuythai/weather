const express = require('express')
const path = require('path')
const hbs = require('hbs')
const geocode = require('../utils/geocode')
const weather = require('../utils/weather')

const app = express()
const port = process.env.PORT || 3000


app.set('view engine', 'hbs')

app.use(express.static(path.join(__dirname, '../public')))
app.set('views', path.join(__dirname, '../templates/views'))
hbs.registerPartials(path.join(__dirname, '../templates/partials'))


app.get('', (req, res) => {
    res.render('index', {
        name: "Tides"
    })
})

app.get('/about', (req, res) => {
    res.render('about', {
        name: "Tides",
        title: "About",
    })
})

app.get('/help', (req, res) => {
    res.render('help', {
        name: "Tides",
        title: "Help",
        helpText: "Fill in search box and enter"
    })
})

app.get('/weather', (req, res) => {
    geocode(req.query.address, (error, data) => {
        if (error) {
            return res.send( { error })
        }
        weather(data.latitude, data.longitude, (err, weatherData) => {
            if (err) {
                return res.send( {err} )
            }
            res.send({
                    location: data.location,
                    weather: weatherData
            })
        })
    })
})

app.get('/*', (req, res) => {
    res.render('404')
})

app.listen(port, () => {
    console.log("Server is up on port " + port)
})