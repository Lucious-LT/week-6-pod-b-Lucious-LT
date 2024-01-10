import express from 'express';
import mongoose from 'mongoose';
import router from './signup';





// Middleware
// app.use(express.json());

// Connect to MongoDB if MONGODB_URI is defined
const app = express();

if (process.env.MONGODB_URI) {
  const options = { useUnifiedTopology: true };
  mongoose.connect(process.env.MONGODB_URI)
    .then(() => {
      console.log('Connected to MongoDB');
    })
    .catch((error) => {
      console.error('Failed to connect to MongoDB:', error);
    });
}

// Load routes
app.use('/api/books', router);

// Start the server



