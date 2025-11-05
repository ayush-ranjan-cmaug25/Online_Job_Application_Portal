const express = require('express');
const SavedJob = require('../models/SavedJob');
const Job = require('../models/Job');
const User = require('../models/User');

const router = express.Router();

// Save a job
router.post('/', async (req, res) => {
  try {
    const { userId, jobId } = req.body;

    // Check if already saved
    const existingSave = await SavedJob.findOne({
      where: { userId, jobId }
    });

    if (existingSave) {
      return res.status(400).json({ error: 'Job already saved' });
    }

    const savedJob = await SavedJob.create({ userId, jobId });

    res.status(201).json({
      message: 'Job saved successfully',
      savedJob
    });
  } catch (error) {
    console.error('Save job error:', error);
    res.status(500).json({ error: 'Failed to save job' });
  }
});

// Get saved jobs for a user
router.get('/user/:userId', async (req, res) => {
  try {
    const savedJobs = await SavedJob.findAll({
      where: { userId: req.params.userId },
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
router.delete('/:id', async (req, res) => {
  try {
    const savedJob = await SavedJob.findByPk(req.params.id);
    
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
router.get('/check/:userId/:jobId', async (req, res) => {
  try {
    const savedJob = await SavedJob.findOne({
      where: { 
        userId: req.params.userId,
        jobId: req.params.jobId
      }
    });

    res.json({ isSaved: !!savedJob, savedJobId: savedJob?.id });
  } catch (error) {
    console.error('Check saved job error:', error);
    res.status(500).json({ error: 'Failed to check saved job' });
  }
});

module.exports = router;
