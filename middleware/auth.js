var mongoose = require('mongoose');
var User = mongoose.model('User');

var authMiddleware = {
    // route middleware to ensure user is logged in
	isLoggedIn: function(req, res, next) {
		var token = req.header('bearer');
		if(token){
			User.validToken(token, function(err, user){
				if(!err){
					return next();
				}
				else{
					return res.send(500, err);
				}
			})			
		}
		else{
			return res.send(400);
		}
		
	},
}

module.exports = authMiddleware;