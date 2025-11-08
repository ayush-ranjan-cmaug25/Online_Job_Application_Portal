const express = require('express');
const SavedJob = require('../models/SavedJob');
const Job = require('../models/Job');
const User = require('../models/User');
const { authenticateToken, isCandidate } = require('../middleware/auth');

const router = express.Router();

// Save a job (candidates only)
router.post('/', authenticateToken, isCandidate, async (req, res) => {
  try {
    const { jobId } = req.body;

    if (!jobId) {
      return res.status(400).json({ error: 'Job ID is required' });
    }

    // Check if job exists
    const job = await Job.findByPk(jobId);
    if (!job) {
      return res.status(404).json({ error: 'Job not found' });
    }

    // Check if already saved
    const existingSave = await SavedJob.findOne({
      where: { userId: req.user.id, jobId }
    });

    if (existingSave) {
      return res.status(400).json({ error: 'Job already saved' });
    }

    const savedJob = await SavedJob.create({ 
      userId: req.user.id, 
      jobId 
    });

    res.status(201).json({
      message: 'Job saved successfully',
      savedJob
    });
  } catch (error) {
    console.error('Save job error:', error);
    res.status(500).json({ error: 'Failed to save job' });
  }
});

// Get my saved jobs
router.get('/my-saved-jobs', authenticateToken, isCandidate, async (req, res) => {
  try {
    const savedJobs = await SavedJob.findAll({
      where: { userId: req.user.id },
      include: [
        {
          model: Job,
          as: 'job',
          include: [{
            model: User,
            as: 'creator',
            attributes: ['id', 'name', 'companyName']
          }]
        }
      ],
      order: [['savedAt', 'DESC']]
    });

    res.json(savedJobs);
  } catch (error) {
    console.error('Get saved jobs error:', error);
    res.status(500).json({ error: 'Failed to fetch saved jobs' });
  }
});

// Get saved jobs for a user (for backwards compatibility)
router.get('/user/:userId', authenticateToken, async (req, res) => {
  try {
    const userId = parseInt(req.params.userId);

    // Users can only view their own saved jobs unless they're admin
    if (req.user.id !== userId && req.user.role !== 'admin') {
      return res.status(403).json({ error: 'Access denied. You can only view your own saved jobs.' });
    }

    const savedJobs = await SavedJob.findAll({
      where: { userId },
      include: [
        {
          model: Job,
          as: 'job',
          include: [{
            model: User,
            as: 'creator',
            attributes: ['id', 'name', 'companyName']
          }]
        }
      ],
      order: [['savedAt', 'DESC']]
    });

    res.json(savedJobs);
  } catch (error) {
    console.error('Get saved jobs error:', error);
    res.status(500).json({ error: 'Failed to fetch saved jobs' });
  }
});

// Remove saved job
router.delete('/:id', authenticateToken, isCandidate, async (req, res) => {
  try {
    const savedJob = await SavedJob.findByPk(req.params.id);
    
    if (!savedJob) {
      return res.status(404).json({ error: 'Saved job not found' });
    }

    // Check if user owns this saved job
    if (savedJob.userId !== req.user.id) {
      return res.status(403).json({ error: 'Access denied. You can only remove your own saved jobs.' });
    }

    await savedJob.destroy();

    res.json({ message: 'Saved job removed successfully' });
  } catch (error) {
    console.error('Remove saved job error:', error);
    res.status(500).json({ error: 'Failed to remove saved job' });
  }
});

// Remove saved job by job ID (alternative endpoint)
router.delete('/job/:jobId', authenticateToken, isCandidate, async (req, res) => {
  try {
    const savedJob = await SavedJob.findOne({
      where: {
        userId: req.user.id,
        jobId: req.params.jobId
      }
    });
    
    if (!savedJob) {
      return res.status(404).json({ error: 'Saved job not found' });
    }

    await savedJob.destroy();

    res.json({ message: 'Saved job removed successfully' });
  } catch (error) {
    console.error('Remove saved job error:', error);
    res.status(500).json({ error: 'Failed to remove saved job' });
  }
});

// Check if job is saved
router.get('/check/:jobId', authenticateToken, isCandidate, async (req, res) => {
  try {
    const savedJob = await SavedJob.findOne({
      where: { 
        userId: req.user.id,
        jobId: req.params.jobId
      }
    });

    res.json({ 
      isSaved: !!savedJob, 
      savedJobId: savedJob?.id 
    });
  } catch (error) {
    console.error('Check saved job error:', error);
    res.status(500).json({ error: 'Failed to check saved job' });
  }
});

module.exports = router;
