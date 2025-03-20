const User = require('../models/User');
const jwt = require('jsonwebtoken');

exports.login = async (req, res) => {
  const { email, password } = req.body;
  
  try {
    const user = await User.findOne({ email });
    if(!user) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }
    
    const isMatch = await user.matchPassword(password);
    if(!isMatch) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }
    
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: '1d'
    });
    
    res.json({ token, user: { id: user._id, name: user.name, email: user.email }});
    
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};