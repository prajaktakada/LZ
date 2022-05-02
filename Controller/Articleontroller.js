const ArticleModel = require('../Model/ArticlesModel')
const WebsiteModel = require('../Model/WebsiteModel')

 //checking requestbody is empty or not
const isValidRequestBody = function (requestBody) {
    return Object.keys(requestBody).length > 0
}

const isValid = function (value) {
    if (typeof value === 'undefined' || value === null) return false
    if (typeof value === 'string' && value.trim().length === 0) return false
    return true;
}


const Article = async function (req, res) {
    try {
       
        const requestBody = req.body;
        if (!isValidRequestBody(requestBody)) {
            return res.status(400).send({ status: false, message: 'Invalid request parameters. Please provide intern details' })
        }
        if (!(Object.keys(req.body).length > 0)) { // Checking Body is not Empty
            res.status(400).send("No Url Found...!!")
        }

        var { Title,Description,Body_Text,WebId} = requestBody


        //validation starts
        if (!isValid(Title)) {
            return res.status(400).send({ status: false, message: 'Invalid request parameters. Please provide valid Title' })
        }

        if ((!isValid(WebId))&&(!isValidObjectId(WebId))) {
            return res.status(400).send({ status: false, message: 'Invalid request parameters. Please provide valid WebId' })
        }
        let findWebId = await WebsiteModel.findOne({_id:requestBody.WebId})

        if(!findWebId){
            return res.status(400).send({status:false,message:"findWebId not registerd"})
        }
        
        if (!isValid(Description)) {
            return res.status(400).send({ status: false, message: 'Invalid request parameters. Please provide valid Description' })
        }
        if (!isValid(Body_Text)) {
            return res.status(400).send({ status: false, message: 'Invalid request parameters. Please provide valid Body_Text' })
        }
        const ArticleData = {Title,Description,Body_Text,WebId}

        let savedArticle = await ArticleModel.create(ArticleData)
        res.status(201).send({ status: true, data: savedArticle })
    

    } catch (e) {
        res.status(500).send(e.message);
    }
}


const updateArticle = async function (req, res) {
    try {
        const requestbody= req.body
       
        if (!isValidRequestBody(requestbody)) {
            return res.status(400).send({ status: false, message: 'No paramateres passed.' })
        }
        
        let ArticleId = await ArticleModel.findOne({ _id: req.params.id });
        
        if (!ArticleId) {
            return res.status(404).send({ status: false, message: `Article not found` })
        }

        //extract params
        let {Title,Description,Body_Text} = requestbody;

        //validation starts
        if (!isValid(Title)) {
            return res.status(400).send({ status: false, message: 'Invalid request parameters. Please provide valid title' })
        }

        if (!isValid(Description)) {
            return res.status(400).send({ status: false, message: 'Invalid request parameters. Please provide valid Description' })
        }

        if (!isValid(Body_Text)) {
            return res.status(400).send({ status: false, message: 'Invalid request parameters. Please provide valid Body_Text' })
        }

        const UpdateData = {Title,Description,Body_Text}


        const upatedArticle= await ArticleModel.findOneAndUpdate({_id:ArticleId._id}, UpdateData, { new: true })
          res.status(200).send({ status: true, message: 'updated successfully', data: upatedArticle });

            
    } catch (err) {
        res.status(500).send({ status: false, message: err.message });
    }
};



module.exports = {Article,updateArticle}