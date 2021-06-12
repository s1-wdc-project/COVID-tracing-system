// user warning function

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
var recent_user;
function show_user(){
        var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {

          document.getElementById("user_header_show").innerHTML = this.responseText;
         recent_user = this.responseText;
          console.log(recent_user);
        }
    };
    xhttp.open("GET","/users/take_user_id", false);
    xhttp.send();
}



//—————————————————————————————————vue for user page

var user_log_in = new Vue({
  el: '#user_page',
  data: {
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
