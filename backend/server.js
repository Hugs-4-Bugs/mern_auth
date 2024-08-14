// import path from 'path';
// import express from 'express';
// import dotenv from 'dotenv';
// dotenv.config();
// import connectDB from './config/db.js';
// import cookieParser from 'cookie-parser';
// import { notFound, errorHandler } from './middleware/errorMiddleware.js';
// import userRoutes from './routes/userRoutes.js';

// const port = process.env.PORT || 5000;

// connectDB();

// const app = express();

// app.use(express.json());
// app.use(express.urlencoded({ extended: true }));

// app.use(cookieParser());

// app.use('/api/users', userRoutes);

// if (process.env.NODE_ENV === 'production') {
//   const __dirname = path.resolve();
//   app.use(express.static(path.join(__dirname, '/frontend/dist')));

//   app.get('*', (req, res) =>
//     res.sendFile(path.resolve(__dirname, 'frontend', 'dist', 'index.html'))
//   );
// } else {
//   app.get('/', (req, res) => {
//     res.send('API is running....');
//   });
// }

// app.use(notFound);
// app.use(errorHandler);

// app.listen(port, () => console.log(`Server started on port ${port}`));


























import path from 'path';
import express from 'express';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import { connectDB } from './config/db.js'; // Updated to named import
import cookieParser from 'cookie-parser';
import { notFound, errorHandler } from './middleware/errorMiddleware.js';
import userRoutes from './routes/userRoutes.js';

// Load environment variables from .env file
dotenv.config();
console.log('MongoDB URI:', process.env.MONGODB_URI); // Debugging line
console.log('Environment Variables:', process.env);

const port = process.env.PORT || 5009;

// Connect to MongoDB
connectDB();

// Configure Mongoose to avoid deprecation warning
mongoose.set('strictQuery', false); // or true based on your preference

const app = express();

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser()); // Include cookieParser middleware

// API routes
app.use('/api/users', userRoutes);

// Serve static files in production
if (process.env.NODE_ENV === 'production') {
  const __dirname = path.resolve(); // Ensure compatibility with ES Modules
  app.use(express.static(path.join(__dirname, '/frontend/dist')));

  app.get('*', (req, res) =>
    res.sendFile(path.resolve(__dirname, 'frontend', 'dist', 'index.html'))
  );
} else {
  app.get('/', (req, res) => {
    res.send('API is running....');
  });
}

// Error handling middleware
app.use(notFound);
app.use(errorHandler);

// Start server
app.listen(port, () => console.log(`Server started on port ${port}`));
