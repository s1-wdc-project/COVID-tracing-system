var express = require('express');
var router = express.Router();


// ---------------------------------------------github login
var passport = require('passport');
var GitHubStrategy = require('passport-github2').Strategy;


// Register at https://github.com/settings/developers

var GITHUB_CLIENT_ID = "7618bd97508ffa61e608";
var GITHUB_CLIENT_SECRET = "43424c81da83140cb141b882081c130d3e9586ed";

// Use the GitHubStrategy within Passport.
//   Strategies in Passport require a `verify` function, which accept
//   credentials (in this case, an accessToken, refreshToken, and GitHub
//   profile), and invoke a callback with a user object.
passport.use(new GitHubStrategy({
  clientID: GITHUB_CLIENT_ID,
  clientSecret: GITHUB_CLIENT_SECRET,
  callbackURL: "https://ide-021dae7150fa4cc59d08dabcff3335f0-8080.cs50.ws/githubsignin/callback"
},
function(accessToken, refreshToken, profile, done) {
  // asynchronous verification, for effect...
  process.nextTick(function () {

    // To keep the example simple, the user's GitHub profile is returned to
    // represent the logged-in user.  In a typical application, you would want
    // to associate the GitHub account with a user record in your database,
    // and return that user instead.
    return done(null, profile);
  });
}
));



/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});


// //user log in check
// router.post('/log_in_check', function(req, res, next) { //Connect to the database
//     req.pool.getConnection(
//         function(err,connection) {
//             if (err) {
//                 res.sendStatus(500);
//                 return;
//             }
//             const user_input = {
//               id : req.body.id,
//               password : req.body.password
//             };
//             console.log(user_input);
//             var query = "SELECT user_id FROM user WHERE user.user_id = ? AND user.password = ? ;";
//             connection.query(query,[user_input.id, user_input.password] ,function(err, rows, fields) {
//             if (rows.length > 0){
//                 req.session.loggedin =true;
//                 req.session.id = id;
//             }else{
//                 req.send('invalid log in');
//             }
//             connection.release(); // release connection
//             if (err) {
//                 res.sendStatus(500);
//                 return;
//             }
//             res.json(rows); //send response
//         });
//     });
// });




// ---------------------- user-sign-up
router.post('/user_sign_up', function(req, res, next) { //Connect to the database
    req.pool.getConnection(
        function(err,connection) {
            if (err) {
                res.sendStatus(500);
                return;
            }

            const add_user = {
                first_name: req.body.first_name,
                last_name: req.body.last_name,
                email: req.body.email,
                password: req.body.password,
                phone:  req.body.phone
            };
            console.log(req.body);
            var query = "INSERT INTO user (first_name,last_name,email,password,phone) VALUES(?,?,?,?,?) ;";
            connection.query(query,[add_user.first_name,add_user.last_name,add_user.email,add_user.password,add_user.phone],function(err, rows, fields) {
            connection.release(); // release connection
            if (err) {
                res.sendStatus(500);
                return;
            }
            res.send();
        });
    });
});


//---------------------------------github login
router.get('/githubsignin', passport.initialize(), passport.authenticate('github', { scope: [ 'user:email' ], session: false }), function(req, res){ /* Leave empty */ });

router.get('/githubsignin/callback', passport.initialize(), passport.authenticate('github', { failureRedirect: '/loginfailed.html', session: false }), function(req, res, next) {

  // successful login
  // req.user contains login details
  console.log(req.user);

  res.redirect('/user_page.html');

});












module.exports = router;
