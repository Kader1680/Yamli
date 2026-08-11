// messageRouter.js (Backend)
import express from 'express';
import Chat from '../model/Chat.js';
import User from '../model/User.js';
import Friend from '../model/Friend.js';
import { protect } from '../middlewares/auth.middmeware.js';
const router = express.Router();

router.post('/chat/:friendId', protect, async (req, res) => {
  try {
    const { sender, receiver, content } = req.body;

    
    
    if (!sender || !receiver || !content) {
      return res.status(400).json({ message: 'Missing required fields' });
    }
    
    const newMessage = new Chat({ sender, receiver, content });
    await newMessage.save();
    
    const response = {
      _id: newMessage._id,
      senderId: newMessage.sender,
      receiverId: newMessage.receiver,
      message: newMessage.content,
      createdAt: newMessage.createdAt
    };
    
    res.status(201).json(response);
  } catch (error) {
    console.error('Error in POST /chat/:friendId:', error);
    res.status(500).json({ message: 'Error sending message' });
  }
});

router.get('/chat/:friendId', protect, async (req, res) => {
  try {
    const userId = req.user._id;
    const friendId = req.params.friendId;

    // ✅ FIX: await + lean
    const friend = await User.findById(friendId)
      .select('username email')
      .lean();

    if (!friend) {
      return res.status(404).json({ message: 'Friend not found' });
    }

    const messages = await Chat.find({
      $or: [
        { sender: userId, receiver: friendId },
        { sender: friendId, receiver: userId }
      ]
    }).sort({ createdAt: 1 });

    res.json({
      friend,
      messages
    });
  } catch (err) {
    console.error('Error fetching messages:', err);
    res.status(500).json({ error: err.message });
  }
});


router.get('/chat', protect, async (req, res) => {
  try {
    console.log('Fetching users for request by user:', req.user?._id);
    const users = await User.find({ _id: { $ne: req.user._id } }).select('-password');
    res.json(users);
  } catch (err) {
    console.error('Error fetching users from DB:', err.message);
    res.status(500).json({ error: err.message });
  }
});

export default router;