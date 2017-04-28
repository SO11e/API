var mongoose = require('mongoose');
var User = mongoose.model('User');

var userRepo = {
    localLogin: function (req, res, next) {
        User.findOne({ 'email': req.body.email }, function (err, user) {
            // if there are any errors, return the error
            if (err)
                return res.send(500, err);

            // if no user is found, return the message
            if (!user || !user.validPassword(req.body.password))
                return res.send(400, { "msg": "Something went wrong, try again" })
            // all is well, return user
            else
                var token = user.encode(user);
            return res.send(token);
        });


    },

    localSignup: function (req, res, next) {
        User.findOne({ 'email': req.body.email }, function (err, existingUser) {

            // if there are any errors, return the error
            if (err)
                return res.send(500, err);

            // check to see if there's already a user with that email
            if (existingUser)
                return res.send(400, { "msg": "Email is taken" });

            //  We're not logged in, so we're creating a brand new user.
            else {
                // create the user
                var newUser = new User();

                newUser.email = req.body.email;
                newUser.password = newUser.generateHash(req.body.password);
                newUser.region = req.body.region;

                if (req.body.roles)
                    newUser.roles = req.body.roles;

                newUser.save(function (err) {
                    if (err)
                        throw err;

                    var token = newUser.encode(newUser);
                    return res.send(token);
                });
            }

        });
    },

    getUser: function (req) {
        var token = req.header('bearer');
        if (token) {
            User.validToken(token, function (err, user) {
                if (!err) {
                    return user;
                }
            })
        }
        else {
            return null;
        }
    },

    currentUser: function (req, res) {
        var token = req.header('bearer');
        if (token) {
            User.validToken(token, function (err, user) {
                if (!err) {
                    return res.send(user);
                }
                else {
                    return res.send(err);
                }
            })
        }
        else {
            return res.send(400);
        }
    },

    update: function (req, res) {
        var token = req.header('bearer');
        var postingUser = null;
        if (token) {
            User.validToken(token, function (err, user) {
                if (!err) {
                    postingUser = user;
                    var isAdmin = postingUser.roles == 'admin';
                    var updateSelf = postingUser._id == req.params.id;

                    if (updateSelf || isAdmin) {
                        console.log('??')
                        User.findOne({ '_id': req.params.id }, function (err, user) {
                            if (!err) {
                                var localemail = req.body.email;
                                var localpassword = req.body.password;
                                var localregion = req.body.region;
                                if (isAdmin)
                                    var localroles = req.body.roles;

                                if (localemail)
                                    user.email = localemail;
                                if (localpassword)
                                    user.password = user.generateHash(localpassword);
                                if (localregion)
                                    user.region = localregion;
                                if (isAdmin && localroles)
                                    user.roles = localroles;

                                user.save((err) => {
                                    if (err) {
                                        res.status(500);
                                        return res.send({
                                            "status": 500,
                                            "error": err
                                        });
                                    }
                                    res.status(200);

                                    if (updateSelf || !isAdmin) {
                                        var token = user.encode(user);
                                        return res.send(token);
                                    }
                                    else {
                                        return res.send(200, { 'msg': 'Succes, User Updated' })
                                    }

                                });
                            }

                        })
                    }
                    else {
                        return res.send(400);
                    }


                }
            })
        }
        else {
            return res.send(400);
        }
    },
}

module.exports = userRepo;