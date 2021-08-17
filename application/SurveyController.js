const Survey = require("./Survey");
require("dotenv").config();
const Ziggeo = require ('ziggeo')
var ZiggeoSdk = new Ziggeo(process.env.ZIGGEO_APP_TOKEN, process.env.PRIVATE_KEY);


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

const getVideoData = async (req, res) => {
    try {
        let tokens = ''
        let data = []
        const surveys = await Survey.find({}).sort([["updatedAt", "-1"]]).lean();
        if (surveys.length>0) {
            surveys.map((item)=> {
                Object.keys(item.data).map((value)=> {
                    if(typeof item.data[value] === 'object') {
                        if(item.data[value].video_token) {
                            tokens += item.data[value].video_token + ','
                        }
                    }
                })
            })
            if (tokens.length>0) {
                ZiggeoSdk.Videos.get_bulk({tokens_or_keys: tokens}, {
                    success: function (videos) {
                        return res.status(200).send({
                            data: videos,
                        });
                    },
                    failure: function (error) {
                        return res.status(500).send({
                            message: "something went wrong",
                            stack: error.message,
                        });
                    }
                });
            }
        } else {
            // return res.status(400).send({
            //     data: '',
            // });
        }
        // return res.status(200).send({
        //     data: tokens,
        // });
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
    getVideoData
}
