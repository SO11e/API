var ConnectRoles = require('connect-roles');
var userRepo = require('../repo/user');
var jwt = require('jwt-simple');

module.exports = function(){
	var roles = new ConnectRoles({
  		failureHandler: function (req, res, action) {
      		res.status(401)
  			res.json({msg:'access-denied',action:action})
	  	}
	});

	// Access Admin pages can only be done by Admin
	roles.use('access admin', function(req){
		if(userRepo.getUser(req).roles === 'admin'){
			return true;
		};
	})


	return roles;
};