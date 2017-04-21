var mongoose = require('mongoose');
var User = mongoose.model('User');

var userRepo = {
    localLogin: function(req,res,next){
            User.findOne({ 'email' :  req.body.email }, function(err, user) {
                // if there are any errors, return the error
            	if (err)
                	return res.send(500, err);

                // if no user is found, return the message
                if (!user || !user.validPassword(req.body.password))
                    return res.send(400, {"msg":"Something went wrong, try again"})
                // all is well, return user
                else
                    var token = user.encode(user);
					return res.send(token);
            });
        

    },

    localSignup: function(req,res,next){
        User.findOne({'email': req.body.email}, function(err, existingUser) {

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

                    newUser.email    = req.body.email;
                    newUser.password = newUser.generateHash(req.body.password);
                    newUser.region   = req.body.region;

                    if(req.body.roles)
                        newUser.roles = req.body.roles;

                    newUser.save(function(err) {
                        if (err)
                            throw err;

                        var token = newUser.encode(newUser);
					    return res.send(token);
                    });
                }

            });
    },


    currentUser : function(req, res){
        var token = req.header('bearer');
        if(token){
            User.validToken(token, function(err,user){
                if(!err){
                    return res.send(user);
                }
                else{
                    return res.send(err);
                }
            })
        }
        else{
            return res.send(400);
        }
    }
}

module.exports = userRepo;