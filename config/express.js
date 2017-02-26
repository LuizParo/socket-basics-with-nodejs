'use strict'

let express = require('express');

let app = express();

app.use(express.static(`${__dirname}/../app/assets`));

module.exports = app;