const express = require('express')

const planentsRouter = require('./planets/planets.router');
const launchesRouter = require('./launches/launches.router');

const api = express.Router()

api.use('/planets',planentsRouter);
api.use('/launches',launchesRouter);

module.exports = api;