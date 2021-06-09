// google log in
function onSuccess(googleUser) {
    console.log('Logged in as: ' + googleUser.getBasicProfile().getName());
}

function onFailure(error) {
    console.log(error);
}

function renderButton() {
      gapi.signin2.render('my-signin2', {
        'scope': 'profile email',
        'width': 400,
        'height': 50,
        'longtitle': true,
        'theme': 'dark',
        'onsuccess': onSuccess,
        'onfailure': onFailure
      });
}

function onSignIn(googleUser) {
  var profile = googleUser.getBasicProfile();
  console.log('ID: ' + profile.getId()); // Do not send to your backend! Use an ID token instead.
  console.log('Name: ' + profile.getName());
  console.log('Image URL: ' + profile.getImageUrl());
  console.log('Email: ' + profile.getEmail()); // This is null if the 'email' scope is not present.


}




//github log in
$('#github-button').on('click', function() {
// Initialize with your OAuth.io app public key
    OAuth.initialize('YOUR_OAUTH_KEY');
    // Use popup for OAuth
    OAuth.popup('github').then(github => {
      console.log(github);
      // Retrieves user data from oauth provider
      console.log(github.me());
});
})