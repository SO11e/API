var request = require('request');
var auth = require('../middleware/auth');
var routesWalkedRepo = require('../repo/routesWalked');

module.exports = function(app) {
    app.all('/routeswalked*', auth.isLoggedIn);

    /**
	 * @swagger
	 * /routeswalked:
	 *   post:
	 *     tags:
	 *       - Routes Walked
	 *     description: Creates new routesWalked
	 *     produces:
	 *       - application/json
	 *     parameters:
	 *       - name: issue
	 *         description: routesWalked object
	 *         in: body
	 *         required: true
	 *         schema:
	 *           $ref: '#/definitions/routesWalked' 
 	 *       - name: bearer
 	 *         in: header
 	 *         description: Token to determine which user is logged in
 	 *         required: false
 	 *         type: string
 	 *         format: string
 	 *     responses:
 	 *       201:
 	 *         description: routesWalked created
 	 *         schema:
 	 *           $ref: '#/definitions/routesWalked'
 	 *       500:
 	 *         description: Internal server error routesWalked not created
	 */
    app.post('/routeswalked', routesWalkedRepo.create);

    /**
	 * @swagger
	 * /routeswalked:
	 *   get:
	 *     tags:
	 *       - Routes Walked
	 *     description: Gets all the routesWalked paginated
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
     *         description: routesWalked returned
     *         schema:
     *           $ref: '#/definitions/routesWalked'
	 */
    app.get('/routeswalked', routesWalkedRepo.getall);

 /**
 * @swagger
 * /routesWalked/:regionid:
 *   get:
 *     tags:
 *       - Routes Walked
 *     description: Get all routesWalked by region ID
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: regionid
 *         in: path
 *         description: ID of routes in region that needs to be fetched
 *         required: true
 *         type: string
 *         format: ObjectId
 *       - name: bearer
 *         in: header
 *         description: Token to determine which user is logged in
 *         required: false
 *         type: string
 *         format: string
 *     responses:
 *       200: 
 *         description: routesWalked returned
 *         schema:
 *           $ref: '#/definitions/routesWalked'
 */
    app.get('/routeswalked/:regionid', routesWalkedRepo.getbyregion);
}