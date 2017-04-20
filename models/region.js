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
     *       - latitude
     *       - longitude
	 *     properties:
     *       name:
     *         type: string
     *       latitude:
     *         type: number      
     *       longitude:
     *         type: number
	*/

// define the schema for our region model
var regionSchema = mongoose.Schema({
    name : {type: String, required: true},
    latitude : {type: Number, required: true},
    longitude : {type: Number, required: true},

});

// create the model for users and expose it to our app
module.exports = mongoose.model('Region', regionSchema);