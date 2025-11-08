const express = require('express');
const Application = require('../models/Application');
const Job = require('../models/Job');
const User = require('../models/User');
const { authenticateToken, isCandidate, isEmployer, authorizeRole } = require('../middleware/auth');

const router = express.Router();

// Get all applications (admin only)
router.get('/', authenticateToken, async (req, res) => {
  try {
    // Check if user is admin
    if (req.user.role !== 'admin') {
      return res.status(403).json({ error: 'Access denied. Admin only.' });
    }

    const applications = await Application.findAll({
      include: [
        {
          model: User,
          as: 'applicant',
          attributes: ['id', 'name', 'email', 'phone', 'avatar']
        },
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
    console.error('Get all applications error:', error);
    res.status(500).json({ error: 'Failed to fetch applications' });
  }
});

// Submit application (candidates only)
router.post('/', authenticateToken, isCandidate, async (req, res) => {
  try {
    const {
      jobId,
      fullName,
      email,
      phone,
      education,
      experience,
      skills,
      resumeUrl,
      coverLetter
    } = req.body;

    // Validation
    if (!jobId || !fullName || !email || !phone) {
      return res.status(400).json({ error: 'Job ID, full name, email, and phone are required' });
    }

    // Check if job exists
    const job = await Job.findByPk(jobId);
    if (!job) {
      return res.status(404).json({ error: 'Job not found' });
    }

    if (!job.isActive) {
      return res.status(400).json({ error: 'This job is no longer accepting applications' });
    }

    // Check if already applied
    const existingApplication = await Application.findOne({
      where: { jobId, applicantId: req.user.id }
    });

    if (existingApplication) {
      return res.status(400).json({ error: 'You have already applied for this job' });
    }

    const application = await Application.create({
      jobId,
      applicantId: req.user.id,
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

// Get applications for a job (employers only - must be job owner)
router.get('/job/:jobId', authenticateToken, isEmployer, async (req, res) => {
  try {
    const { status } = req.query;
    
    // Check if employer owns the job
    const job = await Job.findByPk(req.params.jobId);
    if (!job) {
      return res.status(404).json({ error: 'Job not found' });
    }

    if (job.createdBy !== req.user.id) {
      return res.status(403).json({ error: 'Access denied. You can only view applications for your own jobs.' });
    }

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

// Get my applications (candidates only)
router.get('/my-applications', authenticateToken, isCandidate, async (req, res) => {
  try {
    const applications = await Application.findAll({
      where: { applicantId: req.user.id },
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

// Get applications by user ID (for backwards compatibility)
router.get('/user/:userId', authenticateToken, async (req, res) => {
  try {
    const userId = parseInt(req.params.userId);

    // Users can only view their own applications unless they're admin
    if (req.user.id !== userId && req.user.role !== 'admin') {
      return res.status(403).json({ error: 'Access denied. You can only view your own applications.' });
    }

    const applications = await Application.findAll({
      where: { applicantId: userId },
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
router.get('/:id', authenticateToken, async (req, res) => {
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
          include: [{
            model: User,
            as: 'creator',
            attributes: ['id', 'name', 'companyName']
          }]
        }
      ]
    });

    if (!application) {
      return res.status(404).json({ error: 'Application not found' });
    }

    // Check if user has access to this application
    const isApplicant = application.applicantId === req.user.id;
    const isJobOwner = application.job.createdBy === req.user.id;
    const isAdmin = req.user.role === 'admin';

    if (!isApplicant && !isJobOwner && !isAdmin) {
      return res.status(403).json({ error: 'Access denied.' });
    }

    res.json(application);
  } catch (error) {
    console.error('Get application error:', error);
    res.status(500).json({ error: 'Failed to fetch application' });
  }
});

// Update application status (employers only - must be job owner)
router.patch('/:id/status', authenticateToken, isEmployer, async (req, res) => {
  try {
    const { status } = req.body;
    
    const application = await Application.findByPk(req.params.id, {
      include: [{
        model: Job,
        as: 'job'
      }]
    });
    
    if (!application) {
      return res.status(404).json({ error: 'Application not found' });
    }

    // Check if employer owns the job
    if (application.job.createdBy !== req.user.id) {
      return res.status(403).json({ error: 'Access denied. You can only update applications for your own jobs.' });
    }

    // Validate status
    const validStatuses = ['Pending', 'Under Review', 'Shortlisted', 'Interview Scheduled', 'Rejected', 'Accepted'];
    if (!validStatuses.includes(status)) {
      return res.status(400).json({ error: 'Invalid status' });
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

// Update full application (employers only)
router.put('/:id', authenticateToken, isEmployer, async (req, res) => {
  try {
    const application = await Application.findByPk(req.params.id, {
      include: [{
        model: Job,
        as: 'job'
      }]
    });
    
    if (!application) {
      return res.status(404).json({ error: 'Application not found' });
    }

    // Check if employer owns the job
    if (application.job.createdBy !== req.user.id) {
      return res.status(403).json({ error: 'Access denied.' });
    }

    await application.update(req.body);

    res.json({
      message: 'Application updated successfully',
      application
    });
  } catch (error) {
    console.error('Update application error:', error);
    res.status(500).json({ error: 'Failed to update application' });
  }
});

// Delete application
router.delete('/:id', authenticateToken, async (req, res) => {
  try {
    const application = await Application.findByPk(req.params.id, {
      include: [{
        model: Job,
        as: 'job'
      }]
    });
    
    if (!application) {
      return res.status(404).json({ error: 'Application not found' });
    }

    // Only applicant, job owner, or admin can delete
    const isApplicant = application.applicantId === req.user.id;
    const isJobOwner = application.job.createdBy === req.user.id;
    const isAdmin = req.user.role === 'admin';

    if (!isApplicant && !isJobOwner && !isAdmin) {
      return res.status(403).json({ error: 'Access denied.' });
    }

    await application.destroy();

    res.json({ message: 'Application deleted successfully' });
  } catch (error) {
    console.error('Delete application error:', error);
    res.status(500).json({ error: 'Failed to delete application' });
  }
});

// Get application statistics for employer
router.get('/stats/employer', authenticateToken, isEmployer, async (req, res) => {
  try {
    const jobs = await Job.findAll({
      where: { createdBy: req.user.id },
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

    const rejected = await Application.count({
      where: { jobId: jobIds, status: 'Rejected' }
    });

    const accepted = await Application.count({
      where: { jobId: jobIds, status: 'Accepted' }
    });

    res.json({
      totalApplications,
      pending,
      underReview,
      shortlisted,
      interviewed,
      rejected,
      accepted
    });
  } catch (error) {
    console.error('Get application stats error:', error);
    res.status(500).json({ error: 'Failed to fetch application statistics' });
  }
});

module.exports = router;
