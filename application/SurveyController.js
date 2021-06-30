const Survey = require("./Survey");

const uploadSurvey = async (req, res) => {
  try {
    const survey = new Survey(req.body);
    await survey.save();
    return res.status(200).send({
        data: req.body
    })
  } catch (error) {
    return res.status(500).send({
        message: 'something went wrong',
        stack: error.message
    })
  }
};

const getSurvey = async (req, res) => {
    try {
        const surveys = await Survey.find({}).sort([['updatedAt', '-1']]);
        return res.status(200).send({
            data: surveys
        })
    } catch (error) {
        return res.status(500).send({
            message: 'something went wrong',
            stack: error.message
        })
    }
}
module.exports = {
    getSurvey,
    uploadSurvey,
}