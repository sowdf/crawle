let mongoose = require('mongoose');
let coldSchemas = require('../schemas/cold');

module.exports = mongoose.model('Cold',coldSchemas);