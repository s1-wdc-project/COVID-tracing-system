 // TO MAKE THE MAP APPEAR YOU MUST
// ADD YOUR ACCESS TOKEN FROM
// https://account.mapbox.com
mapboxgl.accessToken = 'pk.eyJ1Ijoiam9jZWx5bjY2NiIsImEiOiJja29mZ2RwOWkwNTFvMnVwNzI3eXgxdngwIn0.IoVn3pEiBAmMgflGWs8eTw';
var map = new mapboxgl.Map({
    container: 'map',
    style: 'mapbox://styles/mapbox/streets-v8',
    center: [138.611, -34.923],
    zoom: 9,
    minZoom: 5,
    maxZoom: 15
});


var geolocate = new mapboxgl.GeolocateControl({
    // positionOptions: {
    //     enableHighAccuracy: true
    // },
    trackUserLocation: true
});

// Add geolocate control to the map.
map.addControl(geolocate);


function storePosition(x, y, array) {
    array.push(x);
    array.push(y);
}
var x;
var y;
// var p = [];
geolocate.on('geolocate',function(myLocation) {
    x = myLocation.coords.longitude;
    y = myLocation.coords.latitude;
    // var position = [x, y];
    // console.log(position);

    var position = [];
    storePosition(x, y, position);
    // storePosition(19, 1000, position);
    // storePosition(-300, 4578, position);

    // position[0] == 3 ;  // x value (even indexes)
    // position[1] == 5 ;  // y value (odd indexes)
    // p[0] = pisition[0];
    // p[1] = pisition[1];
    console.log(position);//----------array to store user position
});

// console.log(p);


// to loop through coordinate values
// for (var i = 0; i < coords.length; i+=2) {
//     var x = coords[i];
//     var y = coords[i+1];
// }




//hotspot

var geocoder = new MapboxGeocoder({
    accessToken: mapboxgl.accessToken,
    mapboxgl: mapboxgl
});

var coordinate = {};
var coordinates = [];

geocoder.on('result', function(e) {
    // console.log(e.result);
    var lat = e.result.center[0];
    var long = e.result.center[1];
    var cordName = e.result.text;
    coordinate = {'lat':lat, 'long':long, 'location:':cordName};
    coordinates.push(coordinate);
    console.log(coordinate);
    // console.log(coordinate);
});

document.getElementById('geocoder').appendChild(geocoder.onAdd(map));


map.on('load', function() {

    // coordinates = {[138.611, -34.923], []}
    coordinates = [{'lat' : 138.611, 'long': -34.923},
                        {'lat' : 138.5, 'long': -34.923},
                        {'lat' : 114.16936109999999, 'long': 22.3193039}];

    var features = [];
    for (i = 0; i < coordinates.length; i++) {
        data = {
            'type': 'Feature',
            "geometry": {
                "type": "Point",
                "coordinates": [coordinates[i].lat, coordinates[i].long]
            }
        };
    features.push(data);
    }

    map.addSource("source_circle_500", {
        "type": "geojson",
        "data": {
            "type": "FeatureCollection",
            "features": features
        }
    });

    map.addLayer({
        "id": "circle500",
        "type": "circle",
        "source": "source_circle_500",
        "paint": {
            "circle-radius": {
                stops: [
                    [5, 1],
                    [15, 1024],
                ],
                base: 2
            },
        "circle-color": "red",
        "circle-opacity": 0.3
        }
    });

});