const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');
const User = require('./User');
const Job = require('./Job');

const SavedJob = sequelize.define('SavedJob', {
  id: { 
    type: DataTypes.INTEGER, 
    autoIncrement: true, 
    primaryKey: true 
  },
  savedAt: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW
  }
});

// Relationships
SavedJob.belongsTo(User, { as: 'user', foreignKey: 'userId' });
SavedJob.belongsTo(Job, { as: 'job', foreignKey: 'jobId' });

module.exports = SavedJob;
