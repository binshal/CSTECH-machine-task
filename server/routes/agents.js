const express = require('express');
const router = express.Router();
const { createAgent, getAgents, updateAgent, deleteAgent } = require('../controllers/agentController');
const { protect } = require('../middleware/authMiddleware');

router.post('/', protect, createAgent);
router.get('/', protect, getAgents);
router.put('/:id', protect, updateAgent);
router.delete('/:id', protect, deleteAgent);

module.exports = router;
