// MODULES
const express = require('express');
const cors = require('cors');
const tourRoutes = require('./routes/tourRoutes')


const app = express();

// MIDDLEWARES
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

//ROUTES 
app.use('/api/v1/tours', tourRoutes);


module.exports = app;