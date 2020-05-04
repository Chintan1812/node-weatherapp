const rq = require('request');
const geoCode = require('./geocode');

const forecast = (lat, long, callback) => {
    const url = `https://api.darksky.net/forecast/0e70e24912cf99eb92d7bbb84de52103/${lat},${long}?exclude=minutely,daily,alerts,hourly,flags`;
    rq({url: url, json: true}, (e,r)=>{
        if(e){
            callback("Unable to connect to the forcast service :/",undefined );
        }else if (r.body.error){
            callback(`Unable to find the location. ${r.body.error}`,undefined);
        }else{
            callback(undefined,`It is currently ${r.body.currently.temperature} degrees out. There is a ${r.body.currently.precipProbability}% chance of rain.`);
        }
    })
}

const forecastFinal = (address, callback) => {
    geoCode(address, (e, geoData)=> {
        if(e) {
            return console.log(e);
        }
        forecast(geoData.lat, geoData.long , (e,forecastData)=>{
            if(e) {return callback(e, undefined)}
            callback(undefined, `The weather information for ${geoData.place}\n${forecastData}`);
        });
    })
}

module.exports = {
    forecast,
    forecastFinal
}