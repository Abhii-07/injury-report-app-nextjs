
const mongoose = require('mongoose');

const reportSchema = new mongoose.Schema({
  reporterName: String,
  dateOfInjuryStart: Date,
  dateOfInjuryEnd: Date,
  dateOfReport: Date,
  bodyMapAreas: [
    {
      label: String,
      description: String,
    },
  ],
});

const Report = mongoose.model('Report', reportSchema);

module.exports = Report;
