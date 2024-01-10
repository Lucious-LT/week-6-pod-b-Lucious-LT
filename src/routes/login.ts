import express from 'express';
import  handleUserLogin  from '../controller/login';
const router = express.Router();

// Route for user login
router.post('/login', handleUserLogin);

// Add more routes as needed

export default router;
