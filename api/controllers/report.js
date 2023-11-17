const { user, reports, service } = require("../database/models");

module.exports = {

  sendReport: async (req, res) => {
    try {
      const { userId, serviceId, description } = req.body;

      // Check if the user sending the report exists
      const users = await user.findByPk(userId);
      if (!users) {
        return res.status(404).json({ error: 'User not found' });
      }

      // Check if the service being reported exists
      const services = await service.findByPk(serviceId);
      if (!services) {
        return res.status(404).json({ error: 'Service not found' });
      }

      // Create a new report
      const report = await reports.create({
        userId,
        serviceId,
        description,
      });

      return res.status(201).json({ message: 'Report sent successfully', report });
    } catch (error) {
      console.error(error);
      return res.status(500).json({ error: 'Internal server error', error: error.message });
    }
  },

 getAllReports: async (req, res) => {
    try {
      const reportsData = await reports.findAll({
        include: [
          {
            model: user,
            attributes: ['id', 'userName', 'email',"imgUrl"],
          },
          {
            model: service,
            attributes: ['id', 'title'], 
          },
        ],
      });

      return res.status(200).json(reportsData);
    } catch (error) {
      console.error(error);
      return res.status(500).json({ error: 'Internal server error', message: error.message });
    }
  },

  deleteReport: async (req, res) => {
    try {
      const { reportId } = req.params;

      const report = await reports.findByPk(reportId);
      if (!report) {
        return res.status(404).json({ error: 'Report not found' });
      }

      // Delete the report
      await report.destroy();

      return res.status(200).json({ message: 'Report deleted successfully' });
    } catch (error) {
      console.error(error);
      return res.status(500).json({ error: 'Internal server error', message: error.message });
    }
  },
  
};