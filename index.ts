import express from 'express';
import mongoose from 'mongoose';
const router = express.Router();

const app = express();
const PORT = process.env.PORT || 4001;

// Middleware
app.use(express.json());

// Connect to MongoDB
mongoose.connect(process.env.MONGODB_URI!)

// Load routes
app.use('/api/Auth', router);

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
