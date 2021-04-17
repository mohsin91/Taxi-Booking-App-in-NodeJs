var mongoose = require("mongoose");
Schema = mongoose.Schema;
var MESSAGE_STATUS = {};
MESSAGE_STATUS.STATUS = {
	type:String,
	from: { type: Schema.ObjectId, ref: 'users',required: true	},
	toContact:[],
	to:[{
		id:{ type: Schema.ObjectId, ref: 'users',required: true},
		convId:{ type: Schema.ObjectId, ref: 'rooms',required: true},
		star:{	type: Number, default: 0},
		event_changes:{	type: Number, default: 0},
		blocked:{	type: Number, default: 0},
		removed:{	type: Number, default: 0},
		cleared:{	type: Number, default: 0},
		muted:{	type: Number, default: 0},
		status:String, // 0 - didnt get the message, 1 -  got the message , 2 - seen the message
		time_to_deliever:Number,
		time_to_seen:Number}],
	timestamp:Number,
	payload:String,
	filesize:Number,
	thumbnail:String,
	original_filename:String,
	numPages:Number,
	thumbnail_data:String,
	duration:String,
	id:Number,
	doc_id:String,
	width:Number,
	height:Number,
	audio_type:String,
	status:String,// status: 1-new, 2-viewed, 3-deleted
	message_status:String,// message_status: 1-Sent, 2-Delivered, 3-Read 
	star:[{ type: Schema.ObjectId, ref: 'users' }],
	removed:[{ type: Schema.ObjectId, ref: 'users' }],
	cleared:[{ type: Schema.ObjectId, ref: 'users' }],
	blocked:String,
	theme_color:String,
	theme_font:String
};
module.exports = MESSAGE_STATUS;
