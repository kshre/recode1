var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

/* GET userlist page */
router.get('/userlist', function(req, res, next) {
  var db = req.db;
  var collection = db.get('usercollection');
  collection.find({}, {}, function(err, docs){
    res.render('userlist', { "userlist": docs } );
  });  
});
/* GET newuser page */
router.get('/newuser', function(req, res, next) {
  res.render('newuser', {title: "Add new user"});  
});

/* POST adduser page */
router.post('/adduser', function(req, res, next) {
  var db = req.db;
  var collection = db.get("usercollection");

  var username = req.body.username;
  var useremail = req.body.useremail;

  collection.insert( { "username" : username, "email" : useremail }, function(err, docs) {
    if(err) { res.send("There was a problem adding information to the database")}
    else { res.redirect("userlist")}
  });  
});

module.exports = router;
