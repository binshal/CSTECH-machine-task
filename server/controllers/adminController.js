const Admin = require('../models/Admin');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: process.env.JWT_EXPIRE || '1d' });
};

exports.register = async (req, res) => {
  const { name, email, password } = req.body;
  try {
    const existingAdmin = await Admin.findOne({ email });
    if (existingAdmin) {
      return res.status(400).json({ message: 'Admin already exists' });
    }
    const admin = new Admin({ name, email, password });
    await admin.save();
    const token = generateToken(admin._id);
    res.status(201).json({ token, admin: { id: admin._id, name: admin.name, email: admin.email } });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};

exports.login = async (req, res) => {
  const { email, password } = req.body;
  try {
    const admin = await Admin.findOne({ email });
    if (!admin) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }
    const isMatch = await bcrypt.compare(password, admin.password);
    if (!isMatch) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }
    const token = generateToken(admin._id);
    res.json({ token, admin: { id: admin._id, name: admin.name, email: admin.email } });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};
