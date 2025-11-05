const express = require('express');
const Job = require('../models/Job');
const User = require('../models/User');
const { Op } = require('sequelize');

const router = express.Router();

// Get all jobs with filters and search
router.get('/', async (req, res) => {
  try {
    const { 
      search, 
      location, 
      jobType, 
      industry, 
      experienceLevel,
      salaryMin,
      salaryMax,
      page = 1, 
      limit = 10,
      featured = false 
    } = req.query;

    const offset = (page - 1) * limit;
    
    // Build where clause
    const where = { isActive: true };
    
    if (search) {
      where[Op.or] = [
        { title: { [Op.like]: `%${search}%` } },
        { description: { [Op.like]: `%${search}%` } },
        { company: { [Op.like]: `%${search}%` } }
      ];
    }
    
    if (location) {
      where.location = { [Op.like]: `%${location}%` };
    }
    
    if (jobType) {
      where.jobType = jobType;
    }
    
    if (industry) {
      where.industry = { [Op.like]: `%${industry}%` };
    }
    
    if (experienceLevel) {
      where.experienceLevel = experienceLevel;
    }
    
    if (salaryMin) {
      where.salaryMin = { [Op.gte]: parseInt(salaryMin) };
    }
    
    if (salaryMax) {
      where.salaryMax = { [Op.lte]: parseInt(salaryMax) };
    }
    
    if (featured === 'true') {
      where.isFeatured = true;
    }

    const { count, rows: jobs } = await Job.findAndCountAll({
      where,
      include: [{
        model: User,
        as: 'creator',
        attributes: ['id', 'name', 'email', 'companyName']
      }],
      limit: parseInt(limit),
      offset,
      order: [['postedAt', 'DESC']]
    });

    res.json({
      jobs,
      total: count,
      pages: Math.ceil(count / limit),
      currentPage: parseInt(page)
    });
  } catch (error) {
    console.error('Get jobs error:', error);
    res.status(500).json({ error: 'Failed to fetch jobs' });
  }
});

// Get job by ID
router.get('/:id', async (req, res) => {
  try {
    const job = await Job.findByPk(req.params.id, {
      include: [{
        model: User,
        as: 'creator',
        attributes: ['id', 'name', 'email', 'companyName', 'companyWebsite']
      }]
    });

    if (!job) {
      return res.status(404).json({ error: 'Job not found' });
    }

    // Increment views
    await job.increment('views');

    res.json(job);
  } catch (error) {
    console.error('Get job error:', error);
    res.status(500).json({ error: 'Failed to fetch job' });
  }
});

// Create job
router.post('/', async (req, res) => {
  try {
    const {
      title,
      description,
      requirements,
      responsibilities,
      company,
      companyLogo,
      location,
      salary,
      salaryMin,
      salaryMax,
      jobType,
      industry,
      experienceLevel,
      deadline,
      isFeatured,
      createdBy
    } = req.body;

    const job = await Job.create({
      title,
      description,
      requirements,
      responsibilities,
      company,
      companyLogo,
      location,
      salary,
      salaryMin,
      salaryMax,
      jobType,
      industry,
      experienceLevel,
      deadline,
      isFeatured: isFeatured || false,
      createdBy
    });

    res.status(201).json({
      message: 'Job posted successfully',
      job
    });
  } catch (error) {
    console.error('Create job error:', error);
    res.status(500).json({ error: 'Failed to create job' });
  }
});

// Update job
router.put('/:id', async (req, res) => {
  try {
    const job = await Job.findByPk(req.params.id);
    
    if (!job) {
      return res.status(404).json({ error: 'Job not found' });
    }

    await job.update(req.body);

    res.json({
      message: 'Job updated successfully',
      job
    });
  } catch (error) {
    console.error('Update job error:', error);
    res.status(500).json({ error: 'Failed to update job' });
  }
});

// Delete job
router.delete('/:id', async (req, res) => {
  try {
    const job = await Job.findByPk(req.params.id);
    
    if (!job) {
      return res.status(404).json({ error: 'Job not found' });
    }

    await job.destroy();

    res.json({ message: 'Job deleted successfully' });
  } catch (error) {
    console.error('Delete job error:', error);
    res.status(500).json({ error: 'Failed to delete job' });
  }
});

// Toggle job active status
router.patch('/:id/toggle-active', async (req, res) => {
  try {
    const job = await Job.findByPk(req.params.id);
    
    if (!job) {
      return res.status(404).json({ error: 'Job not found' });
    }

    await job.update({ isActive: !job.isActive });

    res.json({
      message: `Job ${job.isActive ? 'activated' : 'deactivated'} successfully`,
      job
    });
  } catch (error) {
    console.error('Toggle job error:', error);
    res.status(500).json({ error: 'Failed to toggle job status' });
  }
});

// Get jobs by employer
router.get('/employer/:employerId', async (req, res) => {
  try {
    const jobs = await Job.findAll({
      where: { createdBy: req.params.employerId },
      order: [['postedAt', 'DESC']]
    });

    res.json(jobs);
  } catch (error) {
    console.error('Get employer jobs error:', error);
    res.status(500).json({ error: 'Failed to fetch employer jobs' });
  }
});

module.exports = router;
