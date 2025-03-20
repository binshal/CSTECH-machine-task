const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const connectDB = require('./config/db');
const fs = require('fs');
const path = require('path');

dotenv.config();

connectDB();

const app = express();

app.use(express.json());
app.use(cors());

// Ensure the uploads folder exists
const uploadDir = path.join(__dirname, 'uploads');
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir);
}

// Routes
app.use('/api/admin', require('./routes/admin'));
app.use('/api/agents', require('./routes/agents'));
app.use('/api/leads', require('./routes/leads'));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
