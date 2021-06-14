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

            //   document.getElementById("user_header_show").innerHTML = recent_user;
        }
    };
    xhttp.open("GET","/users/take_user_id", false);
    xhttp.send();

}


function show(){
    console.log(recent_user);
    console.log(the_user_type);
}

//----------------------------------------show info -----------------------------------------------------
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

    xhttp.open("GET", "/users/venue_info", true);
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

    xhttp.open("GET", "/users/official_info", true);
    xhttp.setRequestHeader("Content-type", "application/json");
    xhttp.send();
}



//-------------------------------------------change info-------------------------------------------
function change_user_info(){
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

function change_venue_info(){
  var xhttp = new XMLHttpRequest();

  var VenueName = document.getElementById("venue_name").value;
  var Num = document.getElementById("venue_num").value;
  var VenueLocation = document.getElementById("venue_address").value;
  var Password = document.getElementById("venue_password").value;


  var info = {'venue_name': VenueName,'contact_num': Num, 'venue_location': VenueLocation, 'password':Password};

    console.log(info);

    xhttp.open("POST", "/users/change_venue_info", true);
    xhttp.setRequestHeader("Content-type", "application/json");
    xhttp.send(JSON.stringify(info));


}

//-------------------------------------------user checkin-----------------------------------------------
function VenueList(){
    var xhttp = new XMLHttpRequest();

    xhttp.onreadystatechange = function() {
    if (this.readyState == 4 && this.status == 200) {

      var venueTable = document.getElementById('VenueList');

      var list = JSON.parse(this.responseText);
      //console.log(list);


      for (i = 0; i < list.length; i++) {
        var row = document.createElement('tr');
        var VenueId = document.createElement('th');
        var VenueName = document.createElement('th');
        VenueId.innerText = list[i].venue_id;
        VenueName.innerText = list[i].venue_name;
        row.appendChild(VenueId);
        row.appendChild(VenueName);
        venueTable.appendChild(row);

      }
      }
    };

    xhttp.open("GET", "/users/venuelist", true);
    xhttp.setRequestHeader("Content-type", "application/json");
    xhttp.send();
}

function Checkin_btn(){
    var check_in = document.getElementById("individual_check_in");
    var indi_account = document.getElementById("individual_account");
    var change = document.getElementById("info_change");
    var goto_checkin = document.getElementById("user_checkin");
    var checkin_box = document.getElementById("checkin_box");
    goto_checkin.style.display = "block";
    checkin_box.style.display = "block";
    change.style.display = "none";
    indi_account.style.display = "none";
    check_in.style.display = "none";
}

function add_user_checkin(){
  var xhttp = new XMLHttpRequest();

  var venue_checkin_id = document.getElementById("venue_checkin_id").value;


  var data = {'venue_id': venue_checkin_id};

    xhttp.open("POST", "/users/add_user_checkin", true);
    xhttp.setRequestHeader("Content-type", "application/json");
    xhttp.send(JSON.stringify(data));

}

//---------------------------------------------user check in history---------------------------------
function UserCheckinHistory(){
    var xhttp = new XMLHttpRequest();

    xhttp.onreadystatechange = function() {
    if (this.readyState == 4 && this.status == 200) {



      var list = JSON.parse(this.responseText);
      //console.log(list);


          for (i = 0; i < list.length; i++) {
            var checkinlist = document.createElement("div");
                checkinlist.classList.add("history_box");

            var time = document.createElement('h3');
            var location = document.createElement('p');

            time.innerText = list[i].log_in_time;
            location.innerText = list[i].venue_location;


            checkinlist.appendChild(time);
            checkinlist.appendChild(location);

            document.getElementById("check_history").appendChild(checkinlist);
          }

      }
    };

    xhttp.open("GET", "/users/user_checkin_history", true);
    xhttp.setRequestHeader("Content-type", "application/json");
    xhttp.send();
}

//---------——————————————————————————————————official sign up


function new_official_show(){
      var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function() {
    if (this.readyState == 4 && this.status == 200) {
        info = JSON.parse(this.responseText);
        alert("Sign up success: \n official ID:"+info[0].official_id+'\n password:'+info[0].password );
         console.log("sign sucess");
        }
    };
    xhttp.open("GET", "/users/new_offi_info", true);
    xhttp.setRequestHeader("Content-type", "application/json");
    xhttp.send();
}


function sign_up_offi(){

    var o_sign = {
        pas : document.getElementById("official_password").value
    };
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            new_official_show();
        }
    };
    xhttp.open("POST","/official_sign_up", true);
    xhttp.setRequestHeader("Content-type", "application/json");
    xhttp.send(JSON.stringify(o_sign));

}
//---------——————————————————————————————————official search user check in



//-=============================================map=====================================
var map_app = new Vue({
    el: '#hotspot',
    data: {
        markers: [],
        form_long: 0,
        form_lat: 0
    },
    methods: {
        get_markers: function(){
            let req = new XMLHttpRequest();
            req.onreadystatechange = function(){
                if(req.readyState == 4 && req.status == 200){
                    for(let m of map_app.markers){
                        if('marker' in m){
                            m.marker.remove();
                        }
                    }

                    let markers = JSON.parse(req.responseText);
                    for(let m of markers){
                        m.marker = new mapboxgl.Marker()
                            .setLngLat([m.longtitude, m.latitude])
                            .addTo(map);
                    }

                    map_app.markers = markers;
                }
            };
            req.open('GET','/markers',true);
            req.send();
        },

        add_marker: function(){
            let req = new XMLHttpRequest();

            req.open('POST','/addmarker',true);
            req.setRequestHeader('Content-type', 'application/json');
            req.send(JSON.stringify({long:this.form_long,lat:this.form_lat}));
        }
    }
});

map_app.get_markers();

mapboxgl.accessToken = 'pk.eyJ1Ijoiam9jZWx5bjY2NiIsImEiOiJja29mZ2RwOWkwNTFvMnVwNzI3eXgxdngwIn0.IoVn3pEiBAmMgflGWs8eTw';
var map = new mapboxgl.Map({
    container: 'set_map',
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

function user_page_auto_change(){
    if( the_user_type == '0' ){
        Individual_user();
    }else if(the_user_type == '1'){
        Manager();
    }else if(the_user_type == '2'){
        Health_official();
    }
}
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
    var goto_checkin = document.getElementById("user_checkin");
    check_in.style.display = "block";
    indi_account.style.display = "none";
    change.style.display = "none";
    goto_checkin.style.display = "none";
}

function Individual_account(){
    var check_in = document.getElementById("individual_check_in");
    var indi_account = document.getElementById("individual_account");
    var change = document.getElementById("info_change");
    var goto_checkin = document.getElementById("user_checkin");
    indi_account.style.display = "block";
    check_in.style.display = "none";
    change.style.display = "none";
    goto_checkin.style.display = "none";
}

function Info_change(){
    var check_in = document.getElementById("individual_check_in");
    var indi_account = document.getElementById("individual_account");
    var change = document.getElementById("info_change");
    var goto_checkin = document.getElementById("user_checkin");
    change.style.display = "block";
    indi_account.style.display = "none";
    check_in.style.display = "none";
    goto_checkin.style.display = "none";
}

function User_checkin(){
    var check_in = document.getElementById("individual_check_in");
    var indi_account = document.getElementById("individual_account");
    var change = document.getElementById("info_change");
    var goto_checkin = document.getElementById("user_checkin");
    var checkin_box = document.getElementById("checkin_box");
    goto_checkin.style.display = "block";
    change.style.display = "none";
    indi_account.style.display = "none";
    check_in.style.display = "none";
    checkin_box.style.display = "none";

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



var app = new Vue({
    el: '#user_history',
    data: {
        user_check_in: [],
    },
    methods: {
        h_search_user: function(){
            let req = new XMLHttpRequest();
            req.onreadystatechange = function(){
                if(req.readyState == 4 && req.status == 200){
                    for(let m of app.user_check_in){
                        if('user_check_in' in m){
                            m.user_check_in.remove();
                        }
                    }
                let info = JSON.parse(req.responseText);
                app.user_check_in = info;
                }
            };
            req.open('GET','/h_search_user',true);
            req.send();
        },

    }
});

// ————————————————————————————offical check user


function h_search_user(){
    console.log("1111111");
    var o_sign = {
        pas : document.getElementById("h_search_user").value
    };
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {

      var user_check_result = document.getElementById("user_check_o");

      var list = JSON.parse(this.responseText);
      //console.log(list);


      for (i = 0; i < list.length; i++) {
        var row = document.createElement('tr');
        var Id = document.createElement('th');
        var Name = document.createElement('th');
        var Venue= document.createElement('th');
        var time = document.createElement('th');
       Id.innerText = list[i].user_id;
        Name.innerText = list[i].last_name;
        Venue.innerText = list[i].venue_name;
        time.innerText = list[i].log_in_time;
        row.appendChild(Id);
        row.appendChild(Name);
        row.appendChild(Venue);
        row.appendChild(time);
        user_check_result.appendChild(row);

      }
      }

    };
    xhttp.open("POST","/h_search_user", true);
    xhttp.setRequestHeader("Content-type", "application/json");
    xhttp.send(JSON.stringify(o_sign));

}

//----------------------------------venue-> user checkin search-------------------------------------
function venue_search_user(){
    // console.log("1111111");
    var o_sign = {
        pas : document.getElementById("venue_search_user").value
    };
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {

      var venue_user_check_result = document.getElementById("user_check_v");

      var list = JSON.parse(this.responseText);
      //console.log(list);


      for (i = 0; i < list.length; i++) {
        var row = document.createElement('tr');
        var Id = document.createElement('th');
        var Name = document.createElement('th');
        var time = document.createElement('th');
        Id.innerText = list[i].user_id;
        Name.innerText = list[i].last_name;
        time.innerText = list[i].log_in_time;
        row.appendChild(Id);
        row.appendChild(Name);
        row.appendChild(time);
        venue_user_check_result.appendChild(row);

      }
      }

    };
    xhttp.open("POST","/v_search_user", true);
    xhttp.setRequestHeader("Content-type", "application/json");
    xhttp.send(JSON.stringify(o_sign));

}

//----------------- official venue check


function h_search_venue(){
    console.log("venue_search");
    var o_sign = {
        pas : document.getElementById("search_venue").value
    };
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {

      var venue_check_result = document.getElementById("venue_check_o");

      var list = JSON.parse(this.responseText);
      //console.log(list);


      for (i = 0; i < list.length; i++) {
        var row = document.createElement('tr');
        var id = document.createElement('th');
        var name = document.createElement('th');
        var venue= document.createElement('th');
        var time = document.createElement('th');
        venue.innerText = list[i].venue_name;
        id.innerText = list[i].user_id;
        name.innerText = list[i].last_name;
        time.innerText = list[i].log_in_time;
        row.appendChild(venue);
        row.appendChild(id);
        row.appendChild(name);
        row.appendChild(time);
        venue_check_result.appendChild(row);

      }
      }

    };
    xhttp.open("POST","/h_search_venue", true);
    xhttp.setRequestHeader("Content-type", "application/json");
    xhttp.send(JSON.stringify(o_sign));

}


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
