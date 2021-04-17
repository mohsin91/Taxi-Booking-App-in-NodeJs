var mongoose = require("mongoose");
var Schema = mongoose.Schema;
var GROUPS = {};
GROUPS.GROUP = {
	name:String,
	description:String,
	users:[{
	_id:false,
	id:{type: Schema.ObjectId, ref: 'user' },
	active:Number,
	isDeleted:Number,// 0 active,1 deleted
	is_exited:{type: Number, default: 0},// 0 active,1 exited
	archived:{type: Number, default: 0},
	locked:{type: Number, default: 0},
	password:String,
	mobile_password:String,
	muted:{type: Number, default: 0},
	marked:{type: Number, default: 0},
	is_pinned:{type: Number, default: 0},
	mute_option:String,
	mute_timestamp:Number,
	get_profile_icon:Number,
	getName:Number,
	getAdmin:Number,
	getDescription:Number,
	addAgain:Number}],
	edit_group_info:{type: String, default: 'all_participants'},
	send_group_messages:{type: String, default: 'all_participants'},
	avatar:String,
	group_type:String,
	admin:[{type: Schema.ObjectId, ref: 'user' }],
	invite_link:String,
	timeStamp:Number,
	createdBy:{type: Schema.ObjectId, ref: 'user'},
	change_icon_time:Number,
	change_icon_by:{type: Schema.ObjectId, ref: 'user' },
	change_name_time:Number,
	change_description_time:Number,
	change_name_by:{type: Schema.ObjectId, ref: 'user' },
	change_description_by:{type: Schema.ObjectId, ref: 'user' },
	deleted_users:[{
	_id:false,
	id:{type: Schema.ObjectId, ref: 'user' },
	timeStamp:Number,
	from:{type: Schema.ObjectId, ref: 'user' }}],
	new_users:[{
	_id:false,
	id:{type: Schema.ObjectId, ref: 'user' },
	timeStamp:Number,
	from:{type: Schema.ObjectId, ref: 'user' }}]
};

module.exports = GROUPS;