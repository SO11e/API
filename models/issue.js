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
     *       - region
     *       - status
	 *     properties:
	 *       streetName:
	 *         type: string
	 *       houseNumber:
     *         type: string
     *       zipCode:
     *         type: string
     *       city:
     *         type: string
     *       region:
     *         type: string
     *       status:
     *         type: string
     *       description:
     *         type: string
     *       dateCreated:
     *         type: string
     *         format: date
     *       dateResolved:
     *         type: string
     *         format: date
     *       latitude:
     *         type: number      
     *       longitude:
     *         type: number
     *       thumbnail:
     *         type: string
     *       fullimage:
     *         type: string
	*/

// define the schema for our issue model
var issueSchema = mongoose.Schema({

    streetName : String, 
    houseNumber : String, 
    zipCode : String, 
    city : String, 
    region : { type: mongoose.Schema.Types.ObjectId, ref: "Region", required:true },
    status :  { type: String, enum: ['open', 'accepted', 'refused', 'closed'], required:true, default: 'open' },
    description : {type: String, required: true},
    dateCreated : {type: Date, required: true, default: new Date()},
    dateResolved : Date, 
    latitude : {type: Number, required: true},
    longitude : {type: Number, required: true},
    thumbnail : {type: String},
    fullimage : {type: String},

});

// create the model for users and expose it to our app
module.exports = mongoose.model('Issue', issueSchema);