require('dotenv').config();
const express = require('express');
const cors = require('cors');
const connectDB = require('./config/db');

const app = express();
const PORT = process.env.PORT || 5000;

if (!process.env.MONGO_URI) {
  throw new Error('MONGO_URI is required');
}

if (!process.env.JWT_SECRET) {
  throw new Error('JWT_SECRET is required');
}

connectDB();

const allowedOrigins = process.env.CLIENT_URL
  ? process.env.CLIENT_URL.split(',').map((origin) => origin.trim()).filter(Boolean)
  : null;

app.use(
  cors(
    // allowedOrigins
    //   ? {
    //       origin: allowedOrigins,
    //       credentials: true,
    //     }
    //   : undefined
  )
);

app.use(express.json());

app.use('/api/auth', require('./routes/auth'));


app.get('/', (req, res) => {
  res.send('SkillSync API is running...');
});


app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});