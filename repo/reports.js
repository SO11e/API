var mongoose = require('mongoose');
var Report = mongoose.model('Report');
var User = mongoose.model('User');

var reportRepo = {
    create: function (req, res) {
        var report = new Report(req.body);
        console.log("---Report Create---")
        console.log(report);
        var token = req.header('bearer');

        if (token) {
            User.validToken(token, function (err, user) {
                if (!err) {
                    report.createdBy = user._id;
                    report.save((err) => {
                        if (err) {
                            console.log('ERROR');
                            //res.status(500);
                            return res.send({
                                "status": 500,
                                "error": err
                            })
                        }

                        return res.send(report);
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

        Report.find().limit(perPage).skip(page).exec(function (err, data) {
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

    readsingle: function (req, res) {
        Report.findOne({ '_id': req.params.id }, function (err, report) {
            if (!err) {
                return res.send(report);
            }
            else {
                return res.send(400);
            }
        });
    },

    delete: function (req, res) {
        Report.remove({ '_id': req.params.id }, function (err) {
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
        Report.findOne({ '_id': req.params.id }, function (err, issue) {
            if (!err) {

                var description = req.body.description;
                var status = req.body.status;
                var dateUpdated = req.body.dateUpdated;
                var issues = req.body.issues;

                if (streetName)
                    issue.streetName = streetName;
                if (houseNumber)
                    issue.houseNumber = houseNumber;
                if (postalCode)
                    issue.postalCode = postalCode;
                if (place)
                    issue.place = place;
                if (description)
                    issue.description = description;
                if (latitude)
                    issue.latitude = latitude;
                if (longitude)
                    issue.longitude = longitude;
                if(dateresolved)
                    issue.dateresolved = dateresolved;

                issue.save((err) => {
                    if (err) {
                        res.status(500);
                        return res.send({
                            "status": 500,
                            "error": err
                        });
                    }
                    res.status(201);
                    return res.json(issue);
                });
            }
        })
    },

}

module.exports = reportRepo;