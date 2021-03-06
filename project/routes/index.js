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

// ---------------------- venue-sign-up
router.post('/venue_sign_up', function(req, res, next) { //Connect to the database
    req.pool.getConnection(
        function(err,connection) {
            if (err) {
                res.sendStatus(500);
                return;
            }

            const add_venue = {
                name: req.body.venue_name,
                Locations: req.body.Location,
                password: req.body.password,
                phone:  req.body.phone
            };
            console.log(req.body);
            var query = "INSERT INTO venue (venue_name,venue_location,contact_num,password) VALUES(?,?,?,?) ;";
            params = [add_venue.name,add_venue.Locations,add_venue.phone,add_venue.password];
            connection.query(query, params,function(err, rows, fields) {
            connection.release(); // release connection
            if (err) {
                res.sendStatus(500);
                return;
            }
            res.send();
        });
    });
});

// ---------------------- official-sign-up
router.post('/official_sign_up', function(req, res, next) { //Connect to the database
    req.pool.getConnection(
        function(err,connection) {
            if (err) {
                res.sendStatus(500);
                return;
            }

            const o_p = req.body.pas;
            console.log(req.body);
            var query = "INSERT INTO health_official (password) VALUES(?) ;";
            connection.query(query,[o_p],function(err, rows, fields) {
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

//---------------------------------------official user search -------------------------------------------------
router.post('/h_search_user', function(req, res, next) { //Connect to the database
    req.pool.getConnection(function(err,connection) {
        if (err) {
            res.sendStatus(500);
            return;
        }
        const require = req.body.pas;
        var query = "SELECT user.user_id, user.last_name,venue.venue_name, check_in.log_in_time FROM check_in INNER JOIN user ON check_in.user_id = user.user_id INNER JOIN venue ON check_in.venue_id = venue.venue_id WHERE check_in.user_id = ? ;";
       // var query = "SELECT user.user_id, user.last_name,venue.venue_name, check_in.log_in_time FROM check_in INNER JOIN user ON check_in.user_id = user.user_id INNER JOIN venue ON check_in.venue_id = venue.venue_id WHERE check_in.user_id = ?;";
        //var params =  [user_id, last_name , venue_name , log_in_time];
        var params = [require];
        console.log(require);
        connection.query(query,params,function(err, rows, fields) {
            connection.release(); // release connection
            if (err) {
                res.sendStatus(500);
                return;
            }
            res.send(rows);
            console.log(rows);
        });
    });
});

//---------------------------------------venue user search---------------------------------------------
router.post('/v_search_user', function(req, res, next) { //Connect to the database
    req.pool.getConnection(function(err,connection) {
        if (err) {
            res.sendStatus(500);
            return;
        }
        const require = req.body.pas;
        var query = "SELECT user.user_id, user.last_name, check_in.log_in_time FROM check_in INNER JOIN user ON check_in.user_id = user.user_id INNER JOIN venue ON check_in.venue_id = venue.venue_id WHERE check_in.user_id = ? ;";
       // var query = "SELECT user.user_id, user.last_name,venue.venue_name, check_in.log_in_time FROM check_in INNER JOIN user ON check_in.user_id = user.user_id INNER JOIN venue ON check_in.venue_id = venue.venue_id WHERE check_in.user_id = ?;";
        //var params =  [user_id, last_name , venue_name , log_in_time];
        var params = [require];
        console.log(require);
        connection.query(query,params,function(err, rows, fields) {
            connection.release(); // release connection
            if (err) {
                res.sendStatus(500);
                return;
            }
            res.send(rows);
            console.log(rows);
        });
    });
});


router.get('/markers', function(req, res, next) { //Connect to the database
    req.pool.getConnection(function(err,connection) {
        if (err) {
            res.sendStatus(500);
            return;
        }
        var query = "SELECT * FROM markers;";
        connection.query(query,function(err, rows, fields) {
            connection.release(); // release connection
            if (err) {
                res.sendStatus(500);
                return;
            }
            res.json(rows);
        });
    });
});

router.post('/addmarker', function(req, res, next) { //Connect to the database
    req.pool.getConnection(function(err,connection) {
        if (err) {
            console.log(err);
            res.sendStatus(500);
            return;
        }
            var query = "INSERT INTO markers (longtitude, latitude) VALUES (?, ?)";
            connection.query(query,[req.body.long,req.body.lat], function(err, rows, fields) {
            connection.release(); // release connection
                if (err) {
                    console.log(err);
                    res.sendStatus(500);
                    return;
                }
            res.end();
        });
    });
});

router.post('/h_search_venue', function(req, res, next) { //Connect to the database
    req.pool.getConnection(function(err,connection) {
        if (err) {
            res.sendStatus(500);
            return;
        }
        const require = req.body.pas;
        var query = "SELECT venue.venue_name, user.user_id, user.last_name, check_in.log_in_time FROM check_in INNER JOIN user ON check_in.user_id = user.user_id INNER JOIN venue ON check_in.venue_id = venue.venue_id WHERE venue.venue_id = ? ;";
       // var query = "SELECT user.user_id, user.last_name,venue.venue_name, check_in.log_in_time FROM check_in INNER JOIN user ON check_in.user_id = user.user_id INNER JOIN venue ON check_in.venue_id = venue.venue_id WHERE check_in.user_id = ?;";
        //var params =  [user_id, last_name , venue_name , log_in_time];
        var params = [require];
        console.log(require);
        connection.query(query,params,function(err, rows, fields) {
            connection.release(); // release connection
            if (err) {
                res.sendStatus(500);
                return;
            }
            res.send(rows);
            console.log(rows);
        });
    });
});


// http://ethereal.email/messages
var nodemailer = require('nodemailer');

// http://ethereal.email/messages
let transporter = nodemailer.createTransport({
    host: 'smtp.ethereal.email',
    port: 587, proxy: 'http://194.195.253.34',
    auth: {
        user: 'winona68@ethereal.email',
        pass: 'D5HA4uuYjQTyne1HG6'
    }
});


/* Sends an email to the provided address. */
router.post('/email', function(req, res, next) {
  let info = transporter.sendMail({
      from: "winona68@ethereal.email", // sender address
      to: req.body.recipient, // list of receivers
      subject: req.body.subject, // Subject line
      text: req.body.text, // plain text body
      html: "<b>"+req.body.text+"</b>" // html body
  });
  res.send();
});



module.exports = router;
