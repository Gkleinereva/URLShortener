var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var URLMapSchema = new Schema({
	key: {type: Number, required: true},
	url: {type: String, required: true},
});

module.exports = mongoose.model('URLMap', URLMapSchema);