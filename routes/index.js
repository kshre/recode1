var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'everything is plumbing :P' });
});

/* GET userlist page */
router.get('/userlist', function(req, res, next) { 
  var db = req.db;
  var collection = db.get('usercollection');
  collection.find( {}, {}, function(err,docs){
    res.render('userlist', { "userlist" : docs } );
  });
});

/* GET newuser page*/
router.get('/newuser', function(req, res, next) {
  res.render('newuser', {title: "Add new user"});
});

/* POST adduser */
router.post('/adduser', function(req, res, next) {
  var db = req.db;
  var collection = db.get('usercollection');
  
  var username = req.body.username;
  var email = req.body.useremail;

  collection.insert( { "username": username, "email": email} , function(err, docs) {
    if(err) {res.send("there was a problem adding data to the database"); }
    else { res.redirect("userlist"); }
  });
});

module.exports = router;
