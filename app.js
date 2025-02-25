import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import connectDB from './database/index.js';
// import User from './models/user.models.js';
import User from './models/user.models.js';

const app = express();
dotenv.config();

connectDB()
  .then(() => {
    app.listen(8000, () => {
      console.log("Server is running on port 8000");
    });
  })
  .catch((err) => {
    console.log("MongoDB connection failed", err);
  });

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.post('/register', async (req, res) => {
    try {
      const { name, email, mobileNo, } = req.body;
       const existingUser = await User.findOne({
        $or: [
          { email },
          { mobileNo },
        ]});

        if(existingUser){
            return res.status(400).json({
                message: 'User already exists'
            });
        }
        const user = await User.create({
        name,
        email, 
        mobileNo,
      } );
  
      res.status(201).json({
        message: 'User registered successfully',
        user
      });
  
    } catch (error) {
      console.error('Registration failed:', error.message);
      res.status(500).json({
        message: 'Registration failed',
        error: error.message
      });
    }
  });