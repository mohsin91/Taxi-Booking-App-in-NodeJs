var CONTACT_SCHEMA={};
CONTACT_SCHEMA.CONTACT ={
	from:{type: Schema.ObjectId, ref: 'user' },
	email:String,
	subject:String,
	message:String,
	isDelete: { type: Number, default: 0 }	
};
module.exports = CONTACT_SCHEMA;
