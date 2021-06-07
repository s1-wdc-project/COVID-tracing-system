var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

module.exports = router;




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
            }
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