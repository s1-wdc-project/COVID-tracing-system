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
// var vueinst = new Vue({
//   el: '#app',
//   data:{
//     show_main: true,
//     show_log_in: false,
//     show_sign_up: false,
//   }
// });


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


  //----------------------change the button color
  /*
var count = 1;
function setColor(btn, color) {
  var property = document.getElementById(btn);
  if (count == 0) {
      property.style.backgroundColor = "grey";
      count = 1;
  }
  else {
      property.style.backgroundColor = "black";
      count = 0;
  }

}
*/

