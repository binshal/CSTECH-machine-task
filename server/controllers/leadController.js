const multer = require('multer');
const { parse } = require('csv-parse');
const Lead = require('../models/Lead');
const Agent = require('../models/Agent');
const fs = require('fs');

// Setup multer storage – files will be temporarily stored in the uploads/ folder
const storage = multer.diskStorage({
  destination: function(req, file, cb) {
    cb(null, 'uploads/');
  },
  filename: function(req, file, cb) {
    cb(null, Date.now() + '-' + file.originalname);
  }
});

// Middleware for file upload with CSV file filter
exports.upload = multer({ 
  storage: storage,
  fileFilter: function(req, file, cb) {
    // Only allow CSV files (adjust mimetype if needed for XLSX)
    if(file.mimetype === 'text/csv' || file.mimetype === 'application/vnd.ms-excel') {
      cb(null, true);
    } else {
      cb(new Error('Only CSV files are allowed'));
    }
  }
}).single('file');

// Process uploaded CSV and distribute leads among agents
exports.processUpload = async (req, res) => {
  const filePath = req.file.path;
  
  try {
    const agents = await Agent.find();
    if(agents.length === 0) {
      return res.status(400).json({ message: 'No agents available for assignment' });
    }
    
    const leads = [];
    fs.createReadStream(filePath)
  .pipe(parse({ columns: true, trim: true }))
  .on('data', (row) => {
    leads.push({
      firstName: row.FirstName,
      phone: row.Phone,
      notes: row.Notes
    });
  })
  .on('end', async () => {
    // Distribution algorithm: divide leads among agents
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
    
    // Save all leads into the database
    const savedLeads = await Lead.insertMany(leads);
    // Remove the uploaded file after processing
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

// Retrieve all leads with their assigned agent details
exports.getLeads = async (req, res) => {
  try {
    const leads = await Lead.find().populate('assignedAgent', 'name email');
    res.json(leads);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};