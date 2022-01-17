const express = require('express')
const cors = require('cors')
const route = require('./route')
const dotenv = require('dotenv').config()
const fs = require('fs')

const app = express()

app.use(cors())

// parse requests of content-type - application/json
app.use(express.json());

// parse requests of content-type - application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true }));

app.use(express.static('./'))

app.use('/upload', express.static('upload'));
app.use('/images', express.static('images'));

// set port, listen for requests
const PORT = 3002;
app.listen(PORT, () => {
  console.log(`V Server is running on port ${PORT}.`);
});

// Routes
app.use(route)