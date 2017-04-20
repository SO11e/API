// load the things we need
var mongoose = require('mongoose');
var bcrypt   = require('bcrypt-nodejs');

console.log('Initializing issue schema')

/**
	 * @swagger
	 * definitions:
	 *   issue:
	 *     type: object
     *     required:
     *       - description
     *       - dateCreated
     *       - latitude
     *       - longitude
	 *     properties:
	 *       streetName:
	 *         type: string
	 *       houseNumber:
     *         type: string
     *       postalCode:
     *         type: string
     *       place:
     *         type: string
     *       description:
     *         type: string
     *       dateCreated:
     *         type: string
     *         format: dateTime
     *       dateResolved:
     *         type: string
     *         format: dateTime
     *       latitude:
     *         type: number      
     *       longitude:
     *         type: Number
	*/

// define the schema for our issue model
var issueSchema = mongoose.Schema({

    streetName : String, 
    houseNumber : String, 
    postalCode : String, 
    place : String, 
    description : {type: String, required: true},
    dateCreated : {type: Date, required: true},
    dateResolved : Date, 
    latitude : {type: Number, required: true},
    longitude : {type: Number, required: true},

});

// create the model for users and expose it to our app
module.exports = mongoose.model('Issue', issueSchema);