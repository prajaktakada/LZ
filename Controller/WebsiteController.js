const AdminModel = require("../Model/AdminModel")
const WebsiteModel = require('../Model/WebsiteModel')

const isValid = function (value) {
    if (typeof value === 'undefined' || value === null) return false
    if (typeof value === 'string' && value.trim().length === 0) return false
    return true;
}

const isValidRequestBody = function (requestBody) {
    return Object.keys(requestBody).length > 0
}

let isValidObjectId = function (ObjectId) {
    return mongoose.Types.ObjectId.isValid(ObjectId)
}


const Website = async function (req, res) {
    try {
        const requestBody = req.body

        if (!isValidRequestBody(requestBody)) {
            return res.status(400).send({ status: false, message: 'Invalid request parameters. Please provide intern details' })
        }

        //extract params
        let { Webname, AdminId } = requestBody;

        //validation starts
        if (!isValid(Webname)) {
            return res.status(400).send({ status: false, message: 'Invalid request parameters. Please provide valid Webname' })
        }

        if ((!isValid(AdminId)) && (!isValidObjectId(AdminId))) {
            return res.status(400).send({ status: false, message: 'Invalid request parameters. Please provide valid id' })
        }

        let findAdminId = await AdminModel.findOne({ _id: requestBody.AdminId })

        if (!findAdminId) {
            return res.status(400).send({ status: false, message: "admin not registerd" })
        }

        const websiteData = { Webname, AdminId }

        let savedWeb = await WebsiteModel.create(websiteData)
        res.status(201).send({ status: true, data: savedWeb })
    }
    catch (err) {
        res.status(500).send({ status: false, message: err.message })
    }
}




const getAllWeb = async function (req, res) {
    try {
        const AdminId = req.params.AdminId

        let AdminDetail = await AdminModel.findOne({ _id: AdminId })

        let websiteData = await WebsiteModel.find({ AdminId: AdminDetail }).select({ _id: 1, AdminId: 1, Webname: 1 }).sort({ Webname: 1 })

        let data = {
            _id: AdminDetail._id,
            name: AdminDetail.name,
            email: AdminDetail.email,
            password: AdminDetail.password,
            websiteData: websiteData
        }

        res.status(200).send({ status: true, message: 'list of websit`s', data: data })

    } catch (err) {
        res.status(500).send({ status: false, message: err.message });
    }
}



const getWeb = async function (req, res) {
    try {
        let body = req.params.webId
        body.isDeleted = false;

        let foundweb = await WebsiteModel.findOne({ _id: req.params.webId });
        //console.log(foundweb)
        if (foundweb) {
            res.status(200).send({ status: true, data: foundweb });
        }
        else {
            res.status(404).send({ status: false, msg: "No documents found" });
        }
    }
    catch (err) {
        res.status(500).send({ msg: "Some error occured" });
    }
}




module.exports = { Website, getAllWeb, getWeb }

