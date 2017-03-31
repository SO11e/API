var mongoose = require('mongoose');
var User = mongoose.model('User');
var jwt = require('jwt-simple');
var secret = require('../config/secret');

var userRepo = {
    localLogin: function(req,res,next){
            User.findOne({ 'local.email' :  req.body.email }, function(err, user) {
                // if there are any errors, return the error
            	if (err)
                	return res.send(500, err);

                // if no user is found, return the message
                if (!user || !user.validPassword(req.body.password))
                    return res.send(400, {"msg":"Something went wrong, try again"})
                // all is well, return user
                else
                    var token = jwt.encode(user, secret.secret)
					return res.send(token);
            });
        

    },

    localSignup: function(req,res,next){
        User.findOne({'local.email': req.body.email}, function(err, existingUser) {

                // if there are any errors, return the error
                if (err)
                	return res.send(500, err);

                // check to see if there's already a user with that email
                if (existingUser) 
                    return res.send(400, {"msg":"Email is taken"});

                //  We're not logged in, so we're creating a brand new user.
                else {
                    // create the user
                    var newUser            = new User();

                    newUser.local.email    = req.body.email;
                    newUser.local.password = newUser.generateHash(req.body.password);

                    newUser.save(function(err) {
                        if (err)
                            throw err;

                        var token = jwt.encode(newUser, secret.secret)
					    return res.send(token);
                    });
                }

            });
    },


    currentUser : function(req){
        var token = req.header('bearer');
		if(token){
			var user = jwt.decode(token, secret.secret);
				return user;
		}
		else{
			return null;
		}
    }
}

module.exports = userRepo;