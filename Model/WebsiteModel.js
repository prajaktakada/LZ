//required mongoose package to define the schema
const mongoose = require('mongoose')
//defined schema for user document
const WebsiteSchema = new mongoose.Schema({
    Webname: {type: String,required: true,unique:true},
    AdminId: {type: mongoose.Schema.Types.ObjectId,ref: 'admin',required: true},
    createdAt: {type: Date,default: Date.now},
    isDeleted: {type: Boolean,default: false}
    })


module.exports = mongoose.model('Website', WebsiteSchema)