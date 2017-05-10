var mongoose = require('mongoose');
var User = mongoose.model('User');
var jwt = require('jwt-simple');
var secret = require('../config/secret');

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

    create: function (req, res, next) {
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

                var street = req.body.street;
                var housenumber = req.body.housenumber;
                var zipcode = req.body.zipcode;
                var city = req.body.city;

                newUser.email = req.body.email;
                newUser.password = newUser.generateHash(req.body.password);
                newUser.region = req.body.region;
                newUser.firstname = req.body.firstname;
                newUser.lastname = req.body.lastname;

                if (street)
                    newUser.street = street;
                if (housenumber)
                    newUser.housenumber = housenumber;
                if (zipcode)
                    newUser.zipcode = zipcode;
                if (city)
                    newUser.city = city;

                if (req.body.roles)
                    newUser.roles = req.body.roles;

                newUser.save(function (err) {
                    if (err)
                        throw err;

                    return res.send(200, { 'msg': 'Succes, User Added' })
                });
            }

        });
    },

    getUsers: function(req,res){
        var perPage = 10;
        var page = 0 * perPage;

        if (req.query.perPage != null) {
            perPage = parseInt(req.query.perPage);
            console.log(req.query.perPage + ' perPage');
        }
        if (req.query.page != null) {
            page = parseInt(req.query.page * perPage);
            console.log(req.query.page + ' page');
        }

        User.find({}, '-password').limit(perPage).skip(page).exec(function (err, data) {
            if (!err) {
                var json = [];
                data.forEach(function (item, key) {
                    json.push(item);
                })

                return res.send({ "page": page, "perPage": perPage, "data": json, });
            } else {
                throw err;
            }
        })
    },

    getUser: function (req, res) {
        var token = req.header('bearer');
        if (token) {
            User.validToken(token, function (err, user) {
                if (!err) {
                    return res(null, user);
                }
                else {
                    return res(err);
                }
            })
        }
        else {
            return res(400);
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
                        User.findOne({ '_id': req.params.id }, function (err, user) {
                            if (!err) {
                                var localemail = req.body.email;
                                var localpassword = req.body.password;

                                var firstname = req.body.firstname;
                                var lastname = req.body.lastname;
                                var street = req.body.street;
                                var housenumber = req.body.housenumber;
                                var zipcode = req.body.zipcode;
                                var city = req.body.city;

                                if (isAdmin){
                                    var localregion = req.body.region;
                                    var localroles = req.body.roles;
                                }
                                    

                                if (localemail)
                                    user.email = localemail;
                                if (localpassword)
                                    user.password = user.generateHash(localpassword);
                                
                                if (firstname)
                                    user.firstname = firstname;
                                if (lastname)
                                    user.lastname = lastname;
                                if (street)
                                    user.street = street;
                                if (housenumber)
                                    user.housenumber = housenumber;
                                if (zipcode)
                                    user.zipcode = zipcode;
                                if (city)
                                    user.city = city;

                                if (isAdmin && localregion)
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