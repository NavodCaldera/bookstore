const express = require('express');
const app = express();
const authRoutes = require('./routes/authRoutes');
const cors = require('cors');

app.use(cors());
app.use(express.json()); // parse JSON body

app.use('/api/auth', authRoutes); // /api/auth/register

module.exports = app;
