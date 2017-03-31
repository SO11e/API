// load the things we need
var mongoose = require('mongoose');
var bcrypt   = require('bcrypt-nodejs');

console.log('Initializing user schema')

/**
	 * @swagger
	 * definitions:
	 *   user:
	 *     type: object
	 *     required:
	 *       - email
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

    local            : {
        email        : String,
        password     : String,
    },

    region       : String,
    roles        : String,

});

// methods ======================
// generating a hash
userSchema.methods.generateHash = function(password) {
    return bcrypt.hashSync(password, bcrypt.genSaltSync(8), null);
};

// checking if password is valid
userSchema.methods.validPassword = function(password) {
    return bcrypt.compareSync(password, this.local.password);
};

// create the model for users and expose it to our app
module.exports = mongoose.model('User', userSchema);