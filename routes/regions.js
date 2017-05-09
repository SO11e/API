var request = require('request');
var auth = require('../middleware/auth');
var regionRepo = require('../repo/regions');

module.exports = function(app) {
    app.all('/regions*', auth.isLoggedIn);

    /**
	 * @swagger
	 * /regions:
	 *   post:
	 *     tags:
	 *       - Region
	 *     description: Creates new region
	 *     produces:
	 *       - application/json
	 *     parameters:
	 *       - name: issue
	 *         description: region object
	 *         in: body
	 *         required: true
	 *         schema:
	 *           $ref: '#/definitions/region' 
 	 *       - name: bearer
 	 *         in: header
 	 *         description: Token to determine which user is logged in
 	 *         required: false
 	 *         type: string
 	 *         format: string
 	 *     responses:
 	 *       201:
 	 *         description: region created
 	 *         schema:
 	 *           $ref: '#/definitions/region'
 	 *       500:
 	 *         description: Internal server error region not created
	 */
    app.post('/regions', regionRepo.create);

    /**
	 * @swagger
	 * /regions:
	 *   get:
	 *     tags:
	 *       - Region
	 *     description: Gets all the regions paginated
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
     *         description: region returned
     *         schema:
     *           $ref: '#/definitions/region'
	 */
    app.get('/regions', regionRepo.getall);

/**
 * @swagger
 * /regions/:id:
 *   put:
 *     tags:
 *       - Region
 *     description: Updates a region
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: id
 *         description: Region id
 *         in: path
 *         required: true
 *         type: integer
 *       - name: region
 *         description: Region object
 *         in: body
 *         required: true
 *         schema:
 *           $ref: '#/definitions/region' 
 *       - name: bearer
 *         in: header
 *         description: Token to determine which user is logged in
 *         required: false
 *         type: string
 *         format: string
 *     responses:
 *       200:
 *         description: Region updated
 *         schema:
 *           $ref: '#/definitions/region'
 *       500:
 *         description: Internal server error Region not updated
*/
    app.put('/regions/:id', regionRepo.update);
}