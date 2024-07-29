const express = require('express');
const mongoose = require('mongoose');
const multer = require('multer');
const path = require('path');
const cors = require('cors');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(express.json());
app.use(cors());

// Static files setup
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// MongoDB connection
mongoose.connect('mongodb://localhost:27017/mydatabase', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
mongoose.connection.on('connected', () => {
  console.log('Connected to MongoDB');
});
mongoose.connection.on('error', (err) => {
  console.error('MongoDB connection error:', err);
});

// Multer setup for file uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/');
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname));
  },
});
const upload = multer({ storage: storage });

// MongoDB Schemas
const userSchema = new mongoose.Schema({
  name: String,
  email: String,
  password: String,
});
const User = mongoose.model('User', userSchema);

const memberSchema = new mongoose.Schema({
  name: String,
  email: String,
  phone: String,
  company: String,
  address: String,
  city: String,
  profilePicture: String,
  images: [String], // Array to hold additional images
});
const Member = mongoose.model('Member', memberSchema);

const supplierSchema = new mongoose.Schema({
  name: String,
  phone: String,
  email: String,
  company: String,
  address: String,
  city: String,
  profilePicture: String,
  images: [String], // Array to hold additional images
});
const Supplier = mongoose.model('Supplier', supplierSchema);

// Endpoints

// User signup
app.post('/signup', async (req, res) => {
  const { name, email, password } = req.body;

  try {
    // Check if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: 'User already exists' });
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create new user
    const newUser = new User({ name, email, password: hashedPassword });
    await newUser.save();
    res.status(201).json({ message: 'User registered successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error });
  }
});

// User login
app.post('/login', async (req, res) => {
  const { email, password } = req.body;

  try {
    // Find user
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }

    // Compare password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }

    // Generate token
    const token = jwt.sign({ userId: user._id }, 'your_jwt_secret', { expiresIn: '1h' });
    res.json({ token });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error });
  }
});

// Add a new member
app.post('/add-member', upload.fields([
  { name: 'profilePicture', maxCount: 1 },
  { name: 'images', maxCount: 10 }
]), async (req, res) => {
  const { name, phone, email, company, address, city } = req.body;
  const profilePicture = req.files['profilePicture'] ? req.files['profilePicture'][0].filename : null;
  const images = req.files['images'] ? req.files['images'].map(file => file.filename) : [];

  const newMember = new Member({ name, phone, email, company, address, city, profilePicture, images });

  try {
    await newMember.save();
    res.status(201).json(newMember);
  } catch (error) {
    res.status(400).send(error);
  }
});

// Get all members
app.get('/members', async (req, res) => {
  try {
    const members = await Member.find();
    res.status(200).json(members);
  } catch (error) {
    res.status(400).send(error);
  }
});

// Add a new supplier
app.post('/add-supplier', upload.fields([
  { name: 'profilePicture', maxCount: 1 },
  { name: 'images', maxCount: 10 }
]), async (req, res) => {
  const { name, email, phone, company, address, city } = req.body;
  const profilePicture = req.files['profilePicture'] ? req.files['profilePicture'][0].filename : null;
  const images = req.files['images'] ? req.files['images'].map(file => file.filename) : [];

  const newSupplier = new Supplier({ name, email, phone, company, address, city, profilePicture, images });

  try {
    await newSupplier.save();
    res.status(201).json(newSupplier);
  } catch (error) {
    res.status(400).send(error);
  }
});

// Get all suppliers
app.get('/suppliers', async (req, res) => {
  try {
    const suppliers = await Supplier.find();
    res.status(200).json(suppliers);
  } catch (error) {
    res.status(400).send(error);
  }
});

// Start server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
