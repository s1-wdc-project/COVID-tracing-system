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

var app = new Vue({
  el: '#sign_up',
  data:function() {
    return {
      userData: {
        firstName: '',
        lastName: '',
        email: '',
        password: '',
        phone: ''
      },
      storeData: 'Yes',
      isSubmitted: false
    };
  },
  methods: {
    submitted() {
      this.isSubmitted = true;
    }
  }
});


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

