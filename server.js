'use strict'

require('dotenv').config()
var path = require('path');
global.appRoot = path.resolve(__dirname);

const server = require('./start/app');

server.run({ host: process.env.HOST, port: process.env.PORT })

module.exports = server