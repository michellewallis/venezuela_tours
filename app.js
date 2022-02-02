// MODULES
const express = require('express');
const cors = require('cors');
const tourRoutes = require('./routes/tourRoutes');
const userRoutes = require('./routes/userRoutes');


const app = express();

// MIDDLEWARES
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

//ROUTES 
//tour route
app.use('/api/v1/tours', tourRoutes);
// user route
app.use('/api/v1/users', userRoutes);




module.exports = app;