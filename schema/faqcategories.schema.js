var mongoose = require("mongoose");
var Schema = mongoose.Schema;
var CATEGORIES_SCHEMA = {};
CATEGORIES_SCHEMA.CATEGORIES = {
    name: String,
    slug: String,
    position: Number,
    commision: Number,
    status: Number,
    skills:[],
    image: String,
    img_name:String,
    img_path:String,
    icon:String,
    icon_name:String,
    icon_path:String,
    seo: {
        title: String,
        keyword: String,
        description: String
    },
    parent: { type: Schema.ObjectId, ref: 'category' }
};

module.exports = CATEGORIES_SCHEMA;
