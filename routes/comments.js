const express = require('express');
const router = express.Router();
const commentController = require('../controllers/commentController');
const { authenticate } = require('../middleware/auth');

// Create a new comment
router.post('/', commentController.createComment);

// Get all comments for a post
router.get('/post/:postId', commentController.getComments);

// Delete a comment (protected)
router.delete('/:id', authenticate, commentController.deleteComment);

module.exports = router;