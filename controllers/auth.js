const jwt = require('jsonwebtoken');
const User = require('../models/User'); // ensure path/name matches

// Helper to create JWT
const createToken = (user) => {
  return jwt.sign(
    { id: user._id, email: user.email },
    process.env.JWT_SECRET,
    { expiresIn: '1h' }
  );
};

// REGISTER: create user (do NOT hash here if model hashes in pre-save)
exports.register = async (req, res) => {
  const { email, password } = req.body;

  try {
    if (!email || !password) {
      return res.status(400).json({ message: 'Email and password are required' });
    }

    const existingUser = await User.findOne({ email });
    if (existingUser) return res.status(409).json({ message: 'User already exists' });

    // Create user with plain password — model's pre-save will hash it
    const newUser = new User({ email, password });
    await newUser.save();

    // Issue token right away so user is authenticated after register
    const token = createToken(newUser);

    res.status(201).json({
      message: 'User registered successfully',
      token
    });
  } catch (err) {
    console.error('Registration error:', err);
    res.status(500).json({ message: 'Server error' });
  }
};

// LOGIN: check credentials and issue token
exports.login = async (req, res) => {
  const { email, password } = req.body;

  try {
    if (!email || !password) {
      return res.status(400).json({ message: 'Email and password are required' });
    }

    const user = await User.findOne({ email });
    // model provides matchPassword method (bcrypt comparison)
    if (!user || !(await user.matchPassword(password))) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    const token = createToken(user);
    res.status(200).json({ token });
  } catch (err) {
    console.error('Login error:', err);
    res.status(500).json({ message: 'Server error' });
  }
};
