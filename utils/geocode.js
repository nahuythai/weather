const request = require('request')

const geocode =  (address, callback) => {
    const token = `pk.eyJ1IjoiaHV5dGhhaXNsbmEiLCJhIjoiY2s2cnBkYnJ4MDhpZDNucGtkcWd1NjVnbCJ9.Sm5nLs50orhq04iKl76a1Q`
    const url = `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(address)}.json?access_token=${token}`
    
    request({ url, json: true}, (error, { body } = {}) => {
        if (error) {
            callback('Unable to  connect to mapbox server!!!', undefined)
        } else if (!body.features[0]) {
            callback('Unable to find. Try another location!!!', undefined)
        } else {
            callback(undefined, {
                location: body.features[0].place_name,
                latitude: body.features[0].center[1],
                longitude: body.features[0].center[0]
            })
        }
    })
}

module.exports = geocode