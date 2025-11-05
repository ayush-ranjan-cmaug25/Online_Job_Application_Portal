const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');
const User = require('./User');

const Job = sequelize.define('Job', {
  id: { 
    type: DataTypes.INTEGER, 
    autoIncrement: true, 
    primaryKey: true 
  },
  title: {
    type: DataTypes.STRING,
    allowNull: false
  },
  description: {
    type: DataTypes.TEXT,
    allowNull: false
  },
  requirements: {
    type: DataTypes.TEXT,
    allowNull: true
  },
  responsibilities: {
    type: DataTypes.TEXT,
    allowNull: true
  },
  company: {
    type: DataTypes.STRING,
    allowNull: false
  },
  companyLogo: {
    type: DataTypes.STRING,
    allowNull: true
  },
  location: {
    type: DataTypes.STRING,
    allowNull: false
  },
  salary: {
    type: DataTypes.STRING,
    allowNull: true
  },
  salaryMin: {
    type: DataTypes.INTEGER,
    allowNull: true
  },
  salaryMax: {
    type: DataTypes.INTEGER,
    allowNull: true
  },
  jobType: {
    type: DataTypes.ENUM('Full-time', 'Part-time', 'Contract', 'Internship', 'Remote'),
    defaultValue: 'Full-time'
  },
  industry: {
    type: DataTypes.STRING,
    allowNull: true
  },
  experienceLevel: {
    type: DataTypes.ENUM('Entry Level', 'Mid Level', 'Senior Level', 'Executive'),
    defaultValue: 'Entry Level'
  },
  deadline: {
    type: DataTypes.DATE,
    allowNull: true
  },
  isActive: {
    type: DataTypes.BOOLEAN,
    defaultValue: true
  },
  isFeatured: {
    type: DataTypes.BOOLEAN,
    defaultValue: false
  },
  views: {
    type: DataTypes.INTEGER,
    defaultValue: 0
  },
  postedAt: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW
  }
});

Job.belongsTo(User, { as: 'creator', foreignKey: 'createdBy' });

module.exports = Job;
