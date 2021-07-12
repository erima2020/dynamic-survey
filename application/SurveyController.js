const Survey = require("./Survey");
const RequestIp = require("@supercharge/request-ip");
const uploadSurvey = async (req, res) => {
    try {
        req.body.ip = RequestIp.getClientIp(req);
        console.log(req.body.ip);
        const survey = new Survey(req.body);
        await survey.save();
        return res.status(200).send({
            data: req.body,
        });
    } catch (error) {
        return res.status(500).send({
            message: "something went wrong",
            stack: error.message,
        });
    }
};

const getSurvey = async (req, res) => {
    try {
        const surveys = await Survey.find({}).sort([["updatedAt", "-1"]]);
        return res.status(200).send({
            data: surveys,
        });
    } catch (error) {
        return res.status(500).send({
            message: "something went wrong",
            stack: error.message,
        });
    }
};

const getIpVaildation = async (req, res) => {
    try {
        const ip = RequestIp.getClientIp(req);
        const result = await Survey.find({ ip: ip }).lean();
        if (result.length > 0) {
            res.status(200).send({
                data: true,
            });
        } else {
            res.status(200).send({
                data: false,
            });
        }
    } catch (error) {
        return res.status(500).send({
            message: "something went wrong",
            stack: error.message,
        });
    }
};
module.exports = {
    getSurvey,
    uploadSurvey,
    getIpVaildation,
};
