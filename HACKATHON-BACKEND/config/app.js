require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const { buildCorsOptions } = require('./config/corsConfig');

const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

// CORS BEFORE ROUTES
app.use(cors(buildCorsOptions));
app.options('*', cors(buildCorsOptions));

// …your routes
module.exports = app;
