// set up ======================================================================
// get all the tools we need
var swaggerJSDoc  = require('swagger-jsdoc');
var express       = require('express');
var path          = require('path');
var app      = express();
var port     = process.env.PORT || 3000;
var mongoose = require('mongoose');
var flash    = require('connect-flash');
var cors = require('cors');

var morgan       = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser   = require('body-parser');
var session      = require('express-session');

var jwt = require('jwt-simple');

var configDB = require('./config/database.js');
var secret = require('./config/secret');

// cors
app.use(cors())

//config swagger ==============================================================
// swagger definition
var swaggerDefinition = {
  info: {
    title: 'De Zonnebloem API',
    version: '1.0.0',
    description: 'Zonnebloem API docs',
  },
  host: 'zb-api.herokuapp.com',
  basePath: '/',
};

// options for the swagger docs
var options = {
  // import swaggerDefinitions
  swaggerDefinition: swaggerDefinition,
  // path to the API docs
  apis: ['./routes/*.js', './models/*.js'],
};

// initialize swagger-jsdoc
var swaggerSpec = swaggerJSDoc(options);

// configuration ===============================================================
mongoose.connect(configDB.url); // connect to our database

// Models ======================================================================
require('./models/user');
require('./models/issue');
require('./models/routesWalked');
require('./models/region');
require('./models/report');

// set up our express application
app.use(morgan('dev')); // log every request to the console
app.use(cookieParser()); // read cookies (needed for auth)
app.use(bodyParser()); // get information from html forms
app.use(express.static(path.join(__dirname, 'public')));



app.set('view engine', 'ejs'); // set up ejs for templating

// required for passport
app.use(session({ secret: secret.secret })); // session secret
app.use(flash()); // use connect-flash for flash messages stored in session

// routes ======================================================================
//enable pre-flight ===========================================================[]
	app.options('*', cors()); // include before other routes

require('./routes/oauth')(app); // load our routes and pass in our app and fully configured passport
require('./routes/issues')(app); // load the routes to handle issue routes
require('./routes/reports')(app); // load the routes to handle reports
require('./routes/routesWalked')(app); // load the routes to handle routeswalked routes
require('./routes/regions')(app); // load the routes to handle region routes

app.get('/swagger.json', function(req, res) {
		res.setHeader('Content-Type', 'application/json');
		res.send(swaggerSpec);
	});

  
// launch ======================================================================
app.listen(port);
console.log('The magic happens on port ' + port);