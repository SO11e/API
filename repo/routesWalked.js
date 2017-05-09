var mongoose = require('mongoose');
var RoutesWalked = mongoose.model('RoutesWalked');
var User = mongoose.model('User');

var routesWalkedRepo = {
    create: function (req, res) {
        var routesWalked = new RoutesWalked(req.body);
        var token = req.header('bearer');

        if (token) {
            User.validToken(token, function (err, user) {
                if (!err) {
                    routesWalked.userId = user._id;
                    routesWalked.save((err) => {
                        if (err) {
                            return res.send({
                                "status": 500,
                                "error": err
                            })
                        }

                        return res.send(routesWalked);
                    });
                }
            });
        }
    },

    getall: function (req, res) {
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

        RoutesWalked.find().limit(perPage).skip(page).exec(function (err, data) {
            if (!err) {
                var json = [];
                data.forEach(function (item, key) {
                    var thing = item;
                    json.push(thing);
                })

                return res.send({ "page": page, "perPage": perPage, "data": json, });
            } else {
                throw err;
            }
        })
    },

    getbyregion: function (req, res) {
        Issue.findOne({ '_id': req.params.id }, function (err, polish) {
            if (!err) {
                return res.send(polish);
            }
            else {
                return res.send(400);
            }
        });
    },

}

module.exports = routesWalkedRepo;