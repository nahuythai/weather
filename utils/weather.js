const request = require('request')

const geocode = require('./geocode')

const weather =  (latitude, longitude, callback) => {
    const secretKey = 'f6f1631a73b7a3e4ad6e03a659675bbd'
    const url = `https://api.darksky.net/forecast/${secretKey}/${latitude},${longitude}/?units=ca`
    request({ url, json: true}, (error, { body} = {}) => {
        if (error) {
            callback("Unable to connect to darksky server!!!",undefined)
        } else if (body.error) {
            callback("Unable to find location!!!", undefined)
        } else {
            callback(undefined, `${body.daily.data[0].summary} It is currently ${body.currently.temperature} degrees out. There is a ${body.currently.precipProbability} chance of rain.`)
        }
    })
}

module.exports = weather