var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

// let users = {
//     test: 'password',
//     test2: 'p2'
// };


router.post('/login', function(req, res, next) {
    // if(req.body.user in users){
    //     if(users[req.body.user] === req.body.pass){
    //         req.session.user = req.body.user;
    //         res.send(req.session.user);
    //     }else{
    //         res.sendStatus(401);
    //     }
    // }else{
    //     res.sendStatus(401);
    // }

    user_id = req.body.user_id;
    password = req.body.password;

    // console.log(user_id);
    // console.log(password);


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
        //       connection.release();
        //     if(err){
        //       //console.log(err);
        //       res.sendStatus(500);
        //       return;
        //   }
        //   //console.log('hello3');
        //   res.sendStatus(200);
            if(rows.length > 0){
                req.session.loggedin = true;
                req.session.user_id = user_id;
                // res.send()
            }else{
                res.send("Incorrect");
            }

            res.end();
           });
        }else{
            res.send('Please enter Username and Password!');
            res.end();
        }

    });


});

router.post('/logout', function(req, res, next) {
    delete req.session.user;
    res.send();
});

//above here
router.use(function(req, res, next){
    //if user has loged in
    if('user' in req.session){
      next();
    }else{
        res.sendStatus(401);
    }
});

//after log in


module.exports = router;
