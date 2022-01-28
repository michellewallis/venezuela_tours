// MODULES
const express = require('express');
const tourRoutes = require('./routes/tourRoutes')


const app = express();

//ROUTES 
app.use('/api/v1/tours', tourRoutes)

module.exports = app;