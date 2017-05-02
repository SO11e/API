// load the things we need
var mongoose = require('mongoose');
var bcrypt = require('bcrypt-nodejs');
var jwt = require('jwt-simple');
var secret = require('../config/secret');

console.log('Initializing user schema')

/**
	 * @swagger
	 * definitions:
	 *   user:
	 *     type: object
	 *     required:
	 *       - email
	 *       - password
	 *       - roles
	 *     properties:
	 *       email:
	 *         type: string
	 *       password:
	 *         type: string
     *       region:
     *         type: string
     *       roles:
     *         type: string
	 * 
	*/

// define the schema for our user model
var userSchema = mongoose.Schema({

	email: { type: String, required: true },
	password: { type: String, required: true },

	//TODO: na pullrequestmerge aanpassen!
	//region       : { type: mongoose.Schema.Types.ObjectId, ref: "Region", required:true },
	region: String,
	roles: { type: String, required: true, default: 'user' },

});

// methods ======================
// generating a hash
userSchema.methods.generateHash = function (password) {
	return bcrypt.hashSync(password, bcrypt.genSaltSync(8), null);
};

// checking if password is valid
userSchema.methods.validPassword = function (password) {
	return bcrypt.compareSync(password, this.password);
};

// encode user
userSchema.methods.encode = function (user) {
	var tokenUser = {
		_id: user._id,
		email: user.email,
		password: user.password
	}

	return jwt.encode(tokenUser, secret.secret);
}

// check if token is valid
userSchema.statics.validToken = function (token, callback) {
	if (token) {
		try {
			var decoded = jwt.decode(token, secret.secret);
			console.log(decoded);

			this.findOne({ '_id': decoded._id }, function (err, user) {
				console.log(user);
				if (!err) {
					if (user.email == decoded.email && user.password == decoded.password) {
						callback(null, user);
					}
					else {
						callback(400);
					}
				}
				else {
					callback(err);
				}
			})

		} catch (err) {
			return callback(err);
		}
	} else {
		callback(400);
	}

}

// create the model for users and expose it to our app
module.exports = mongoose.model('User', userSchema);