var mongoose = require('mongoose');
var User = mongoose.model('User');
var jwt = require('jwt-simple');
var secret = require('../config/secret');

var authMiddleware = {
    // route middleware to ensure user is logged in
	isLoggedIn: function(req, res, next) {
		var token = req.header('bearer');
		if(token){
			var user = jwt.decode(token, secret.secret);
				User.findOne({ 'local.email' :  user.local.email }, function(err, user) {
					// if there are any errors, return the error
					if (err)
						return res.send(500, err);
					else
						return next();
				}); 
			
		}
		else{
			return res.send(400);
		}
		
	},
}

module.exports = authMiddleware;