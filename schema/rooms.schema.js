var mongoose = require("mongoose");
var Schema = mongoose.Schema;
var ROOMS = {};
ROOMS.ROOM = {
	users:[{ type: Schema.ObjectId, ref: 'users' }],
	chat_type:String,
	incognito_timer_mode:String,
	incognito_timer:Number,
	incognito_user:{ type: Schema.ObjectId, ref: 'users' },
	incognitoId:String,
	blocked_users:[{
		_id:false,
		from:{ type: Schema.ObjectId, ref: 'users' },
		to:{ type: Schema.ObjectId, ref: 'users' },
		status:String,
		timestamp:Number,
		blocked_count:Number,
		report_spam_count:Number
	}],
	locked:[],
	status_muted:[],
	archived:[{ type: Schema.ObjectId, ref: 'users' }],
	marked:[{ type: Schema.ObjectId, ref: 'users' }],
	muted:[{ type: Schema.ObjectId, ref: 'users' }],
	mute_option:String,
	mute_timestamp:Number,
	security_code:String,
	is_pinned:[{ type: Schema.ObjectId, ref: 'users' }],
    sort_pinned:[{
        id:{type: Schema.ObjectId, ref: 'users' },
        pintime:Number
    }]
};

module.exports = ROOMS;