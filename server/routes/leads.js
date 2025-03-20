const express = require('express');
const router = express.Router();
const { upload, processUpload, getLeads, getLeadsByAgent } = require('../controllers/leadController');
const { protect } = require('../middleware/authMiddleware');

router.post('/upload', protect, upload, processUpload);
router.get('/', protect, getLeads);
router.get('/agent/:id', protect, getLeadsByAgent);

module.exports = router;
