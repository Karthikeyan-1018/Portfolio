const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');
const connectDB = require('./config/db');

const projectRoutes = require('./routes/projectRoutes');
const contactRoutes = require('./routes/contactRoutes');

dotenv.config();
connectDB();

const app = express();

app.use(cors({
  origin: ['http://localhost:3000', 'http://127.0.0.1:5500', '*'],
  methods: ['GET', 'POST', 'DELETE'],
}));
app.use(express.json());

app.use('/api/projects', projectRoutes);
app.use('/api/contact', contactRoutes);

app.get('/', (req, res) => {
  res.send('Portfolio API is running');
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

