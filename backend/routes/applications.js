const express = require('express');
const Application = require('../models/Application');
const Job = require('../models/Job');
const User = require('../models/User');

const router = express.Router();

// Submit application
router.post('/', async (req, res) => {
  try {
    const {
      jobId,
      applicantId,
      fullName,
      email,
      phone,
      education,
      experience,
      skills,
      resumeUrl,
      coverLetter
    } = req.body;

    // Check if already applied
    const existingApplication = await Application.findOne({
      where: { jobId, applicantId }
    });

    if (existingApplication) {
      return res.status(400).json({ error: 'You have already applied for this job' });
    }

    const application = await Application.create({
      jobId,
      applicantId,
      fullName,
      email,
      phone,
      education,
      experience,
      skills,
      resumeUrl,
      coverLetter,
      status: 'Pending'
    });

    res.status(201).json({
      message: 'Application submitted successfully',
      application
    });
  } catch (error) {
    console.error('Submit application error:', error);
    res.status(500).json({ error: 'Failed to submit application' });
  }
});

// Get applications for a job (for employers)
router.get('/job/:jobId', async (req, res) => {
  try {
    const { status } = req.query;
    
    const where = { jobId: req.params.jobId };
    if (status) {
      where.status = status;
    }

    const applications = await Application.findAll({
      where,
      include: [
        {
          model: User,
          as: 'applicant',
          attributes: ['id', 'name', 'email', 'phone', 'avatar']
        },
        {
          model: Job,
          as: 'job',
          attributes: ['id', 'title', 'company']
        }
      ],
      order: [['appliedAt', 'DESC']]
    });

    res.json(applications);
  } catch (error) {
    console.error('Get job applications error:', error);
    res.status(500).json({ error: 'Failed to fetch applications' });
  }
});

// Get applications by user (for applicants)
router.get('/user/:userId', async (req, res) => {
  try {
    const applications = await Application.findAll({
      where: { applicantId: req.params.userId },
      include: [
        {
          model: Job,
          as: 'job',
          attributes: ['id', 'title', 'company', 'location', 'jobType', 'salary']
        }
      ],
      order: [['appliedAt', 'DESC']]
    });

    res.json(applications);
  } catch (error) {
    console.error('Get user applications error:', error);
    res.status(500).json({ error: 'Failed to fetch applications' });
  }
});

// Get single application
router.get('/:id', async (req, res) => {
  try {
    const application = await Application.findByPk(req.params.id, {
      include: [
        {
          model: User,
          as: 'applicant',
          attributes: ['id', 'name', 'email', 'phone', 'avatar', 'bio', 'skills', 'education', 'experience']
        },
        {
          model: Job,
          as: 'job',
          attributes: ['id', 'title', 'company', 'location']
        }
      ]
    });

    if (!application) {
      return res.status(404).json({ error: 'Application not found' });
    }

    res.json(application);
  } catch (error) {
    console.error('Get application error:', error);
    res.status(500).json({ error: 'Failed to fetch application' });
  }
});

// Update application status
router.patch('/:id/status', async (req, res) => {
  try {
    const { status } = req.body;
    
    const application = await Application.findByPk(req.params.id);
    
    if (!application) {
      return res.status(404).json({ error: 'Application not found' });
    }

    await application.update({ status });

    res.json({
      message: 'Application status updated successfully',
      application
    });
  } catch (error) {
    console.error('Update application status error:', error);
    res.status(500).json({ error: 'Failed to update application status' });
  }
});

// Delete application
router.delete('/:id', async (req, res) => {
  try {
    const application = await Application.findByPk(req.params.id);
    
    if (!application) {
      return res.status(404).json({ error: 'Application not found' });
    }

    await application.destroy();

    res.json({ message: 'Application deleted successfully' });
  } catch (error) {
    console.error('Delete application error:', error);
    res.status(500).json({ error: 'Failed to delete application' });
  }
});

// Get application statistics for employer
router.get('/stats/employer/:employerId', async (req, res) => {
  try {
    const jobs = await Job.findAll({
      where: { createdBy: req.params.employerId },
      attributes: ['id']
    });

    const jobIds = jobs.map(job => job.id);

    const totalApplications = await Application.count({
      where: { jobId: jobIds }
    });

    const pending = await Application.count({
      where: { jobId: jobIds, status: 'Pending' }
    });

    const underReview = await Application.count({
      where: { jobId: jobIds, status: 'Under Review' }
    });

    const shortlisted = await Application.count({
      where: { jobId: jobIds, status: 'Shortlisted' }
    });

    const interviewed = await Application.count({
      where: { jobId: jobIds, status: 'Interview Scheduled' }
    });

    res.json({
      totalApplications,
      pending,
      underReview,
      shortlisted,
      interviewed
    });
  } catch (error) {
    console.error('Get application stats error:', error);
    res.status(500).json({ error: 'Failed to fetch application statistics' });
  }
});

module.exports = router;
