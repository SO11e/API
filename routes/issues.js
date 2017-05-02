var request = require('request');
var auth = require('../middleware/auth');
var issuesRepo = require('../repo/issues');

module.exports = function(app) {
    //app.all('/issues*', auth.isLoggedIn);
    //app.all('/issue*', auth.isLoggedIn);

//TODO: Swagger Fixen op deze pagina
/**
 * @swagger
 * /issues:
 *   post:
 *     tags:
 *       - Issue
 *     description: Gets a list of all the issues (with pagination)
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: bearer
 *         in: header
 *         description: Token to determine which user is logged in (not required if logged in with session)
 *         required: false
 *         type: string
 *         format: string
 *       - name: nailpolish
 *         description: Nailpolish object
 *         in: body
 *         required: true
 *         schema:
 *           $ref: '#/definitions/issue'
 *     responses:
 *       200: 
 *         description: Issue added successfully
 *       500:
 *         description: Server error
 */

    app.post('/issues', issuesRepo.create);
    app.get('/issues', issuesRepo.getall);
    app.get('/issue/:id', issuesRepo.readsingle);
    app.delete('/issue/:id', issuesRepo.delete);
}