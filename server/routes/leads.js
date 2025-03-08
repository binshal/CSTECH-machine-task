const express = require('express');
const router = express.Router();
const { upload, processUpload, getLeads } = require('../controllers/leadController');
const { protect } = require('../middleware/authMiddleware');

router.post('/upload', protect, upload, processUpload);
router.get('/', protect, getLeads);

module.exports = router;