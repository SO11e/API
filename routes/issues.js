var request = require('request');
var auth = require('../middleware/auth');
var issuesRepo = require('../repo/issues');

module.exports = function(app) {
    app.all('/issues*', auth.isLoggedIn);

//TODO: Swagger Fixen op deze pagina
    app.post('/issues', issuesRepo.create);
    app.get('/issues', issuesRepo.getall);
    app.get('/issues/:id', issuesRepo.readsingle);
    app.delete('/issues/:id', issuesRepo.delete);
    app.put('/issues/:id', issuesRepo.update);
}