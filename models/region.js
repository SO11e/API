// load the things we need
var mongoose = require('mongoose');
var bcrypt   = require('bcrypt-nodejs');

console.log('Initializing region schema')

/**
	 * @swagger
	 * definitions:
	 *   region:
	 *     type: object
     *     required:
     *       - name
     *       - adminUser
     *       - isActive
     *       - postalCodes
	 *     properties:
     *       name:
     *         type: string
     *       adminuser:
     *         type: string
     *         format: ObjectId
     *       isActive:
     *         type: boolean
     *       postalCodes:
     *         type: string
     *         format: array
	*/

// define the schema for our region model
var regionSchema = mongoose.Schema({
    name : {type: String, required: true},
    manager : { type: mongoose.Schema.Types.ObjectId, ref: "User", required:true },
    isActive : { type: Boolean, required: true, default: true },
    postalCodes : [{type: String, required:true}],
});

// create the model for users and expose it to our app
module.exports = mongoose.model('Region', regionSchema);