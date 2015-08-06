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

module.exports = router;
