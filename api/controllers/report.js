const { User, reports, service } = require("../database/index");

module.exports = {

  sendReport: async (req, res) => {
    try {
      const { userId, serviceId, description } = req.body;

      // Check if the user sending the report exists
      const user = await User.findByPk(userId);
      if (!user) {
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
      // Query all reports without including associated user and service information
      const reportsData = await reports.findAll();
  
      return res.status(200).json(reportsData);
    } catch (error) {
      console.error(error);
      return res.status(500).json({ error: 'Internal server error', message: error.message });
    }
  },
  
};