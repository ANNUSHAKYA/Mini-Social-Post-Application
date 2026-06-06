const express = require('express');
const router = express.Router();
const { registerUser, loginUser, getMe, updatePoints, getLeaderboard } = require('../controllers/authController');
const { protect } = require('../middleware/authMiddleware');

router.post('/signup', registerUser);
router.post('/login', loginUser);
router.get('/me', protect, getMe);
router.put('/points', protect, updatePoints);
router.get('/leaderboard', getLeaderboard);

module.exports = router;
