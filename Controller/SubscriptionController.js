const SubcriptionModel = require("../Model/SubscriptionModel")
const WebModel = require('../Model/WebsiteModel')
const ArticleModel = require('../Model/ArticlesModel')
const nodemailer = require('nodemailer');

// //checking requestbody is empty or not
const isValidRequestBody = function (requestBody) {
    return Object.keys(requestBody).length > 0
}
const isValid = function (value) {
    if (typeof value === 'undefined' || value === null) return false
    if (typeof value === 'string' && value.trim().length === 0) return false
    return true;
}

const subscribers = async function (req, res) {
    try {

        const requestBody = req.body;
        if (!isValidRequestBody(requestBody)) {
            return res.status(400).send({ status: false, message: 'Invalid request parameters. Please provide correct detail' })
        }

        var { email, WebId } = requestBody

        if (!isValid(email)) {
            if (!(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email))) {
                return res.status(400).send({ status: false, message: 'Invalid request parameters. Please provide email' })
            }
        }

        if (!isValid(WebId)) {
            return res.status(400).send({ status: false, message: 'Invalid request parameters. Please provide WebId' })
        }
        let findWebId = await ArticleModel.findOne({ WebId: requestBody.WebId })
        
        if (!findWebId) {
            return res.status(400).send({ status: false, message: "findWebId not registerd" })
        }

        const transporter = nodemailer.createTransport({
            host: 'smtp.ethereal.email',
            port: 587,
            auth: {
                user: 'leopoldo.beahan10@ethereal.email',
                pass: 'HRpub3hQtMXP5w5v9t'
            }
        });

        let mailOptions = {
            from: 'prajaktakadam0106@gmail',
            to: req.body.email,
            Title : findWebId.Title,
            Description : findWebId.Description
        };
//console.log(mailOptions.Title)
        transporter.sendMail(mailOptions, function (err, data) {
            if (err) {
                console.log(err)
            } else {
                console.log('email send', data)
            }
        })


        const storedData = { email, WebId }
        let savedData = await SubcriptionModel.create(storedData)
        Title = findWebId.Title
        Description = findWebId.Description
        res.status(200).send({ status: true, data: savedData, Title, Description })


    } catch (e) {
        res.status(500).send(e.message);
    }
}




const getAllSubscriber = async function (req, res) {
    try {
        const WebId = req.params.WebId

        let webDetail = await WebModel.findOne({ _id: WebId, isDeleted: false })

        let SubData = await SubcriptionModel.find({ WebId: webDetail }).select({ _id: 1, email: 1 })

        let data = {
            _id: webDetail._id,
            AdminId: webDetail.AdminId,
            Webname: webDetail.Webname,
            SubData: SubData
        }

        res.status(200).send({ status: true, message: 'list of websit`s', data: data })

    } catch (err) {
        res.status(500).send({ status: false, message: err.message });
    }
}


const TosendEmailToAllSub = async function (req, res) {
    try {
        const WebId = req.params.WebId
        let webDetail = await ArticleModel.findOne({ WebId: WebId})
        // console.log(webDetail)

        if (!webDetail) {
            return res.status(400).send({ status: false, message: "webDetail not registerd" })
        }

        let SubData = await SubcriptionModel.find({ WebId:req.params.WebId }).select({ _id: 1, email: 1 })
        //  console.log(SubData)
       
        const transporter = nodemailer.createTransport({
            host: 'smtp.ethereal.email',
            port: 587,
            auth: {
                user: 'leopoldo.beahan10@ethereal.email',
                pass: 'HRpub3hQtMXP5w5v9t'
            }
        });

         for(let i of SubData){
            // console.log(i.email)
        let mailOptions = {
            from: 'prajaktakadam0106@gmail',
             to: i.email,
            Title : webDetail.Title,
            Description : webDetail.Description
        };
        console.log(mailOptions.Title)
        console.log(mailOptions.to)

        transporter.sendMail(mailOptions, function (err, data) {
            if (err) {
                console.log(err)
            } else {
                console.log('email send', data)
            }
        })
     }

     res.status(200).send({ status: true, message: 'send successfully'});
  
    } catch (err) {
        res.status(500).send({ status: false, message: err.message });
    }
}
        


module.exports = { subscribers, getAllSubscriber,TosendEmailToAllSub}

