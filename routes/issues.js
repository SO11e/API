var request = require('request');
var auth = require('../middleware/auth');
var issuesRepo = require('../repo/issues');

module.exports = function(app) {
    app.all('/issues*', auth.isLoggedIn);

    /**
	 * @swagger
	 * /issues:
	 *   post:
	 *     tags:
	 *       - Issues
	 *     description: Creates new issue
	 *     produces:
	 *       - application/json
	 *     parameters:
	 *       - name: issue
	 *         description: Issue object
	 *         in: body
	 *         required: true
	 *         schema:
	 *           $ref: '#/definitions/issue' 
 	 *       - name: bearer
 	 *         in: header
 	 *         description: Token to determine which user is logged in
 	 *         required: false
 	 *         type: string
 	 *         format: string
 	 *     responses:
 	 *       201:
 	 *         description: issue created
 	 *         schema:
 	 *           $ref: '#/definitions/issue'
 	 *       500:
 	 *         description: Internal server error issue not created
	 */
    app.post('/issues', issuesRepo.create);

    /**
	 * @swagger
	 * /issues:
	 *   get:
	 *     tags:
	 *       - Issues
	 *     description: Gets all the issues paginated
	 *     produces:
	 *       - application/json
	 *     parameters:
     *       - name: perPage
     *         in: query
     *         description: Integer that defines the amount of items per page (default = 10)
     *         required: false
     *         type: integer
     *         format: integer
     *         default: 10
     *       - name: page
     *         in: query
     *         description: Integer that defines the page that has to be displayed (default = 0)
     *         required: false
     *         type: integer
     *         format: integer
     *         default: 0
     *       - name: bearer
     *         in: header
     *         description: Token to determine which user is logged in
     *         required: false
     *         type: string
     *         format: string
     *     responses:
     *       200:
     *         description: issues returned
     *         schema:
     *           $ref: '#/definitions/issue'
	 */
    app.get('/issues', issuesRepo.getall);

 /**
 * @swagger
 * /issues/:id:
 *   get:
 *     tags:
 *       - Issues
 *     description: Get one issue by ID
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: ID
 *         in: path
 *         description: ID of issue that needs to be fetched
 *         required: true
 *         type: string
 *         format: string
 *       - name: bearer
 *         in: header
 *         description: Token to determine which user is logged in
 *         required: false
 *         type: string
 *         format: string
 *     responses:
 *       200: 
 *         description: Issue returned
 *         schema:
 *           $ref: '#/definitions/issue'
 */
    app.get('/issues/:id', issuesRepo.readsingle);

 /**
 * @swagger
 * /issues/region/:regionid:
 *   get:
 *     tags:
 *       - Issues
 *     description: Get all issues by region ID
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: regionid
 *         in: path
 *         description: ID of issues in region that needs to be fetched
 *         required: true
 *         type: string
 *         format: ObjectId
 *       - name: perPage
 *         in: query
 *         description: Integer that defines the amount of items per page (default = 10)
 *         required: false
 *         type: integer
 *         format: integer
 *         default: 10
 *       - name: page
 *         in: query
 *         description: Integer that defines the page that has to be displayed (default = 0)
 *         required: false
 *         type: integer
 *         format: integer
 *         default: 0
 *       - name: bearer
 *         in: header
 *         description: Token to determine which user is logged in
 *         required: false
 *         type: string
 *         format: string
 *     responses:
 *       200: 
 *         description: issues returned
 *         schema:
 *           $ref: '#/definitions/issue'
 */
    app.get('/issues/region/:regionid', issuesRepo.getbyregion);

 /**
 * @swagger
 * /issues/:id:
 *   delete:
 *     tags:
 *       - Issues
 *     description: Deletes an issue
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: id
 *         description: Issue id
 *         in: path
 *         required: true
 *         type: integer
 *       - name: bearer
 *         in: header
 *         description: Token to determine which user is logged in
 *         required: false
 *         type: string
 *         format: string
 *     responses:
 *       200:
 *         description: issue deleted
 *       500:
 *         description: Internal server error issue not deleted
*/
    app.delete('/issues/:id', issuesRepo.delete);

 /**
 * @swagger
 * /issues/:id:
 *   put:
 *     tags:
 *       - Issues
 *     description: Updates an issue
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: id
 *         description: Issue id
 *         in: path
 *         required: true
 *         type: integer
 *       - name: issue
 *         description: Issue object
 *         in: body
 *         required: true
 *         schema:
 *           $ref: '#/definitions/issue' 
 *       - name: bearer
 *         in: header
 *         description: Token to determine which user is logged in
 *         required: false
 *         type: string
 *         format: string
 *     responses:
 *       200:
 *         description: Issue updated
 *         schema:
 *           $ref: '#/definitions/issue'
 *       500:
 *         description: Internal server error Issue not updated
*/
    app.put('/issues/:id', issuesRepo.update);
}