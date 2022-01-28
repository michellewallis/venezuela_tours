//MODULE
const mongoose = require('mongoose')
const dotenv = require('dotenv');
dotenv.config({ path: './.env' });

const app = require('./app')

// SERVER
const port = process.env.PORT || 5000;
app.listen(port, () => {
    console.log(`Example app listening at port ${port}`)
})