var mongoose = require('mongoose');
var Issue = mongoose.model('Issue');

var issueRepo = {
    create: function (req, res) {
        var issue = new Issue(req.body);
        console.log("");
        issue.save((err) => {
            if (err) {
                console.log('ERROR');
                //res.status(500);
                return res.send({
                    "status": 500,
                    "error": err
                })
            }
        });
        //res.status(201);
        return res.json(issue);
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

        Issue.find().limit(perPage).skip(page).exec(function (err, data) {
            if (!err) {
                var json = [];
                data.forEach(function (item, key) {
                    //TODO: niet te strikt nemen!

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
        Issue.findOne({ '_id': req.params.id }, function (err, polish) {
            if (!err) {
                return res.send(polish);
            }
            else {
                return res.send(400);
            }
        });
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
}

module.exports = issueRepo;