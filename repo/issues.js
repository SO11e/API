var mongoose = require('mongoose');
var Issue = mongoose.model('Issue');

var issueRepo = {
    create: function (req, res) {
        var issue = new Issue(req.body);    
        console.log(issue);

        issue.save((err) => {
            if (err) {
                console.log('ERROR');
                //res.status(500);
                return res.send({
                    "status": 500,
                    "error": err
                })
            }
            res.status(201);
            return res.json(issue);
        });
        
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

        Issue.find().limit(perPage).skip(page).populate('region').exec(function (err, data) {
            if (!err) {
                var json = [];
                data.forEach(function (item, key) {
                    item.fullimage = undefined;
                    var thing = item;
                    json.push(thing);
                })

                return res.send({ "page": page, "perPage": perPage, "data": json, });
            } else {
                throw err;
            }
        })
    },

    readsingle: function (req, res) {
        Issue.findOne({ '_id': req.params.id }).populate('region').exec(function (err, issue) {
            if (!err) {
                issue.thumbnail = undefined;
                return res.send(issue);
            }
            else {
                return res.send(400);
            }
        });
    },

    getbyregion: function (req, res) {
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

        Issue.find({ region: req.params.regionid }).limit(perPage).skip(page).exec(function (err, data) {
            if (!err) {
                var json = [];
                data.forEach(function (item, key) {
                    var thing = item;
                    json.push(thing);
                })

                return res.send({ "page": page, "perPage": perPage, "data": json, });
            } else {
                return res.send(400, err);
            }
        })

    },

    delete: function (req, res) {
        Issue.remove({ '_id': req.params.id }, function (err) {
            if (err) {
                res.status(500);
                return res.send({
                    "status": 500,
                    "error": err
                });
            }
            return res.send(200);
        });
    },

    update: function (req, res) {
        Issue.findOne({ '_id': req.params.id }, function (err, issue) {
            if (!err) {

                var streetName = req.body.streetName;
                var houseNumber = req.body.houseNumber;
                var zipCode = req.body.zipCode;
                var city = req.body.city;
                var region = req.body.region;
                var status = req.body.status;
                var description = req.body.description;
                var latitude = req.body.latitude;
                var longitude = req.body.longitude;
                var dateresolved = req.body.dateresolved;
                var thumbnail = req.body.thumbnail;
                var fullimage = req.body.fullimage;

                if (streetName)
                    issue.streetName = streetName;
                if (houseNumber)
                    issue.houseNumber = houseNumber;
                if (zipCode)
                    issue.zipCode = zipCode;
                if (city)
                    issue.city = city;
                if (region)
                    issue.region = region;
                if (status)
                    issue.status = status;
                if (description)
                    issue.description = description;
                if (latitude)
                    issue.latitude = latitude;
                if (longitude)
                    issue.longitude = longitude;
                if(dateresolved)
                    issue.dateresolved = dateresolved;
                if(thumbnail)
                    issue.thumbnail = thumbnail;
                if(fullimage)
                    issue.fullimage = req.body.fullimage;

                issue.save((err) => {
                    if (err) {
                        res.status(500);
                        return res.send({
                            "status": 500,
                            "error": err
                        });
                    }
                    res.status(200);
                    return res.json(issue);
                });
            }
        })
    },
}

module.exports = issueRepo;