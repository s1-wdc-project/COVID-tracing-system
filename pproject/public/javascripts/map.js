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

map.addControl(
    new mapboxgl.GeolocateControl({
        positionOptions: {
        enableHighAccuracy: true
    },
    trackUserLocation: true
    })
);




//hotspot
map.on('load', function() {

    // coordinates = {[138.611, -34.923], []}
    var coordinates = [{'lat' : 138.611, 'long': -34.923},
                        {'lat' : 138.5, 'long': -34.923}];

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
                    [15, 1024]
                ],
                base: 2
            },
            "circle-color": "red",
            "circle-opacity": 0.3
        }
});

var geocoder = new MapboxGeocoder({
    accessToken: mapboxgl.accessToken,
    mapboxgl: mapboxgl
});


var coordinate = {};

geocoder.on('result', function(e) {
    console.log(e.result.center);
    var lat = e.result.center[0];
    var long = e.result.center[1];
    coordinate = {"lat": lat, "long": long};
});

document.getElementById('geocoder').appendChild(geocoder.onAdd(map));



      // }


      // map.addSource("source_circle_500", {
      //   "type": "geojson",
      //   "data": {
      //     "type": "FeatureCollection",
      //     "features": [{
      //       "type": "Feature",
      //       "geometry": {
      //         "type": "Point",
      //         "coordinates": [138.611, -34.923]
      //       }
      //     }]
      //   }
      // });

      // map.addLayer({
      //   "id": "circle500",
      //   "type": "circle",
      //   "source": "source_circle_500",
      //   "paint": {
      //     "circle-radius": {
      //       stops: [
      //         [5, 1],
      //         [15, 1024]
      //       ],
      //       base: 2
      //     },
      //     "circle-color": "red",
      //     "circle-opacity": 0.3
      //   }
      // });

      // map.addSource("source_circle_501", {
      //   "type": "geojson",
      //   "data": {
      //     "type": "FeatureCollection",
      //     "features": [{
      //       "type": "Feature",
      //       "geometry": {
      //         "type": "Point",
      //         "coordinates": [138.5, -34.923]
      //       }
      //     }]
      //   }
      // });

      // map.addLayer({
      //   "id": "circle501",
      //   "type": "circle",
      //   "source": "source_circle_501",
      //   "paint": {
      //     "circle-radius": {
      //       stops: [
      //         [5, 1],
      //         [15, 1024]
      //       ],
      //       base: 2.5
      //     },
      //     "circle-color": "red",
      //     "circle-opacity": 0.3
      //   }
      // });

      // map.addSource("source_circle_502", {
      //   "type": "geojson",
      //   "data": {
      //     "type": "FeatureCollection",
      //     "features": [{
      //       "type": "Feature",
      //       "geometry": {
      //         "type": "Point",
      //         "coordinates": [x, y]
      //       }
      //     }]
      //   }
      // });

      // map.addLayer({
      //   "id": "circle502",
      //   "type": "circle",
      //   "source": "source_circle_501",
      //   "paint": {
      //     "circle-radius": {
      //       stops: [
      //         [5, 1],
      //         [15, 1024]
      //       ],
      //       base: 2.5
      //     },
      //     "circle-color": "red",
      //     "circle-opacity": 0.3
      //   }
      // });
});