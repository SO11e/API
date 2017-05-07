var request = require('request');
var auth = require('../middleware/auth');
var issuesRepo = require('../repo/issues');

module.exports = function(app) {
    app.all('/issues*', auth.isLoggedIn);
    app.all('/issue*', auth.isLoggedIn);

//TODO: Swagger Fixen op deze pagina
    app.post('/issues', issuesRepo.create);
    app.get('/issues', issuesRepo.getall);
    app.get('/issue/:id', issuesRepo.readsingle);
    app.delete('/issue/:id', issuesRepo.delete);
    app.put('/issue/:id', issuesRepo.update);
}