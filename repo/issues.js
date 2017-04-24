var mongoose = require('mongoose');
var Issue = mongoose.model('Issue');

var issueRepo = {
    create: function(req, res) {
        var issue = new Issue(req.body);
        console.log(req.body);
        console.log(issue);
        issue.save((err) => {
            if(err) {
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
}

module.exports = issueRepo;