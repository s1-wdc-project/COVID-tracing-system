// user warning function
var recent_user;
var the_user_type;


function warning(){
  alert("official,individual and manager button only exist in milestone1 for checking");
}

function double_check_log_out(){
  var x= confirm("you want to log out?");
  if( x == true ){
    alert("log out success!");
    document.getElementById("log_out").href="index.html";
  }else{
    document.getElementById("log_out").href="user_page.html";

  }
}

function show_user(){
        var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
          recent_user= this.responseText;
          console.log(recent_user);
          the_user_type = (Math.floor(recent_user)/10000) - 1;
          console.log(the_user_type);
        }
    };
    xhttp.open("GET","/users/take_user_id", false);
    xhttp.send();
}


function show(){
    console.log(recent_user);
    console.log(the_user_type);
}


function user_info(){
      var xhttp = new XMLHttpRequest();

    xhttp.onreadystatechange = function() {
    if (this.readyState == 4 && this.status == 200) {

        info = JSON.parse(this.responseText);
        // console.log(info);

        var id = document.getElementById("u_id");
        var first = document.getElementById("f_name");
        var last = document.getElementById("l_name");
        var phonenum = document.getElementById("ph_num");
        var emailadd = document.getElementById("mail");


        id.innerText = info[0].user_id;
        first.innerText = info[0].first_name;
        last.innerText = info[0].last_name;
        phonenum.innerText = info[0].phone;
        emailadd.innerText = info[0].email;
      }
    };

    xhttp.open("GET", "/users/user_info", true);
    xhttp.setRequestHeader("Content-type", "application/json");
    xhttp.send();
}

function venue_info(){
      var xhttp = new XMLHttpRequest();

    xhttp.onreadystatechange = function() {
    if (this.readyState == 4 && this.status == 200) {

        info = JSON.parse(this.responseText);
        console.log("venueinfo",info);

        var id = document.getElementById("v_id");
        var name = document.getElementById("v_name");
        var phone = document.getElementById("v_num");
        var location = document.getElementById("location");
        // var emailadd = document.getElementById("mail");


        id.innerText = info[0].venue_id;
        name.innerText = info[0].venue_name;
        phone.innerText = info[0].contact_num;
        location.innerText = info[0].venue_location;
        // emailadd.innerText = info[0].email;
      }
    };

    xhttp.open("GET", "/users/user_info", true);
    xhttp.setRequestHeader("Content-type", "application/json");
    xhttp.send();
}

function official_info(){
  var xhttp = new XMLHttpRequest();

    xhttp.onreadystatechange = function() {
    if (this.readyState == 4 && this.status == 200) {

        info = JSON.parse(this.responseText);
        // console.log("venueinfo",info);

        var id = document.getElementById("o_id");

        id.innerText = info[0].official_id;


      }
    };

    xhttp.open("GET", "/users/user_info", true);
    xhttp.setRequestHeader("Content-type", "application/json");
    xhttp.send();
}


function check(){
  alert(recent_user.value +"  "+  user_type.value);
}

//-------------------------------------------change info-------------------------------------------
function change_info(){
  var xhttp = new XMLHttpRequest();

  var FirstName = document.getElementById("first_name").value;
  var LastName = document.getElementById("last_name").value;
  var Phone = document.getElementById("phone_NO").value;
  var Email = document.getElementById("email").value;
  var Password = document.getElementById("password").value;


  var info = {'first_name': FirstName, 'last_name': LastName, 'phone': Phone, 'email': Email, 'password':Password};

    console.log(info);

    xhttp.open("POST", "/users/change_info", true);
    xhttp.setRequestHeader("Content-type", "application/json");
    xhttp.send(JSON.stringify(info));


}

//-=============================================map=====================================
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

function get_markers(){
    let req = new XMLHttpRequest();
    req.onreadystatechange = function(){
        if(req.readyState == 4 && req.status == 200){
            app.markers = JSON.parse(req.responseText);
        }
    };
    req.open('GET','/markers',true);
    req.send();
}
//-----------------------------------------page break down--------------------------------------------
// log-in button
function Individual_user(){
    var indi = document.getElementById("individual_user");
    var manager = document.getElementById("manager");
    var official = document.getElementById("health_official");
    indi.style.display = "block";
    manager.style.display = "none";
    official.style.display = "none";
}

//back button
function Manager(){
    var indi = document.getElementById("individual_user");
    var manager = document.getElementById("manager");
    var official = document.getElementById("health_official");
    manager.style.display = "block";
    indi.style.display = "none";
    official.style.display = "none";

}
//sign_up button
function Health_official(){
    var indi = document.getElementById("individual_user");
    var manager = document.getElementById("manager");
    var official = document.getElementById("health_official");
    official.style.display = "block";
    indi.style.display = "none";
    manager.style.display = "none";
}

//------------------------------------individual page-----------------------------------------------------
function Individual_check_in(){
    var check_in = document.getElementById("individual_check_in");
    var indi_account = document.getElementById("individual_account");
    var change = document.getElementById("info_change");
    check_in.style.display = "block";
    indi_account.style.display = "none";
    change.style.display = "none";
}

function Individual_account(){
    var check_in = document.getElementById("individual_check_in");
    var indi_account = document.getElementById("individual_account");
    var change = document.getElementById("info_change");
    indi_account.style.display = "block";
    check_in.style.display = "none";
    change.style.display = "none";
}

function Info_change(){
    var check_in = document.getElementById("individual_check_in");
    var indi_account = document.getElementById("individual_account");
    var change = document.getElementById("info_change");
    change.style.display = "block";
    indi_account.style.display = "none";
    check_in.style.display = "none";


}


//-----------------------------------------venue page---------------------------------------------------
function Venue_check_in(){
    var check_in = document.getElementById("venue_check_in");
    var venue_account = document.getElementById("venue_account");
    var change = document.getElementById("venue_info_change");
    check_in.style.display = "block";
    venue_account.style.display = "none";
    change.style.display = "none";
}

function Venue_account(){
    var check_in = document.getElementById("venue_check_in");
    var venue_account = document.getElementById("venue_account");
    var change = document.getElementById("venue_info_change");
    venue_account.style.display = "block";
    check_in.style.display = "none";
    change.style.display = "none";
}

function Venue_info_change(){
    var check_in = document.getElementById("venue_check_in");
    var venue_account = document.getElementById("venue_account");
    var change = document.getElementById("venue_info_change");
    change.style.display = "block";
    venue_account.style.display = "none";
    check_in.style.display = "none";
}

//---------------------------------------official page--------------------------------------------------
function Official_user_history(){
    var user_history = document.getElementById("user_history");
    var venue_history = document.getElementById("venue_history");
    var hotspot = document.getElementById("hotspot");
    var official_account = document.getElementById("official_account");
    var official_info_change = document.getElementById("official_info_change");
    var official_signup = document.getElementById("official_signup");

    user_history.style.display = "block";
    venue_history.style.display = "none";
    hotspot.style.display = "none";
    official_account.style.display = "none";
    official_info_change.style.display = "none";
    official_signup.style.display = "none";
}

function Official_venue_history(){
    var user_history = document.getElementById("user_history");
    var venue_history = document.getElementById("venue_history");
    var hotspot = document.getElementById("hotspot");
    var official_account = document.getElementById("official_account");
    var official_info_change = document.getElementById("official_info_change");
    var official_signup = document.getElementById("official_signup");

    user_history.style.display = "none";
    venue_history.style.display = "block";
    hotspot.style.display = "none";
    official_account.style.display = "none";
    official_info_change.style.display = "none";
    official_signup.style.display = "none";
}

function Hotspot(){
    var user_history = document.getElementById("user_history");
    var venue_history = document.getElementById("venue_history");
    var hotspot = document.getElementById("hotspot");
    var official_account = document.getElementById("official_account");
    var official_info_change = document.getElementById("official_info_change");
    var official_signup = document.getElementById("official_signup");

    user_history.style.display = "none";
    venue_history.style.display = "none";
    hotspot.style.display = "block";
    official_account.style.display = "none";
    official_info_change.style.display = "none";
    official_signup.style.display = "none";
}

function Official_account(){
    var user_history = document.getElementById("user_history");
    var venue_history = document.getElementById("venue_history");
    var hotspot = document.getElementById("hotspot");
    var official_account = document.getElementById("official_account");
    var official_info_change = document.getElementById("official_info_change");
    var official_signup = document.getElementById("official_signup");

    user_history.style.display = "none";
    venue_history.style.display = "none";
    hotspot.style.display = "none";
    official_account.style.display = "block";
    official_info_change.style.display = "none";
    official_signup.style.display = "none";
}

function Official_info_change(){
    var user_history = document.getElementById("user_history");
    var venue_history = document.getElementById("venue_history");
    var hotspot = document.getElementById("hotspot");
    var official_account = document.getElementById("official_account");
    var official_info_change = document.getElementById("official_info_change");
    var official_signup = document.getElementById("official_signup");

    user_history.style.display = "none";
    venue_history.style.display = "none";
    hotspot.style.display = "none";
    official_account.style.display = "none";
    official_info_change.style.display = "block";
    official_signup.style.display = "none";
}

function Official_signup(){
    var user_history = document.getElementById("user_history");
    var venue_history = document.getElementById("venue_history");
    var hotspot = document.getElementById("hotspot");
    var official_account = document.getElementById("official_account");
    var official_info_change = document.getElementById("official_info_change");
    var official_signup = document.getElementById("official_signup");

    user_history.style.display = "none";
    venue_history.style.display = "none";
    hotspot.style.display = "none";
    official_account.style.display = "none";
    official_info_change.style.display = "none";
    official_signup.style.display = "block";
}

// //—————————————————————————————————vue for user page

// var user_log_in = new Vue({
//   el: '#user_page',
//   data: {

//     tab: 'map',
//     /*
//       find user login type:
//       -1: do not log in
//       0 : individual user
//       1 : venue manager
//       2 : official
//     */
//     user_type : '1',


// // ——————————————————————individual user————————————————————-
//     /*
//       individual user bar choose
//       0: check in
//       1: account
//     */
//     i_user_bar: '0',
//         /*
//       venue user bar choose
//       0: check in history
//       1: account
//     */
//     v_user_bar: '0',
//             /*
//     official user bar choose
//       0: user check in history
//       1: venue check in history
//       2: set hotspot
//       3: account
//       4: sign-up official
//     */
//     o_user_bar: '0',


//     // user if click change information in account
//     change_information: false,//

//   },
//   methods: {
//     get_user_type_vue : function(){
//         var xhttp = new XMLHttpRequest();
//         xhttp.onreadystatechange = function() {
//         if (this.readyState == 4 && this.status == 200) {
//           user_log_in.user_type = (Math.floor(xhttp.responseText)/10000) - 1;
//           console.log(user_type);
//           console.log("get_type_success");
//         }else{
//           console.log("fail get user type")
//         }
//     };
//     xhttp.open("GET","/users/take_user_id", false);
//     xhttp.send();
//   },
//   mounted: function(){
//     this.get_user_type_vue();
//   }
//   }

//   });

//-----------------------------map---------------------------------------------
// var show = false;
// function show_map(){
//         if(o_user_bar==2){
//           show = true;
//         }
//         else{
//           show = false;
//         }
// }
// function hide_map()
// {
// 		var hideMap = document.getElementById("set_hotspot");
//     hideMap.style.display = "none";
// }

// function show_map()
// {
//     var showMap = document.getElementById("set_hotspot");
//     showMap.style.display = "";
// }

// var map = new Vue({
//     el:"#set_hotspot",
//     data:{
//         tab:'map'
//     }
// });
