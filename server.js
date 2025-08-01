const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const YAML = require('yamljs');
const swaggerUi = require('swagger-ui-express');

const app = express();
const PORT = process.env.PORT || 3000;

// ✅ Load environment variables
dotenv.config();

// ✅ Middleware to parse JSON
app.use(express.json());

// ✅ Load Swagger YAML documentation
const swaggerDocument = YAML.load('./swagger.yaml');

// ✅ Serve Swagger UI at /api-docs
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

// ✅ Import routes
const bookRoutes = require('./routes/books');
const authorRoutes = require('./routes/authors');

// ✅ Base route
app.get('/', (req, res) => {
  res.send('API is running!');
});

// ✅ Use routes
app.use('/api/books', bookRoutes);
app.use('/api/authors', authorRoutes);

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
