//log-in button
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