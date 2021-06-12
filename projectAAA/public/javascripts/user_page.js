// user warning function
var recent_user;
var user_type;


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
          console.log(this.responseText);
          document.getElementById("user_header_show").innerHTML = this.responseText;
          recent_user= this.responseText;

        }
    };
    xhttp.open("GET","/users/take_user_id", false);
    xhttp.send();
}


function show_type(){
    user_type = Math.floor(recent_user)/10000;
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
//map
mapboxgl.accessToken = 'pk.eyJ1Ijoiam9jZWx5bjY2NiIsImEiOiJja29mZ2RwOWkwNTFvMnVwNzI3eXgxdngwIn0.IoVn3pEiBAmMgflGWs8eTw';
var map = new mapboxgl.Map({
    container: 'map',
    style: 'mapbox://styles/mapbox/streets-v8',
    center: [138.611, -34.923],
    zoom: 9,
    minZoom: 5,
    maxZoom: 15
});

//—————————————————————————————————vue for user page

var user_log_in = new Vue({
  el: '#user_page',
  data: {

    tab: 'map',

    /*
      find user login type:
      -1: do not log in
      0 : individual user
      1 : venue manager
      2 : official
    */
    user_type: '0',


// ——————————————————————individual user————————————————————-
    /*
      individual user bar choose
      0: check in
      1: account
    */
    i_user_bar: '0',
        /*
      venue user bar choose
      0: check in history
      1: account
    */
    v_user_bar: '0',
            /*
     official user bar choose
      0: user check in history
      1: venue check in history
      2: set hotspot
      3: account
      4: sign-up official
    */
    o_user_bar: '0',


    // user if click change information in account
    change_information: false,//

  },
  });

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
