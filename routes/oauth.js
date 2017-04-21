var auth = require('../middleware/auth');
var jwt = require('jwt-simple');
var secret = require('../config/secret');
var userRepo = require('../repo/user');
var roles = require('../auth/connectroles')();

module.exports = function(app) {
// test routes ===============================================================
/**
 * @swagger
 * /testadminrole:
 *   get:
 *     tags:
 *       - Admin
 *       - Roles
 *     description: Checks if user is admin
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: bearer
 *         in: header
 *         description: Token to determine which user is logged in (not required if logged in with session)
 *         required: false
 *         type: string
 *         format: string
 *     responses:
 *       200: 
 *         description: confirmed user has admin role
 *       401:
 *         description: access denied, unauthorized
 *       500:
 *         description: Server error
 */
	app.get('/testadminrole', roles.can('access admin'), function(req, res){
		res.send(200, {'msg':'User has Admin role'});
	});

/**
 * @swagger
 * /isloggedin:
 *   get:
 *     tags:
 *       - User
 *       - Login
 *     description: Checks if user is logged in
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: bearer
 *         in: header
 *         description: Token to determine which user is logged in (not required if logged in with session)
 *         required: false
 *         type: string
 *         format: string
 *     responses:
 *       200: 
 *         description: confirmed user is logged in
 *       400:
 *         description: User error, Not logged in
 *       500:
 *         description: Server error     
 */
	app.get('/isloggedin', auth.isLoggedIn,  function(req, res){
		res.send("200", {"msg":"confirmed user is logged in"});
	});

// normal routes ===============================================================================
	/**
 * @swagger
 * /users/me:
 *   get:
 *     tags:
 *       - User
 *     description: Get the current user
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: bearer
 *         in: header
 *         description: Token to determine which user is logged in (not required if logged in with session)
 *         required: false
 *         type: string
 *         format: string
 *     responses:
 *       200: 
 *         description: User returned
 *         schema:
 *           $ref: '#/definitions/user'
 *       400:
 *         description: User error, Not logged in
 *       500:
 *         description: Server error
 */
	app.get('/users/me', auth.isLoggedIn, userRepo.currentUser);

// =============================================================================
// AUTHENTICATE ================================================================
// =============================================================================

	// locally --------------------------------
		// LOGIN ===============================
		/**
		 * @swagger
		 * /login:
		 *   post:
		 *     tags:
		 *       - Login
		 *     description: Logs in user
		 *     produces:
		 *       - application/json
		 *     parameters:
		 *       - name: email
		 *         description: Users email adress
		 *         in: body
		 *         required: true
		 *       - name: password
		 *         description: Users password
		 *         in: body
		 *         required: true
		 *     responses:
		 *       200:
		 *         description: Returns token 
		 *       400:
		 *         description: User failed logging in
		 *       500:
 		 *         description: Internal server error user not logged in
		 */		
		app.post('/login', userRepo.localLogin);

		// SIGNUP =================================
		/**
		 * @swagger
		 * /signup:
		 *   post:
		 *     tags:
		 *       - Signup
		 *     description: Signs up User
		 *     produces:
		 *       - application/json
		 *     parameters:
		 *       - name: user
		 *         description: User object
		 *         in: body
		 *         required: true
		 *         schema:
		 *           $ref: '#/definitions/user'
		 *     responses:
		 *       200:
		 *         description: Returns token 
		 *       400:
		 *         description: Email is taken
		 *       500:
 		 *         description: Internal server error user not created
		 */
		app.post('/signup', userRepo.localSignup);

};