var mongoose = require('mongoose');
var Region = mongoose.model('Region');
var User = mongoose.model('User');

var regionRepo = {
    create: function (req, res) {
        var region = new Region(req.body);

        var token = req.header('bearer');

        if (token) {
            User.validToken(token, function (err, user) {
                if (!err) {
                    region.manager = user._id;
                    region.save((err) => {
                        if (err) {
                            return res.send({
                                "status": 500,
                                "error": err
                            })
                        }

                        return res.send(region);
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

        Region.find().limit(perPage).skip(page).exec(function (err, data) {
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

}

module.exports = regionRepo;