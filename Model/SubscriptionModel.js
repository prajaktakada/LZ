const mongoose = require('mongoose')

const Subscriptionchema = new mongoose.Schema({

    email: {type: String,required: true,unique: true},
    WebId: {type: mongoose.Schema.Types.ObjectId,ref: 'Website',required: true,unique:true},
    createdAt: {type: Date,default: Date.now}
    })

module.exports = mongoose.model('Subscription', Subscriptionchema)