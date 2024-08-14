// import jwt from 'jsonwebtoken';
// import asyncHandler from 'express-async-handler';
// import User from '../models/userModel.js';

// const protect = asyncHandler(async (req, res, next) => {
//   let token;

//   token = req.cookies.jwt;

//   if (token) {
//     try {
//       const decoded = jwt.verify(token, process.env.JWT_SECRET);

//       req.user = await User.findById(decoded.userId).select('-password');

//       next();
//     } catch (error) {
//       console.error(error);
//       res.status(401);
//       throw new Error('Not authorized, token failed');
//     }
//   } else {
//     res.status(401);
//     throw new Error('Not authorized, no token');
//   }
// });

// export { protect };







import jwt from 'jsonwebtoken';
import asyncHandler from 'express-async-handler';
import User from '../models/userModel.js';

// Middleware to protect routes
const protect = asyncHandler(async (req, res, next) => {
  let token;

  // Check if token is in cookies
  token = req.cookies.jwt;

  if (token) {
    try {
      // Verify the token
      const decoded = jwt.verify(token, process.env.JWT_SECRET);

      // Attach user to request object
      req.user = await User.findById(decoded.userId).select('-password');

      next();
    } catch (error) {
      console.error('Token verification failed:', error);
      res.status(401).json({ message: 'Not authorized, token failed' });
    }
  } else {
    res.status(401).json({ message: 'Not authorized, no token' });
  }
});

export { protect };


