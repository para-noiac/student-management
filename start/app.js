'use strict'
const express = require('express')
const app = express();
const router = require('./router')
// const routes = require('./routes')

const path = require('path')
const Knex = require('knex')
const config = require(path.join(appRoot, 'config/knex'))

const knex = Knex(config[process.env.NODE_ENV || 'development'])
const { Model } = require('objection')

Model.knex(knex)

app.run = function({ host, port }){
    app.use(express.json())
    app.use(express.urlencoded({ extended: true }))
    app.use('/', router)
    app.listen(port)
}

module.exports = app