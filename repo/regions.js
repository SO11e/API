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

        Region.find().populate('manager').limit(perPage).skip(page).exec(function (err, data) {
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

    update: function(req,res){
        Region.findOne({ '_id': req.params.id }, function (err, region) {
            if (!err) {

                var name = req.body.name;
                var manager = req.body.manager;
                var isActive = req.body.isActive;
                var postalCodes = req.body.postalCodes;

                if (name)
                    region.name = name;
                if (manager)
                    region.manager = manager;
                if (postalCodes)
                    region.postalCodes = postalCodes;
                if (isActive)
                    region.isActive = isActive;

                region.save((err) => {
                    if (err) {
                        res.status(500);
                        return res.send({
                            "status": 500,
                            "error": err
                        });
                    }
                    res.status(201);
                    return res.json(region);
                });
            }
        })
    }
}

module.exports = regionRepo;