const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const path = require('path');


const User = require('./user');

const app = express();
const PORT = process.env.PORT || 4000;

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));


app.use(express.static(path.join(__dirname, '..', 'public')));

mongoose.connect('mongodb://127.0.0.1:27017/ecofinds', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log('✅ MongoDB connected to ecofinds'))
.catch(err => console.error('❌ MongoDB connection error:', err));


app.post('/api/register', async (req, res) => {
  try {
    const { email, password } = req.body || {};
    if (!email || !password) {
      return res.status(400).json({ error: 'Email and password are required' });
    }

    const username = String(email).toLowerCase().trim();
    const exists = await User.findOne({ username });
    if (exists) return res.status(400).json({ error: 'Email already registered' });

    const user = new User({ username, password });
    await user.save();
    res.json({ message: '✅ Registration successful', email: username });
  } catch (err) {
    console.error('Registration error:', err);
    res.status(500).json({ error: 'Server error during registration' });
  }
});


app.post('/api/login', async (req, res) => {
  try {
    const { email, password } = req.body || {};
    if (!email || !password) {
      return res.status(400).json({ error: 'Email and password are required' });
    }

    const username = String(email).toLowerCase().trim();
    const user = await User.findOne({ username });
    if (!user) return res.status(400).json({ error: 'No account found with this email' });

    const ok = await user.comparePassword(password);
    if (!ok) return res.status(400).json({ error: 'Incorrect password' });

    res.json({ message: '✅ Login successful', user: { id: user._id, username: user.username } });
  } catch (err) {
    console.error('Login error:', err);
    res.status(500).json({ error: 'Server error during login' });
  }
});


app.get('/config.js', (_req, res) => {
  res.type('application/javascript').send(
    `window.BASE_URL = "${process.env.BASE_URL || `http://localhost:${PORT}`}";`
  );
});

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '..', 'public', 'login.html'));
});


app.listen(PORT, () => {
  console.log(`🚀 Auth server running on http://localhost:${PORT}`);
});
