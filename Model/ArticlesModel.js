//required mongoose package to define the schema
const mongoose = require('mongoose')

const ArticleSchema = new mongoose.Schema({

    Title: {type: String,required: true},
    Description: {type: String,required: true},
    Body_Text: {type: String,required: true,unique: true},
    WebId: {type: mongoose.Schema.Types.ObjectId,ref: 'Website',required: true},
    createdAt: {type: Date,default: Date.now}
    
    })

module.exports = mongoose.model('Article', ArticleSchema)