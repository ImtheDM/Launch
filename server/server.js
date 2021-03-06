const http = require('http');
const mongoose = require('mongoose');
require('dotenv').config();

const app = require('./src/app');

const { mongoConnect } = require('./src/services/mongo')
const { loadPlanetsData } = require('./src/models/planets.model')
const { loadLaunchData } = require('./src/models/launches.model')


const PORT = process.env.PORT || 8000;

const server = http.createServer(app);

async function startServer(){
    await mongoConnect();
    await loadPlanetsData();
    await loadLaunchData();

    server.listen(PORT, ()=>{
        console.log(`listening on port ${PORT}...`);
    });
}

startServer();
