var express = require('express');
var router = express.Router();

var log_in_user_id;

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

// let users = {
//     test: 'password',
//     test2: 'p2'
// };

router.get('/venuelist', function(req, res, next) {
   //select statement from the db
   req.pool.getConnection( function(err, connection){
       if (err) {
           res.sendStatus(500);
           return;
       }
       var query = "SELECT venue_id, venue_name FROM venue";
       connection.query(query, function(err, rows, fields){
           connection.release();
           if(err){
               res.sendStatus(500);
               return;
           }
           res.json(rows);
       });
   });
});
//--------------------------------------user login--------------------------------------

router.post('/login', function(req, res, next) {

    user_id = req.body.user_id;
    password = req.body.password;


    req.pool.getConnection( function(err, connection){
        //console.log('hello1');
      if (err) {
          res.sendStatus(500);
          return;
      }
       //console.log('hello2');
       var query = "SELECT user_id, password From user WHERE user_id = ? AND password =?";
       params = [user_id, password];
        if(user_id && password){
           connection.query(query, params, function(err, rows, fields){
               console.log(rows.length);
            if(rows.length == 0){
                res.sendStatus(500);
                return;

            }else{
                req.session.loggedin = true;
                req.session.user_id = user_id;
                console.log("user : log in sucess.");
                                log_in_user_id = user_id;
                                console.log("user id", log_in_user_id);
                res.send(user_id);
            }


            res.end();
           });
        }else{
            res.send('Please enter Username and Password!');
            res.end();
        }

    });


});


//--------------------------------------venue_log_in----------------------------------

router.post('/login_v', function(req, res, next) {
    venue_id = req.body.user_id;
    password = req.body.password;


    req.pool.getConnection( function(err, connection){
        // console.log('hi1');
      if (err) {
          res.sendStatus(500);
          return;
      }
    //   console.log('hi2');
       var query = "SELECT venue_id, password FROM venue WHERE venue_id = ? AND password =?";
       params = [venue_id, password];


        if(venue_id && password){
           connection.query(query, params, function(err, rows, fields){
            //   console.log("params",params);
            if(rows.length == 0){
                res.sendStatus(500);
                return;
            }else{
                req.session.loggedin = true;
                req.session.venue_id = venue_id;
                console.log("venue : log in sucess.");
                log_in_user_id = venue_id;
                console.log("venue id", log_in_user_id);
                res.send(venue_id);
            }

            res.end();
           });
        }else{
            res.send('Please enter Username and Password!');
            res.end();
        }

    });
});


//------------------------------------------------official log in---------------------------------------------

router.post('/login_o', function(req, res, next) {
    official_id = req.body.user_id;
    password = req.body.password;
    req.pool.getConnection( function(err, connection){
        //console.log('hello1');
      if (err) {
          res.sendStatus(500);
          return;
      }
       //console.log('hello2');
       var query = "SELECT official_id, password From health_official WHERE official_id = ? AND password =?";
       params = [official_id, password];

        if(official_id && password){
           connection.query(query, params, function(err, rows, fields){
            if(rows.length == 0){
                res.sendStatus(500);
                return;

            }else{
                req.session.loggedin = true;
                req.session.user_id = official_id;
                console.log("official : log in sucess.");
                log_in_user_id = official_id;
                res.send(official_id);
            }

            res.end();
           });
        }else{
            res.send('Please enter Username and Password!');
            res.end();
        }

    });
});


router.get('/take_user_id',function(req, res, next) {

    res.send(log_in_user_id);
    console.log("take user id ", log_in_user_id);
    res.end();

});


//////////////////////////////////////////showing information part/////////////////////////////////////////
// ------------------------------------individual user_info------------------------------

router.get('/user_info', function(req, res, next) {

    // if('user' in req.session){
    //     console.log(req.session.user);
    // }

    req.pool.getConnection( function(err, connection){
        if (err) {
            res.sendStatus(500);
            return;
        }

        query = "SELECT user_id, last_name, first_name, phone, email FROM user WHERE user_id= ?";

        params = [log_in_user_id];
        connection.query(query, params, function(err, rows, fields){
            connection.release();
            if(err){
                res.sendStatus(500);
                return;
            }
            res.json(rows);
        });
    });
});


//---------------------------------------------venue info -------------------------------------------

router.get('/venue_info', function(req, res, next) {

    // if('user' in req.session){
    //     console.log(req.session.user);
    // }

    req.pool.getConnection( function(err, connection){
        if (err) {
            res.sendStatus(500);
            return;
        }


        var query = "SELECT venue_id, venue_name, venue_location, contact_num FROM venue WHERE venue_id = ?";
        params = [log_in_user_id];
        console.log("venueid",log_in_user_id);
        // console.log(params);

        connection.query(query, params, function(err, rows, fields){
            connection.release();
            if(err){
                res.sendStatus(500);
                return;
            }
            res.json(rows);
            // console.log("hello");
            // console.log(rows);
        });
    });
});

//------------------------------------------official info----------------------------------

router.get('/official_info', function(req, res, next) {

    // if('user' in req.session){
    //     console.log(req.session.user);
    // }

    req.pool.getConnection( function(err, connection){
        if (err) {
            res.sendStatus(500);
            return;
        }


        var query = "SELECT official_id FROM health_official WHERE official_id = ?";
        params = [log_in_user_id];
        console.log("official id",log_in_user_id);
        // console.log(params);

        connection.query(query, params, function(err, rows, fields){
            connection.release();
            if(err){
                res.sendStatus(500);
                return;
            }
            res.json(rows);
            // console.log("hello");
            // console.log(rows);
        });
    });
});


router.get('/new_offi_info', function(req, res, next) {

    // if('user' in req.session){
    //     console.log(req.session.user);
    // }

    req.pool.getConnection( function(err, connection){
        if (err) {
            res.sendStatus(500);
            return;
        }

        query = "SELECT * FROM health_official ORDER BY ID DESC LIMIT 1;";

        connection.query(query, params, function(err, rows, fields){
            connection.release();
            if(err){
                res.sendStatus(500);
                return;
            }
            res.json(rows);
        });
    });
});

//////////////////////////////////////////changing information part/////////////////////////////////////////
//------------------------------------------change user info-------------------------------------------------

router.post('/change_info', function(req, res, next) {
    // insert statement to the db
    //console.log(req.body);
    first_name = req.body.first_name;
    last_name = req.body.last_name;
    phone = req.body.phone;
    email = req.body.email;
    password = req.body.password;


    req.pool.getConnection( function(err, connection){

       if (err) {
           res.sendStatus(500);
           return;
       }


       var query = "UPDATE user SET first_name = ?, last_name=?, phone=?, email=?, password=? WHERE user_id=?";
       params = [first_name, last_name, phone, email, password, log_in_user_id];



       connection.query(query, params, function(err, rows, fields){
           connection.release();
           if(err){
               console.log("error1?");
               console.log("changed_info", params);
               res.sendStatus(500);
               return;
           }
           console.log('error2?');
           res.sendStatus(200);
       });
   });
});

//------------------------------------------change venue info-------------------------------------------------
router.post('/change_venue_info', function(req, res, next) {
    // insert statement to the db
    //console.log(req.body);
    venue_name = req.body.venue_name;
    contact_num = req.body.contact_num;
    venue_location = req.body.venue_location;
    password = req.body.password;


    req.pool.getConnection( function(err, connection){

       if (err) {
           res.sendStatus(500);
           return;
       }


       var query = "UPDATE venue SET venue_name = ?, contact_num=?, venue_location=?, password=? WHERE venue_id=?";
       params = [venue_name, contact_num, venue_location, password, log_in_user_id];



       connection.query(query, params, function(err, rows, fields){
           connection.release();
           if(err){
              console.log("error1?");
               console.log("changed_info", params);
               res.sendStatus(500);
               return;
           }
          console.log('error2?');
           res.sendStatus(200);
       });
   });
});

//------------------------------------------user check in----------------------------------------------
router.post('/add_user_checkin', function(req, res, next) {
    // insert statement to the db
    //console.log(req.body);
    venue_id = req.body.venue_id;


    console.log('venue_checkin_id: ', venue_id);

    req.pool.getConnection( function(err, connection){
        //console.log('hello1');
       if (err) {
           res.sendStatus(500);
           return;
       }
       //console.log('hello2');
       var query = "INSERT INTO check_in(user_id, venue_id) VALUES (?, ?)";
       params = [log_in_user_id, venue_id];

       connection.query(query, params, function(err, rows, fields){
           connection.release();
           if(err){
               //console.log(err);
               res.sendStatus(500);
               return;
           }

           res.sendStatus(200);
           console.log('successfully checked in');
       });
   });
});

//-------------------------------------------user check in history---------------------------------------

router.get('/user_checkin_history', function(req, res, next) {
   //select statement from the db
   req.pool.getConnection( function(err, connection){
       if (err) {
           res.sendStatus(500);
           return;
       }
       var query = "SELECT venue.venue_location, check_in.log_in_time FROM check_in INNER JOIN venue ON venue.venue_id = check_in.venue_id WHERE user_id=?";
       params = [log_in_user_id];

       connection.query(query, params, function(err, rows, fields){
           connection.release();
           if(err){
               res.sendStatus(500);
               return;
           }
           res.json(rows);
       });
   });
});


//-------------------------------------------log out-----------------------------------------------------
router.post('/logout', function(req, res, next) {
    delete req.session.user;
    res.send();
                    log_in_user_id = 0;
});

//above here
router.use(function(req, res, next){
    //if user has loged in
    if('user' in req.session){
      next();
    }else{
        res.sendStatus(500);
        res.sendStatus(401);
    }
});

//after log in




module.exports = router;
