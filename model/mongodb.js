var mongoose = require('mongoose');
var bcrypt = require('bcrypt-nodejs');

/*---new db schema----*/
var config_admin_schema = require('../schema/administrators.schema.js');
var config_user_schema = require('../schema/user.schema.js');
var config_message_schema = require('../schema/message.schema.js');
var config_calls_schema = require('../schema/calls.schema.js');
var config_rooms_schema = require('../schema/rooms.schema.js');
var config_groups_schema = require('../schema/group.schema.js');
var config_group_message_schema = require('../schema/group_message.schema.js');
var config_pages_schema = require('../schema/page.schema.js');
var config_email_template_schema = require('../schema/emailtemplate.schema.js');
var config_slider_schema = require('../schema/sliders.schema.js');
var config_images_schema = require('../schema/images.schema.js');
var config_settings_schema = require('../schema/setting.schema.js');
var config_faq_schema = require('../schema/faqs.schema.js');
var config_faqcategory_schema = require('../schema/faqcategories.schema.js');
var config_newsletter_schema = require('../schema/newsletter.schema.js');
var config_users_schema = require('../schema/users.schema.js');
var config_contact_schema = require('../schema/contact.schema.js');
var config_postheader_schema = require('../schema/postheaders.schema.js');
var config_status_schema = require('../schema/status.schema.js');


// define the schema for our user model
var adminSchema = mongoose.Schema(config_admin_schema.ADMIN, { timestamps: true, versionKey: false });
var userSchema = mongoose.Schema(config_user_schema.USER, { timestamps: true, versionKey: false });
var usersSchema = mongoose.Schema(config_users_schema.USER, { timestamps: true, versionKey: false });
var messageSchema = mongoose.Schema(config_message_schema.MESSAGE, { timestamps: true, versionKey: false });
var callsSchema = mongoose.Schema(config_calls_schema.CALLS, { timestamps: true, versionKey: false });
var roomsSchema = mongoose.Schema(config_rooms_schema.ROOM, { timestamps: true, versionKey: false });
var groupsSchema = mongoose.Schema(config_groups_schema.GROUP, { timestamps: true, versionKey: false });
var groupMessageSchema = mongoose.Schema(config_group_message_schema.MESSAGE, { timestamps: true, versionKey: false });
var pageschema = mongoose.Schema(config_pages_schema.PAGES, { timestamps: true, versionKey: false });
var emailtemplateSchema = mongoose.Schema(config_email_template_schema.template, { timestamps: true, versionKey: false });
var sliderSchema = mongoose.Schema(config_slider_schema.SLIDERS, { timestamps: true, versionKey: false });
var settingsSchema = mongoose.Schema(config_settings_schema.settings, { timestamps: true, versionKey: false });
var currencySchema = mongoose.Schema(config_settings_schema.currency, { timestamps: true, versionKey: false });
var languagesSchema = mongoose.Schema(config_settings_schema.languages, { timestamps: true, versionKey: false });
var newsletterSchema = mongoose.Schema(config_newsletter_schema.SUBSCRIBER, { timestamps: true, versionKey: false });
var imagesSchema = mongoose.Schema(config_images_schema.IMAGES, { timestamps: true, versionKey: false });
var faqSchema = mongoose.Schema(config_faq_schema.FAQ, { timestamps: true, versionKey: false });
var faqCategorySchema = mongoose.Schema(config_faqcategory_schema.CATEGORIES, { timestamps: true, versionKey: false });
var contactusSchema = mongoose.Schema(config_contact_schema.CONTACT, { timestamps: true, versionKey: false });
var postheaderSchema = mongoose.Schema(config_postheader_schema.POSTHEADER, { timestamps: true, versionKey: false });
var statusSchema = mongoose.Schema(config_status_schema.STATUS, { timestamps: true, versionKey: false });
// methods ======================
// generating a hash
userSchema.methods.generateHash = function (password) {
	return bcrypt.hashSync(password, bcrypt.genSaltSync(8), null);
};

// checking if password is valid
userSchema.methods.validPassword = function (password) {
	return bcrypt.compareSync(password, this.password);
};
usersSchema.methods.generateHash = function (password) {
	return bcrypt.hashSync(password, bcrypt.genSaltSync(8), null);
};

// checking if password is valid
usersSchema.methods.validPassword = function (password) {
	return bcrypt.compareSync(password, this.password);
};


adminSchema.methods.generateHash = function (password) {
	return bcrypt.hashSync(password, bcrypt.genSaltSync(8), null);
};

// checking if password is valid
adminSchema.methods.validPassword = function (password) {
	return bcrypt.compareSync(password, this.password);
};
// create the model for users and expose it to our app


var admins = mongoose.model('administrators', adminSchema, 'administrators');
var user = mongoose.model('user', userSchema, 'user');
var users = mongoose.model('users', usersSchema, 'users');
var message = mongoose.model('message', messageSchema, 'message');
var calls = mongoose.model('calls', callsSchema, 'calls');
var rooms = mongoose.model('rooms', roomsSchema, 'rooms');
var group = mongoose.model('group', groupsSchema, 'group');
var group_message = mongoose.model('group_message', groupMessageSchema, 'group_message');
var pages = mongoose.model('pages', pageschema, 'pages');
var settings = mongoose.model('settings', settingsSchema, 'settings');
var languages = mongoose.model('languages', languagesSchema, 'languages');
var currencies = mongoose.model('currencies', currencySchema, 'currencies');
var emailtemplate = mongoose.model('email_template', emailtemplateSchema, 'email_template');
var slider = mongoose.model('sliders', sliderSchema, 'sliders');
var newsletter = mongoose.model('newsletter_subscriber', newsletterSchema, 'newsletter_subscriber');
var images = mongoose.model('images', imagesSchema, 'images');
var faq = mongoose.model('faq', faqSchema, 'faq');
var faqcategory = mongoose.model('faq_categories', faqCategorySchema, 'faq_categories');
var contact = mongoose.model('contact', contactusSchema, 'contact');
var postheader = mongoose.model('postheader', postheaderSchema, 'postheader');
var status = mongoose.model('status', statusSchema, 'status');

usersSchema.index({ 'phone.code': { unique: true }, 'phone.number': { unique: true } })


var db = {
	'admins': admins,
	'user': user,
	'users': users,
	'message': message,
	'calls': calls,
	'rooms': rooms,
	'group': group,
	'group_message': group_message,
	'settings': settings,
	'languages': languages,
	'currencies': currencies,
	'newsletter': newsletter,
	'images': images,
	'pages': pages,
	'emailtemplate': emailtemplate,
	'slider': slider,
	'faq': faq,
	'faqcategory': faqcategory,
	'contact': contact,
	'postheader': postheader,
	'status': status
}
module.exports = db;




/* function (err, docs) {

} */




