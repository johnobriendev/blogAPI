const Comment = require('../models/Comment');
const asyncHandler = require('express-async-handler');

// Create a new comment
exports.createComment = asyncHandler(async (req, res) => {
  const { content, author, post } = req.body;
  const comment = new Comment({ content, author, post });
  await comment.save();
  res.status(201).json(comment);
});

// Get all comments for a post
exports.getComments = asyncHandler(async (req, res) => {
  const { postId } = req.params;
  const comments = await Comment.find({ post: postId });
  res.json(comments);
});

// Delete a comment
exports.deleteComment = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const comment = await Comment.findByIdAndDelete(id);
  if (!comment) {
    res.status(404).json({ message: 'Comment not found' });
    return;
  }
  res.json({ message: 'Comment deleted' });
});