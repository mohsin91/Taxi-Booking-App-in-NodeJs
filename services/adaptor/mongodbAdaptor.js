var db = require('../../model/mongodb');
var mongoose = require('mongoose');

function GetDocument(model, query, projection, extension, callback) {
    var query = db[model].find(query, projection, extension.options);
    if (extension.populate) {
        query.populate(extension.populate);
    }
    if (extension.sort) {
        query.sort(extension.sort);
    }
	if(extension.limit){
       query.limit(extension.limit);
    }
	if(extension.skip){
       query.skip(extension.skip);
    }
    query.exec(function (err, docs) {
        if (extension.count) {
            query.count(function (err, docs) {
                callback(err, docs);
            });
        } else {
            callback(err, docs);
        }
    });
}
function GetOneDocument(model, query, projection, extension, callback) {
/*    console.log('GetOneDocument model :',model);
    console.log('GetOneDocument query :',query);
    console.log('GetOneDocument projection :',projection);
    console.log('GetOneDocument extension :',extension);*/
    var query = db[model].findOne(query, projection, extension.options);
    if (extension.populate) {
        query.populate(extension.populate);
    }
	if (extension.sort) {
        query.sort(extension.sort);
    }
    query.exec(function (err, docs) {
        callback(err, docs);
//        console.log('GetOneDocument docs :',docs);
    });
}

function GetAggregation(model, query, callback) {
    db[model].aggregate(query).exec(function (err, docs) {
        callback(err, docs);
    });
}

function InsertDocument(model, docs, callback) {
    console.log('InsertDocument model :',model);
    console.log('InsertDocument docs :',docs);
    var doc_obj = new db[model](docs);
    doc_obj.save(function (err, numAffected) {
        callback(err, numAffected);
    })
}

function DeleteDocument(model, criteria, callback) {
    db[model].deleteOne(criteria, function (err, docs) {
        callback(err, docs);
    });
}

function UpdateDocument(model, criteria, doc, options, callback) {
    db[model].update(criteria, doc, options, function (err, docs) {
        callback(err, docs);
    });
}

function GetCount(model, conditions, callback) {
    db[model].count(conditions, function (err, count) {
        callback(err, count);
    });
}


function PopulateDocument(model, docs, options, callback) {
    db[model].populate(docs, options, function (err, docs) {
        callback(err, docs);
    });
}

function RemoveDocument(model, criteria, callback) {
    db[model].remove(criteria, function (err, docs) {
        callback(err, docs);
    });
}
/* function CreateDynamic(model,callback) {
    var config_celebrity_message_schema = require('../../schema/celebritymessage.schema.js');
	var CELEBRITY_MESSAGE = config_celebrity_message_schema.CELEBRITY_MESSAGE;
	CELEBRITY_MESSAGE.recordId = { type: Schema.ObjectId};
	var celebrityCollectionsSchema = mongoose.Schema(CELEBRITY_MESSAGE, { timestamps: true, versionKey: false });
	var celebrityCollections = mongoose.model(model, celebrityCollectionsSchema, model);
	db[model] = celebrityCollections;
	callback(null,{model:model})
}
function CreateLikedUserDynamic(model,callback) {
    var config_celebrity_liked_users_schema = require('../../schema/celebritylikedusers.schema.js');
	var CELEBRITY_LIKED_USER = config_celebrity_liked_users_schema.CELEBRITY_LIKED_USER;
	CELEBRITY_LIKED_USER.recordId = { type: Schema.ObjectId};
	var celebrityLikedUserSchema = mongoose.Schema(CELEBRITY_LIKED_USER, { timestamps: true, versionKey: false });
	var celebrityCollectionsLikes = mongoose.model(model + 'likedusers', celebrityLikedUserSchema, model + 'likedusers');
	db[model + 'likedusers'] = celebrityCollectionsLikes;
	callback(null,{model:model + 'likedusers'})
}
if(typeof global.dynamiccollections != 'undefined' && typeof global.dynamiccollections.collections_name != 'undefined' && global.dynamiccollections.collections_name.length > 0){
	for(var i=0;i<global.dynamiccollections.collections_name.length;i++){
		var model = global.dynamiccollections.collections_name[i];
		var config_celebrity_message_schema = require('../../schema/celebritymessage.schema.js');
		var CELEBRITY_MESSAGE = config_celebrity_message_schema.CELEBRITY_MESSAGE;
		CELEBRITY_MESSAGE.recordId = { type: Schema.ObjectId};
		var celebrityCollectionsSchema = mongoose.Schema(CELEBRITY_MESSAGE, { timestamps: true, versionKey: false });
		var celebrityCollections = mongoose.model(model, celebrityCollectionsSchema, model);
		db[model] = celebrityCollections;
		var config_celebrity_liked_users_schema = require('../../schema/celebritylikedusers.schema.js');
		var CELEBRITY_LIKED_USER = config_celebrity_liked_users_schema.CELEBRITY_LIKED_USER;
		CELEBRITY_LIKED_USER.recordId = { type: Schema.ObjectId};
		var celebrityLikedUserSchema = mongoose.Schema(CELEBRITY_LIKED_USER, { timestamps: true, versionKey: false });
		var celebrityCollectionsLikes = mongoose.model(model + 'likedusers', celebrityLikedUserSchema, model + 'likedusers');
		db[model + 'likedusers'] = celebrityCollectionsLikes;
	}
} */
module.exports = {
	"GetDocument": GetDocument,
	"GetOneDocument": GetOneDocument,
	"InsertDocument": InsertDocument,
	"DeleteDocument": DeleteDocument,
	"UpdateDocument": UpdateDocument,
	"GetAggregation": GetAggregation,
	"PopulateDocument": PopulateDocument,
	"RemoveDocument": RemoveDocument,
	"GetCount": GetCount
};
