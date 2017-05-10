var request = require('request');
var auth = require('../middleware/auth');
var reportRepo = require('../repo/reports');

module.exports = function(app) {
    app.all('/reports*', auth.isLoggedIn);

    /**
	 * @swagger
	 * /reports:
	 *   post:
	 *     tags:
	 *       - Reports
	 *     description: Creates new report
	 *     produces:
	 *       - application/json
	 *     parameters:
	 *       - name: report
	 *         description: Reports object
	 *         in: body
	 *         required: true
	 *         schema:
	 *           $ref: '#/definitions/report' 
 	 *       - name: bearer
 	 *         in: header
 	 *         description: Token to determine which user is logged in
 	 *         required: false
 	 *         type: string
 	 *         format: string
 	 *     responses:
 	 *       201:
 	 *         description: report created
 	 *         schema:
 	 *           $ref: '#/definitions/report'
 	 *       500:
 	 *         description: Internal server error report not created
	 */
    app.post('/reports', reportRepo.create);

    /**
	 * @swagger
	 * /reports:
	 *   get:
	 *     tags:
	 *       - Reports
	 *     description: Gets all the reports paginated
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
     *         description: reports returned
     *         schema:
     *           $ref: '#/definitions/report'
	 */
    app.get('/reports', reportRepo.getall);

/**
 * @swagger
 * /reports/:id:
 *   get:
 *     tags:
 *       - Reports
 *     description: Get one report by ID
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: ID
 *         in: path
 *         description: ID of report that needs to be fetched
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
 *         description: Report returned
 *         schema:
 *           $ref: '#/definitions/report'
 */
    app.get('/reports/:id', reportRepo.readsingle);

/**
 * @swagger
 * /reports/:id:
 *   delete:
 *     tags:
 *       - Reports
 *     description: Deletes an report
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: id
 *         description: Report id
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
 *         description: report deleted
 *       500:
 *         description: Internal server error report not deleted
*/ 
    app.delete('/reports/:id', reportRepo.delete);

/**
 * @swagger
 * /reports/:id:
 *   put:
 *     tags:
 *       - Reports
 *     description: Updates an report
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: id
 *         description: Report id
 *         in: path
 *         required: true
 *         type: integer
 *       - name: report
 *         description: Report object
 *         in: body
 *         required: true
 *         schema:
 *           $ref: '#/definitions/report' 
 *       - name: bearer
 *         in: header
 *         description: Token to determine which user is logged in
 *         required: false
 *         type: string
 *         format: string
 *     responses:
 *       200:
 *         description: Report updated
 *         schema:
 *           $ref: '#/definitions/report'
 *       500:
 *         description: Internal server error Report not updated
*/
    app.put('/reports/:id', reportRepo.update);
}