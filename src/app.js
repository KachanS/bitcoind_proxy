'use strict';
require('dotenv').config();
const   express = require('express'),
        app = express(),
        port = process.env.APP_PORT || 3010,
        bodyParser = require('body-parser');

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());


var routes = require('./routes/routes');
routes(app);
//app.use('/static', express.static(__dirname + '/public'));
app.listen(port);