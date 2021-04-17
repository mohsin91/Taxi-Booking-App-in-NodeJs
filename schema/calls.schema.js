var mongoose = require("mongoose");
Schema = mongoose.Schema;
var CALLS_SCHEMA = {};
CALLS_SCHEMA.CALLS = {
	type:String,// status: 0-audio, 1-video
	from: { type: Schema.ObjectId, ref: 'users',required: true	},
	to:{ type: Schema.ObjectId, ref: 'users',required: true	},
	timestamp:Number,
	time_to_deliever:Number,
	time_to_seen:Number,
	filesize:Number,
	duration:String,
	roomid:String,
	id:Number,
	doc_id:String,
	status:String,// status: 1-new, 2-viewed, 3-deleted
	message_status:String,// message_status: 1-Sent, 2-Delivered, 3-Read
	call_status:String,// call_status: 0-calling, 1-arrived,2-missedcall, 3-answerd,4-received,5-rejected, 6-end
	removed:[{ type: Schema.ObjectId, ref: 'users' }],
	cleared:[{ type: Schema.ObjectId, ref: 'users' }],
	blocked:String,
	end_timestamp:Number,
};
module.exports = CALLS_SCHEMA;
