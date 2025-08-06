const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const YAML = require('yamljs');
const swaggerUi = require('swagger-ui-express');
const cors = require('cors');

dotenv.config(); // Load environment variables first

const app = express(); // ✅ Now 'app' is declared before use
const PORT = process.env.PORT || 3000;

// ✅ Enable CORS
app.use(cors());

// ✅ Middleware to parse JSON
app.use(express.json());

// ✅ Load Swagger YAML documentation
const swaggerDocument = YAML.load('./swagger.yaml');

// ✅ Serve Swagger UI at /api-docs
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

// ✅ Import routes
const bookRoutes = require('./routes/books');
const authorRoutes = require('./routes/authors');
const authRoutes = require('./routes/auth'); // ✅ Authentication

// ✅ Use routes
app.use('/api/books', bookRoutes);
app.use('/api/authors', authorRoutes);
app.use('/api/auth', authRoutes); // ✅ Login/Register

// ✅ Base route
app.get('/', (req, res) => {
  res.send('API is running!');
});

// ✅ Connect to MongoDB
mongoose.connect(process.env.MONGODB_URI)
  .then(() => {
    console.log('✅ Connected to MongoDB');
    app.listen(PORT, () => {
      console.log(`🚀 Server running on port ${PORT}`);
    });
  })
  .catch((err) => {
    console.error('❌ MongoDB connection error:', err);
  });
