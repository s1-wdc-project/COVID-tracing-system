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
    var user;

    // console.log("venue");
    // console.log(Math.floor(id/10000));

    if(Math.floor(id/10000) == 1){
        user = {'user_id' : id, 'password' : pass};
    }else if(Math.floor(id/10000) == 2){
        user = {'venue_id' : id, 'password' : pass};
    }else if(Math.floor(id/10000) == 3){
        user = {'official_id' : id, 'password' : pass};
    }

    // console.log('login');
    // console.log(user);

    // Create AJAX Request
    var xmlhttp = new XMLHttpRequest();

    // Define function to run on response
    xmlhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {

                // if(Math.floor(id/10000) == 1){
                    go_to_user_page();
                    show_user();
                // }else if(Math.floor(id/10000) == 2){
                    // go_to_user_page();
                    // go_to_venue_page();
                    // show_user();
                // }else if(Math.floor(id/10000) == 3){
                //     go_to_venue_page();
                //     show_user();
                // }

        }else if(this.readyState == 4 && this.status >= 400){
             alert("Login failed");
        }
    };

    // Open connection to server & send the post data using a POST request
    // We will cover POST requests in more detail in week 8
    xmlhttp.open("POST", "/users/login", true);
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