// log-in button
function log_in(){
    var main = document.getElementById("main");
    var log_in = document.getElementById("log_in");
    var sign_up = document.getElementById("sign_up");
    log_in.style.display = "block";
    main.style.display = "none";
    sign_up.style.display = "none";
}

//back button
function showMain(){
    var main = document.getElementById("main");
    var log_in = document.getElementById("log_in");
    var sign_up = document.getElementById("sign_up");
    main.style.display = "block";
    log_in.style.display = "none";
    sign_up.style.display = "none";

}
//sign_up button
function sign_up(){
    var main = document.getElementById("main");
    var log_in = document.getElementById("log_in");
    var sign_up = document.getElementById("sign_up");
    sign_up.style.display = "block";
    main.style.display = "none";
    log_in.style.display = "none";
}


// ------------------------------------ log in ----------------------------------------
function go_to_user_page(){
  location.replace("user_page.html");
}

// function go_to_venue_page(){
//   location.replace("user_page.html");
//   Manager();
// }

// function user_define(){
//     if(Math.floor(id/10000) == 1){
//         user = {'user_id' : id, 'password' : pass};
//     }else if(Math.floor(id/10000) == 2){
//         user = {'venue_id' : id, 'password' : pass};
//     }else if(Math.floor(id/10000) == 3){
//         user = {'official_id' : id, 'password' : pass};
//     }
// }

function show_user(){
        var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
        document.getElementById("user_header_show").innerHTML = this.responseText;
        var  recent_user = this.responseText;
          console.log(recent_user);
        }
    };
    xhttp.open("GET","/users/take_user_id", false);
    xhttp.send();
}

function LogIn(){
    var id = document.getElementById('user_enter_id').value;
    var pass = document.getElementById('user_enter_password').value;
    var xmlhttp = new XMLHttpRequest();
    var user = {'user_id' : id, 'password' : pass};
    // Define function to run on response
    xmlhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
                    go_to_user_page();
                    show_user();
        }else if(this.readyState == 4 && this.status >= 400){
                    LogIn_v();
        }
    };

    // Open connection to server & send the post data using a POST request
    // We will cover POST requests in more detail in week 8
    xmlhttp.open("POST", "/users/login", true);
    xmlhttp.setRequestHeader("Content-type", "application/json");
    xmlhttp.send(JSON.stringify(user));

}
//--------------------------- log in venue

function LogIn_v(){
    var id = document.getElementById('user_enter_id').value;
    var pass = document.getElementById('user_enter_password').value;
    var xmlhttp = new XMLHttpRequest();

   var user = {'user_id' : id, 'password' : pass};
    // Define function to run on response
    xmlhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
                    go_to_user_page();
                    show_user();
        }else if(this.readyState == 4 && this.status >= 400){
             LogIn_o();
        }
    };

    // Open connection to server & send the post data using a POST request
    // We will cover POST requests in more detail in week 8
    xmlhttp.open("POST", "/users/login_v", true);
    xmlhttp.setRequestHeader("Content-type", "application/json");
    xmlhttp.send(JSON.stringify(user));

}

// =============================log in official

function LogIn_o(){
    var id = document.getElementById('user_enter_id').value;
    var pass = document.getElementById('user_enter_password').value;
    var xmlhttp = new XMLHttpRequest();
    var user = {'user_id' : id, 'password' : pass};
    // Define function to run on response
    xmlhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
                    go_to_user_page();
                    show_user();
        }else if(this.readyState == 4 && this.status >= 400){
             alert("Login failed");
        }
    };

    // Open connection to server & send the post data using a POST request
    // We will cover POST requests in more detail in week 8
    xmlhttp.open("POST", "/users/login_o", true);
    xmlhttp.setRequestHeader("Content-type", "application/json");
    xmlhttp.send(JSON.stringify(user));

}
// ----------------------------------- log out -----------------------------------------
function LogOut(){

    // Create AJAX Request
    var xmlhttp = new XMLHttpRequest();

    // Define function to run on response
    xmlhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            alert("Log Out successfully! " + this.responseText);
        }else if(this.readyState == 4 && this.status >= 400){
             alert("LogOut failed");
        }
    };

    // Open connection to server & send the post data using a POST request
    // We will cover POST requests in more detail in week 8
    xmlhttp.open("POST", "/users/logout", true);
    xmlhttp.send();

}



//---------------------------------------user sign up----------------------------------
function user_sign_up(){
    let data = {
        first_name:document.getElementById("firstName").value,
        last_name: document.getElementById("lastName").value,
        email: document.getElementById("email").value,
        password: document.getElementById("password").value,
        phone: document.getElementById("phone").value
    };
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            // app.get_post();
        }
    };
    xhttp.open("POST","/user_sign_up", true);
    xhttp.setRequestHeader("Content-type", "application/json");
    xhttp.send(JSON.stringify(data));
    console.log(data);
}


//---------------------------venue-sign-up
function venue_sign_up(){
    let venue_data = {
        venue_name:document.getElementById("venue_name").value,
        password: document.getElementById("password").value,
        phone: document.getElementById("phone").value,
        location: document.getElementById("location").value
    };
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            // app.get_post();
        }
    };
    xhttp.open("POST","/venue_sign_up", true);
    xhttp.setRequestHeader("Content-type", "application/json");
    xhttp.send(JSON.stringify(venue_data));
    console.log(venue_data);
}

//-----------------------------map--------------------------


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
    positionOptions: {
        enableHighAccuracy: true
    },
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

    var position = [];
    storePosition(x, y, position);

    console.log(position);//----------array to store user position
});





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