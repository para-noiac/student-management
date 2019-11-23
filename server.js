'use strict'

require('dotenv').config()
var path = require('path');
global.appRoot = path.resolve(__dirname);

const app = require('./start/app');

app.run({ host: process.env.HOST, port: process.env.PORT })
