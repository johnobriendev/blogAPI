const express = require('express');
const router = express.Router();
const postController = require('../controllers/postController');
const { authenticate } = require('../middleware/auth');

// Create a new post (protected)
router.post('/', authenticate, postController.createPost);

// Get all posts
router.get('/', postController.getPosts);

//Get individual post
router.get('/:id', authenticate, postController.getPostById);

// Update a post (protected)
router.put('/:id', authenticate, postController.updatePost);

// Delete a post (protected)
router.delete('/:id', authenticate, postController.deletePost);

module.exports = router;
