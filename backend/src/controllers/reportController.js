const Report = require('../models/report');

exports.getAllReports = async (req, res) => {
  try {
    const reports = await Report.find();
    res.status(200).json(reports);
  } catch (error) {
    res.status(500).json({ error: 'Failed to retrieve reports' });
  }
};

exports.createReport = async (req, res) => {
  try {
    const { reporterName, dateOfInjuryStart, dateOfInjuryEnd, dateOfReport, bodyMapAreas } = req.body;

    const newReport = new Report({
      reporterName,
      dateOfInjuryStart,
      dateOfInjuryEnd,
      dateOfReport,
      bodyMapAreas,
    });

    const savedReport = await newReport.save();
    res.status(201).json(savedReport);
  } catch (error) {
    console.error('Error creating report:', error);
    res.status(500).json({ error: 'Could not create report' });
  }
};

exports.deleteReport = async (req, res) => {
  try {
    const reportId = req.params.id;
    const deletedReport = await Report.findByIdAndDelete(reportId);

    if (!deletedReport) {
      return res.status(404).json({ message: 'Report not found' });
    }

    res.status(200).json({ message: 'Report deleted successfully' });
  } catch (error) {
    console.error('Error deleting report:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};


exports.editReport = async (req, res) => {
  try {
    const reportId = req.params.id;
    const { reporterName, dateOfInjuryStart, dateOfInjuryEnd, dateOfReport, bodyMapAreas } = req.body;

    // Find the report by ID
    const report = await Report.findById(reportId);

    if (!report) {
      return res.status(404).json({ message: 'Report not found' });
    }

    // Update the report fields
    report.reporterName = reporterName;
    report.dateOfInjuryStart = dateOfInjuryStart;
    report.dateOfInjuryEnd = dateOfInjuryEnd;
    report.dateOfReport = dateOfReport;
    report.bodyMapAreas = bodyMapAreas;

    // Save the updated report
    const updatedReport = await report.save();

    res.status(200).json(updatedReport);
  } catch (error) {
    console.error('Error editing report:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};