var request = require('request');
var auth = require('../middleware/auth');
var reportRepo = require('../repo/reports');

module.exports = function(app) {
    app.all('/reports*', auth.isLoggedIn);

//TODO: Swagger Fixen op deze pagina
    app.post('/reports', reportRepo.create);
    app.get('/reports', reportRepo.getall);
    app.get('/reports/:id', reportRepo.readsingle);
    app.delete('/reports/:id', reportRepo.delete);
    app.put('/reports/:id', reportRepo.update);
}