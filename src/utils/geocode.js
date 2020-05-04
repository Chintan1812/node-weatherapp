const rq = require('request');

const geoCode = (address, callback)=>{
    const url1 = `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(address)}.json?access_token=pk.eyJ1IjoiY2hpbnRhbjE4MTIiLCJhIjoiY2s4YnY5NHR0MGZnYzNobHZhNXM0d3IzNSJ9.jHr5Epd7cmnX60LhZAjOYA&limit=1`;
    rq({url: url1, json : true}, (e,r)=>{
        if(e){
            callback("Unable to connect to the location service!", undefined);
        }else if (r.body.message) {
            callback("Check your Input " + r.body.message, undefined);
        }
        else if (r.body.features.length === 0){
            callback("Place not found :p", undefined);
        }
        else{
            callback(undefined, {
                long: r.body.features[0].center[0],
                lat: r.body.features[0].center[1],
                place: r.body.features[0].place_name
            });
            // callback(undefined,`${r.body.features[0].place_name} \nLongitude = ${r.body.features[0].center[0]}, Lattitude = ${r.body.features[0].center[1]}`);
        }
    });
}

module.exports = geoCode;