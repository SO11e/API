// load the things we need
var mongoose = require('mongoose');
var bcrypt   = require('bcrypt-nodejs');

console.log('Initializing report schema')

/**
	 * @swagger
	 * definitions:
	 *   report:
	 *     type: object
     *     required:
     *       - description
     *       - dateCreated
     *       - latitude
     *       - longitude
	 *     properties:
     *       description:
     *         type: string
     *       status:
     *         type: string
     *         enum: &STATUS [created, send, closed]
     *       dateCreated:
     *         type: string
     *         format: date
     *       dateUpdated:
     *         type: string
     *         format: date
     *       createdBy:
     *         type: string
     *         format: ObjectId
     *       issues:
     *         type: array
     *         items:
     *           type: string
     *           format: ObjectId
	*/

// define the schema for our issue model
var reportSchema = mongoose.Schema({

    description : {type: String, required: true},
    status : { type: String, enum: ['created', 'send', 'closed'], required:true },
    dateCreated : {type: Date, required: true},
    dateUpdated : {type: Date},
    createdBy : {type: mongoose.Schema.Types.ObjectId, ref: "User", required: true},
    issues : [ { type: mongoose.Schema.Types.ObjectId, ref: "Issue", required: true } ],

});

// create the model for users and expose it to our app
module.exports = mongoose.model('Report', reportSchema);