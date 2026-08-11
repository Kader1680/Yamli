import express from 'express';
import Post from '../model/Post.js';
import Like from '../model/Like.js';
import multer from 'multer';
import { protect } from '../middlewares/auth.middmeware.js';
import User from '../model/User.js';
const router = express.Router();



const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, 'uploads/'),
  filename: (req, file, cb) => {
    const uniqueName = `${Date.now()}-${file.originalname}`;
    cb(null, uniqueName);
  },
});

const upload = multer({ storage });

router.post('/post', protect, upload.single('image'), async (req, res) => {
  try {
    const newPost = new Post({
      content: req.body.content,
      media: req.file ? `/uploads/${req.file.filename}` : null,
      id_user: req.body.id_user,
    });

    await newPost.save();
    res.status(201).json({ status: 'success', post: newPost });
  } catch (err) {
    res.status(500).json({ status: 'error', message: err.message });
  }
});


router.get('/', async (req, res) => {
  try {
    const allPosts = await Post.find();
    const alllikes = await Like.find();

     
    const nameUser = await Promise.all(
    allPosts.map(async (post) => {
      const user = await User.findById(post.id_user).select('username');
        return user ? user.username : 'Unknown';
      })
    );


    const postsWithUsernames = allPosts.map((post, index) => ({
      ...post.toObject(),
      username: nameUser[index],
    }));  

 
     
    res.status(200).json({ posts: postsWithUsernames, likes: alllikes, nameUser: nameUser });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error fetching posts' });
  }
});



router.put('/post/:id', protect, upload.single('image'), async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    if (!post) return res.status(404).json({ message: 'Post not found' });

    post.content = req.body.content || post.content;
    if (req.file) {
      post.media = `/uploads/${req.file.filename}`;
    }

    await post.save();
    res.status(200).json({ message: 'Post updated', post });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

router.delete('/post/:id', protect, async (req, res) => {
  try {
    const post = await Post.findByIdAndDelete(req.params.id);
    if (!post) return res.status(404).json({ message: 'Post not found' });

    res.status(200).json({ message: 'Post deleted' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

router.post('/like', protect, async (req, res) => {
  try {
    const newLike = new Like({
      id_user: req.body.id_user,
      id_post: req.body.id_post,
    });

    await newLike.save();
    res.status(201).json({ status: 'success', like: newLike });
  } catch (err) {
    res.status(500).json({ status: 'error', message: err.message });
  }
});

export default router;
