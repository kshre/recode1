var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

/* GET userlist page */
router.get('/userlist', function( req, res, next ) {
  var db = req.db;
  var collection = db.get('usercollection');
  collection.find({},{},function( err, docs ){
    res.render('userlist', { title: "User List", userlist: docs });
  });
});

/* GET newuser page */
router.get('/newuser', function(req, res, next) {
  res.render('newuser', { title: "Add new user"});
});

/* POST adduser */
router.post('/adduser', function(req, res, next) {
  // database setup
  var db = req.db;
  var collection = db.get('usercollection');
  
  // get username and useremail from the POST query
  var username = req.body.username;
  var useremail = req.body.useremail;

  // insert into db
  collection.insert( { 'username': username, 'email': useremail }, function(e, d) {
    if(e){
      res.send("There was a problem storing data into the database");
    } else {
      res.redirect('userlist');
    }
  });  
});
module.exports = router;
