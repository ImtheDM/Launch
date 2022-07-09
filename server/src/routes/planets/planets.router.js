const express = require('express');

const { httpGetAllPlanets } = require('./planets.controller');

const planentsRouter = express.Router();

planentsRouter.get('/', httpGetAllPlanets);

module.exports = planentsRouter;