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


//venue_log_in
router.post('/login', function(req, res, next) {
    venue_id = req.body.user_id;
    password = req.body.password;
    req.pool.getConnection( function(err, connection){
        //console.log('hello1');
      if (err) {
          res.sendStatus(500);
          return;
      }
       //console.log('hello2');
       var query = "SELECT venue_id, password From venue WHERE venue_id = ? AND password =?";
       params = [user_id, password];

        if(user_id && password){
           connection.query(query, params, function(err, rows, fields){
            if(rows.length == 0){
                res.sendStatus(500);
                return;
            }else{
                req.session.loggedin = true;
                req.session.user_id = user_id;
                console.log("venue : log in sucess.");
                                log_in_user_id = user_id;
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
//official log in
router.post('/login', function(req, res, next) {
    venue_id = req.body.user_id;
    password = req.body.password;
    req.pool.getConnection( function(err, connection){
        //console.log('hello1');
      if (err) {
          res.sendStatus(500);
          return;
      }
       //console.log('hello2');
       var query = "SELECT official_id, password From health_official WHERE official_id = ? AND password =?";
       params = [user_id, password];

        if(user_id && password){
           connection.query(query, params, function(err, rows, fields){
            if(rows.length == 0){
                res.sendStatus(500);
                return;

            }else{
                req.session.loggedin = true;
                req.session.user_id = user_id;
                console.log("official : log in sucess.");
                                log_in_user_id = user_id;
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

router.get('/take_user_id',function(req, res, next) {

    res.send(log_in_user_id);
});


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
