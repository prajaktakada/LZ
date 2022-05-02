const express = require('express');
const router = express.Router();

//controllers
const adminController = require("../Controller/adminController")
const websiteController = require('../Controller/WebsiteController')
const SubscriptionController = require('../Controller/SubscriptionController')
const ArticleController = require('../Controller/Articleontroller')

//Admin Api
router.post('/Admin', adminController.Admin)
router.post('/login', adminController.login)

const Middleware = require('../Middleware/Auth')

//website Api
router.post('/Website', websiteController.Website)
router.get('/getAllWeb/:AdminId', websiteController.getAllWeb)
router.get('/getWeb/:webId', websiteController.getWeb)

//ArticleApi
router.post('/Article', ArticleController.Article)
router.put('/updateArticle/:id', ArticleController.updateArticle)

//Subcription Api
 router.post('/subscribers' ,SubscriptionController.subscribers)
 router.get('/getAllSubscriber/:WebId',SubscriptionController.getAllSubscriber)
 router.get('/TosendEmailToAllSub/:WebId',SubscriptionController.TosendEmailToAllSub)

module.exports = router;


