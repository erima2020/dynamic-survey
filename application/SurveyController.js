const Survey = require("./Survey");
const RequestIp = require("@supercharge/request-ip");
require("dotenv").config();
const uploadSurvey = async (req, res) => {
  try {
    const ip = RequestIp.getClientIp(req);
    req.body.ip = ip;
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
    if (process.env.IP_VALIDATION !== "true") {
      res.status(200).send({
        data: false,
      });
    } else {
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
    }
  } catch (error) {
    return res.status(500).send({
      message: "something went wrong",
      stack: error.message,
    });
  }
};

const getNumber = (callback) => {
  var n = Math.floor(Math.random() * 1000000);
  return new Promise(function (resolve, reject) {
    Survey.findOne({ 'data.code': n }, function (err, result) {
      if (err) {
        reject(err);
      } else if (result) return getNumber(callback);
      else {
        resolve(n);
      }
    });
  });
}

const getRandomUniqueId = async (req, res) => {
    const uniqueNumber = await getNumber();
    res.status(200).send({
        data: uniqueNumber,
    });
};

module.exports = {
  getSurvey,
  uploadSurvey,
  getIpVaildation,
  getRandomUniqueId,
};
