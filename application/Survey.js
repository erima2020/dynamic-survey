const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const SurveySchema = new Schema({}, {strict: false, timestamps: true});

module.exports = mongoose.model('Survey', SurveySchema);