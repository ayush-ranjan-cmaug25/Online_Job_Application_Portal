const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');
const User = require('./User');
const Job = require('./Job');

const Application = sequelize.define('Application', {
  id: { 
    type: DataTypes.INTEGER, 
    autoIncrement: true, 
    primaryKey: true 
  },
  fullName: {
    type: DataTypes.STRING,
    allowNull: false
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false
  },
  phone: {
    type: DataTypes.STRING,
    allowNull: false
  },
  education: {
    type: DataTypes.TEXT,
    allowNull: true
  },
  experience: {
    type: DataTypes.TEXT,
    allowNull: true
  },
  skills: {
    type: DataTypes.TEXT,
    allowNull: true
  },
  resumeUrl: {
    type: DataTypes.STRING,
    allowNull: true
  },
  coverLetter: {
    type: DataTypes.TEXT,
    allowNull: true
  },
  status: {
    type: DataTypes.ENUM('Pending', 'Under Review', 'Shortlisted', 'Interview Scheduled', 'Rejected', 'Hired'),
    defaultValue: 'Pending'
  },
  appliedAt: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW
  }
});

// Relationships
Application.belongsTo(User, { as: 'applicant', foreignKey: 'applicantId' });
Application.belongsTo(Job, { as: 'job', foreignKey: 'jobId' });

module.exports = Application;
