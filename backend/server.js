require('dotenv').config();
const mongoose = require('mongoose');
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const authRoutes = require('./routes/auth');
const notesRoutes = require('./routes/notes');

const PORT = process.env.PORT || 3001;

const app = express();
app.use(cors());
app.use(bodyParser.json());

mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.error(err));

app.use('/auth', authRoutes);
app.use('/notes', notesRoutes);

if (process.env.NODE_ENV !== 'production') {
  app.get('/', (req, res) => {
    res.send('API en développement');
  });
}

app.listen(PORT, () => console.log(`Backend running on port ${PORT}`));
