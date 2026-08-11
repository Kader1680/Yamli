import { verifyToken } from '../utils/jwt.js';
import * as userRepository from '../repositories/user.repository.js';
import { sanitizeUser } from '../utils/user.js';

export const protect = async (req, res, next) => {
  try {
    let token;

    if (req.cookies?.token) {
      token = req.cookies.token;
    } else if (req.headers.authorization?.startsWith('Bearer ')) {
      token = req.headers.authorization.split(' ')[1];
    }

    if (!token) {
      return res.status(401).json({
        status: 'fail',
        message: 'You are not logged in.',
      });
    }

    const decoded = verifyToken(token);
    const user = await userRepository.findById(decoded.id);

    if (!user) {
      return res.status(401).json({
        status: 'fail',
        message: 'User no longer exists.',
      });
    }

    req.user = sanitizeUser(user);
    next();
  } catch (error) {
    return res.status(401).json({
      status: 'fail',
      message: 'Invalid or expired token.',
    });
  }
};