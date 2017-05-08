var request = require('request');
var auth = require('../middleware/auth');
var issuesRepo = require('../repo/issues');

module.exports = function(app) {
    app.all('/issues*', auth.isLoggedIn);

//TODO: Swagger Fixen op deze pagina
    /**
	 * @swagger
	 * /issues:
	 *   get:
	 *     tags:
	 *       - Issues
	 *     description: Gets a list of all the Issues
	 *     produces:
	 *       - application/json
	 *     parameters:
	 *       - name: bearer
	 *         in: header
	 *         description: Token to determine which user is logged in
	 *         required: true
	 *         type: string
	 *         format: string
	 *     responses:
	 *       200: 
	 *         description: Succesfully got a list of Issues
	 *       500:
	 *         description: Server error
     *   post:
     *     tags:
     *       - Issues
     *     description: Post an issue
     *     produces:
     *       - application/json
     *     parameters:
     *       - name: bearer
     *         in: header
     *         description: Token to determine which user is logged in
     *         required: true
     *         type: string
     *         format: string
     *       - name: issue
     *         in: body
     *         required: true
     *         schema:
	 *           $ref: '#/definitions/issue'
     *     responses:
     *       200:
     *         description: Succesfully posted the issue
     *       500:
     *         description: Server error
     *     
	 */
    app.post('/issues', issuesRepo.create);
    app.get('/issues', issuesRepo.getall);

    /**
	 * @swagger
	 * /issues/:id:
	 *   get:
	 *     tags:
	 *       - Issues
	 *     description: Get a certain issue
	 *     produces:
	 *       - application/json
	 *     parameters:
	 *       - name: bearer
	 *         in: header
	 *         description: Token to determine which user is logged in
	 *         required: true
	 *         type: string
	 *         format: string
     *       - name: id
	 *         in: path
	 *         description: Issue id
	 *         required: true
	 *         type: string
	 *     responses:
	 *       200: 
	 *         description: Succesfully got an issues
	 *       500:
	 *         description: Server error
     *   put:
     *     tags:
     *       - Issues
     *     description: update an issue
     *     produces:
     *       - application/json
     *     parameters:
     *       - name: bearer
     *         in: header
     *         description: Token to determine which user is logged in
     *         required: true
     *         type: string
     *         format: string
     *       - name: issue
     *         in: body
     *         required: true
     *         schema:
	 *           $ref: '#/definitions/issue'
     *     responses:
     *       200:
     *         description: Succesfully updated the issue
     *       500:
     *         description: Server error
     *   delete:
	 *     tags:
	 *       - Issues
	 *     description: Delete a certain issue
	 *     produces:
	 *       - application/json
	 *     parameters:
	 *       - name: bearer
	 *         in: header
	 *         description: Token to determine which user is logged in
	 *         required: true
	 *         type: string
	 *         format: string
     *       - name: id
	 *         in: path
	 *         description: Issue id
	 *         required: true
	 *         type: string
	 *         format: string
	 *     responses:
	 *       200: 
	 *         description: Succesfully deleted an issues
	 *       500:
	 *         description: Server error
	 */
    app.get('/issues/:id', issuesRepo.readsingle);
    app.delete('/issues/:id', issuesRepo.delete);
    app.put('/issues/:id', issuesRepo.update);
}