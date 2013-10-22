var mongoose = require('mongoose')

var PhotoSchema = mongoose.Schema({
  url: String
});

module.exports = mongoose.model( 'Photo', PhotoSchema );

