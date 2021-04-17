var mongoose = require("mongoose");
Schema = mongoose.Schema;

var USERS_SCHEMA = {};
USERS_SCHEMA.USER = {
	msisdn: { type: String, lowercase: true, index: { unique: true }, trim: true },
	email: { type: String, lowercase: true, trim: true },
	recovery_email: { type: String, lowercase: true, trim: true },
	recovery_phone: String,
	verify_email: String,
	CountryCode: String,
	PushToken: String,
	PhNumber: String,
	Code: String,
	manufacturer: String,
	OS: String,
	Version: String,
	callToken: String,
	DeviceId: String,
	gcm_id: String,
	Device: String,
	ProfilePic: String,
	profile_changed_time: Number,
	old_thumbnail: String,
	Name: String,
	allContacts: [],
	favourite: [],
	socketId: String,
	loginDate: Date,
	loginCount: String,
	private_key: String,
	public_key: String,
	Status: String,
	isDelete: String,
	online_offline_status: Number,
	online_offline_time: Number,
	last_seen: Date,
	push_count: Number,
	message_counts: Object,
	mfavOfUsr: [{
		id: { type: Schema.ObjectId, ref: 'user' },
		status: Number
	}],
	webPushKey: Object,
	apiMobileKeys: Object,
	webLoginKeys: [],
	favourite_user: [],
	mobileLoginKeys: [],
	record_deleted: String,
	changeNumberDetails: [],
	deleteAccountReason: [],
	role: { type: String, default: 'user' },
	privacy: {
		last_seen: { type: String, default: 'everyone' },
		profile_photo: { type: String, default: 'everyone' },
		status: { type: String, default: 'everyone' }
	},
	status_privacy: {
		privacy: { type: String, default: 'my_contacts' },
		statusToID: [],
	},
	drive_settings: Object,
	notifications: {
		sounds: { type: Number, default: 1 },
		desktop_alert: { type: Number, default: 1 },
		show_previews: { type: Number, default: 1 },
		turn_off_option: String,
		turn_off_timestamp: Number,
		turn_off: { type: Number, default: 0 }
	},
	email_verification: {
		verified: { type: Number, default: 0 },
		encryption_text: String,
		timestamp: { type: Number, default: 0 },
		otp: Number
	},

	call_status: { type: Number, default: 0 }, // 0 -FREE ,1 -- CALL SEND , 2 -- DELIVERIY , 3 -- READ 
	celebrity: {
		name: String,
		profession: String,
		gender: String,
		biography: String,
		website: String,
		reason: String,
		country: String,
		dob: Date,
		following: [{ type: Schema.ObjectId, ref: 'user' }],
		timestamp: { type: Number, default: 0 },
		status: Number,// 0 - request to admin , 1 -- admin accept celebrity , 2 -- admin reject celebrity
	},
	status_count: { type: Number, default: 0 },
	balance: Number
};
module.exports = USERS_SCHEMA;
