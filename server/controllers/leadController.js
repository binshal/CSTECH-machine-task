const multer = require('multer');
const { parse } = require('csv-parse');
const Lead = require('../models/Lead');
const Agent = require('../models/Agent');
const fs = require('fs');

// Multer storage configuration for CSV uploads
const storage = multer.diskStorage({
  destination: function(req, file, cb) {
    cb(null, 'uploads/');
  },
  filename: function(req, file, cb) {
    cb(null, Date.now() + '-' + file.originalname);
  }
});

// File upload middleware
exports.upload = multer({ 
  storage: storage,
  fileFilter: function(req, file, cb) {
    if (file.mimetype === 'text/csv' || file.mimetype === 'application/vnd.ms-excel') {
      cb(null, true);
    } else {
      cb(new Error('Only CSV files are allowed'));
    }
  }
}).single('file');

exports.processUpload = async (req, res) => {
  const filePath = req.file.path;
  const adminId = req.admin.id;
  try {
    // Get agents belonging to the logged-in admin
    const agents = await Agent.find({ admin: adminId });
    if (agents.length === 0) {
      return res.status(400).json({ message: 'No agents available for assignment' });
    }
    const leads = [];
    fs.createReadStream(filePath)
      .pipe(parse({ columns: true, trim: true }))
      .on('data', (row) => {
        leads.push({
          firstName: row.FirstName,
          phone: row.Phone,
          notes: row.Notes,
          admin: adminId
        });
      })
      .on('end', async () => {
        const totalLeads = leads.length;
        const numberOfAgents = agents.length;
        const leadsPerAgent = Math.floor(totalLeads / numberOfAgents);
        let remainder = totalLeads % numberOfAgents;
        let leadIndex = 0;
        for (let i = 0; i < agents.length; i++) {
          let count = leadsPerAgent;
          if (remainder > 0) {
            count++;
            remainder--;
          }
          for (let j = 0; j < count; j++) {
            if (leadIndex >= totalLeads) break;
            leads[leadIndex].assignedAgent = agents[i]._id;
            leadIndex++;
          }
        }
        const savedLeads = await Lead.insertMany(leads);
        fs.unlinkSync(filePath);
        res.json({ message: 'Leads uploaded and distributed', leads: savedLeads });
      })
      .on('error', (err) => {
        console.error(err);
        res.status(500).json({ message: 'Error processing file' });
      });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};

exports.getLeads = async (req, res) => {
  const adminId = req.admin.id;
  try {
    const leads = await Lead.find({ admin: adminId }).populate('assignedAgent', 'name email mobile');
    res.json(leads);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};

// New endpoint: Get leads assigned to a specific agent
exports.getLeadsByAgent = async (req, res) => {
  const adminId = req.admin.id;
  const agentId = req.params.id;
  try {
    const leads = await Lead.find({ admin: adminId, assignedAgent: agentId });
    res.json(leads);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};
