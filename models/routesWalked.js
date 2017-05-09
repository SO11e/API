// load the things we need
var mongoose = require('mongoose');
var bcrypt   = require('bcrypt-nodejs');

console.log('Initializing routesWalked schema')

/**
	 * @swagger
	 * definitions:
	 *   routesWalked:
	 *     type: object
     *     required:
     *       - userId
     *       - regionId
     *       - waypoints
	 *     properties:
	 *       userId:
	 *         type: string
     *         format: ObjectId
	 *       regionId:
     *         type: string
     *         format: ObjectId
     *       waypoints:
     *         type: array
     *         items:
     *           $ref: '#/definitions/waypoints'
     * 
     *   waypoints:
     *     type: object
     *     required:
     *       - longitude
     *       - latitude
     *     properties:
     *       latitude:
     *         type: number
     *       longitude:
     *         type: number
	*/

// define the schema for our issue model
var routesWalkedSchema = mongoose.Schema({

    userId : { type: mongoose.Schema.Types.ObjectId, ref: "User", required:true }, 
    regionId : { type: mongoose.Schema.Types.ObjectId, ref: "Region", required:true },
    waypoints : [{
        latitude : {type: Number, required: true},
        longitude : {type: Number, required: true},
    }]
    

});

// create the model for users and expose it to our app
module.exports = mongoose.model('RoutesWalked', routesWalkedSchema);