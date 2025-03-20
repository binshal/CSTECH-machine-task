const Agent = require('../models/Agent');
const bcrypt = require('bcryptjs');

exports.createAgent = async (req, res) => {
  const { name, email, mobile, password } = req.body;
  const adminId = req.admin.id; // from auth middleware
  try {
    const existingAgent = await Agent.findOne({ email, admin: adminId });
    if (existingAgent) {
      return res.status(400).json({ message: 'Agent already exists' });
    }
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    const agent = new Agent({ name, email, mobile, password: hashedPassword, admin: adminId });
    await agent.save();
    res.status(201).json(agent);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};

exports.getAgents = async (req, res) => {
  const adminId = req.admin.id;
  try {
    const agents = await Agent.find({ admin: adminId });
    res.json(agents);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};

exports.updateAgent = async (req, res) => {
  const { id } = req.params;
  const { name, email, mobile, password } = req.body;
  const adminId = req.admin.id;
  try {
    const agent = await Agent.findOne({ _id: id, admin: adminId });
    if (!agent) {
      return res.status(404).json({ message: 'Agent not found' });
    }
    agent.name = name || agent.name;
    agent.email = email || agent.email;
    agent.mobile = mobile || agent.mobile;
    if (password) {
      const salt = await bcrypt.genSalt(10);
      agent.password = await bcrypt.hash(password, salt);
    }
    await agent.save();
    res.json(agent);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};

exports.deleteAgent = async (req, res) => {
  const { id } = req.params;
  const adminId = req.admin.id;
  try {
    const agent = await Agent.findOne({ _id: id, admin: adminId });
    if (!agent) {
      return res.status(404).json({ message: 'Agent not found' });
    }
    await agent.remove();
    res.json({ message: 'Agent removed' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};
