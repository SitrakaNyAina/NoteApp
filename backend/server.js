require('dotenv').config();
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const authRoutes = require('./routes/auth');
const notesRoutes = require('./routes/notes');
const verifyToken = require('./middleware/auth');

const app = express();
const PORT = process.env.PORT || 3001;

app.use(cors());
app.use(bodyParser.json());

app.get('/', (req, res) => {
  res.send('Notes API is running 🚀');
});

app.use('/auth', authRoutes);
app.use('/notes', verifyToken, notesRoutes);

app.listen(PORT, () => {
  console.log(`Backend running on port ${PORT}`);
});