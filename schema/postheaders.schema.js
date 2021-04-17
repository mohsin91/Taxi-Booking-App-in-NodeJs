var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var POSTHEADER_SCHEMA = {};

POSTHEADER_SCHEMA.POSTHEADER = {
	title: String,
	name:String,
	term:String,
	alignment:String,
	image: String,
	img_name: String,
	img_path: String,
	description: String,
	type: String,
	status: { type: Number, default: 1 }
};

module.exports = POSTHEADER_SCHEMA;
