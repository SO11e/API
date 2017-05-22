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
					return res.send(400, {'msg':'Token expired'});
				}
			})			
		}
		else{
			return res.send(400);
		}
		
	},

	isAdmin: function(req,res,next){
		var token = req.header('bearer');
		if(token){
			User.validToken(token, function(err, user){
				if(!err){
					if(user.roles === 'admin'){
						return next();
					}
					else{
						return res.send(400, {'msg':'User is not admin'})
					}
				}
				else{
					return res.send(400, {'msg':'Wrong token'});
				}
			})			
		}
		else{
			return res.send(400);
		}
	}
}

module.exports = authMiddleware;