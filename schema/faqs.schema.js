var mongoose = require("mongoose");
var Schema 	 = mongoose.Schema;

var FAQ_SCHEMA = {};

FAQ_SCHEMA.FAQ = {	
					category: { type: Schema.ObjectId, ref: 'faq_categories' },
					question:String,
					answer:String,
					status: { type:Number, default:1 }
                 };

module.exports = FAQ_SCHEMA;
