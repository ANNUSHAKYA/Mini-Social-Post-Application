const express = require('express');
const router = express.Router();
const {
  createPost,
  getPosts,
  toggleLikePost,
  commentPost,
} = require('../controllers/postController');
const { protect } = require('../middleware/authMiddleware');

router.route('/')
  .get(getPosts)
  .post(protect, createPost);

router.post('/:id/like', protect, toggleLikePost);
router.post('/:id/comment', protect, commentPost);

module.exports = router;
