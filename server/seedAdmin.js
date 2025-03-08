const mongoose = require('mongoose');
const dotenv = require('dotenv');
const User = require('./models/User');

dotenv.config();

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
  .then(() => console.log('MongoDB Connected'))
  .catch((err) => {
    console.error(err);
    process.exit(1);
  });

const seedAdmin = async () => {
  try {
    const adminEmail = 'admin@gmail.com';
    // Check if an admin user already exists
    const adminExists = await User.findOne({ email: adminEmail });
    if (adminExists) {
      console.log('Admin user already exists');
      process.exit();
    }
    
    // Create a new admin user (the pre-save hook in the User model will hash the password)
    const admin = new User({
      name: 'Admin',
      email: 'admin@gmail.com', // Fixed the typo in the email address
      password: 'admin123' // Use a secure password in production!
    });
    
    await admin.save();
    console.log('Admin user created successfully');
    process.exit();
  } catch (error) {
    console.error('Error seeding admin user:', error);
    process.exit(1);
  }
};

seedAdmin();
