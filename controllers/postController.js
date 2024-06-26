const Post = require('../models/Post');
const asyncHandler = require('express-async-handler');

// Create a new post
exports.createPost = asyncHandler(async (req, res) => {
  const { title, content, author } = req.body;
  const post = new Post({ title, content, author });
  await post.save();
  res.status(201).json(post);
});

// Get all posts
exports.getPosts = asyncHandler(async (req, res) => {
  const posts = await Post.find().populate('author');
  res.json(posts);
});

//Get one post
exports.getPostById = async (req, res) => {
  try {
    const post = await Post.findById(req.params.id).populate('author', 'username');
    if (!post) {
      return res.status(404).json({ message: 'Post not found' });
    }
    res.status(200).json(post);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Update a post
exports.updatePost = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const { title, content, published } = req.body;
  const post = await Post.findByIdAndUpdate(id, { title, content, published }, { new: true });
  if (!post) {
    res.status(404).json({ message: 'Post not found' });
    return;
  }
  res.json(post);
});

// Delete a post
exports.deletePost = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const post = await Post.findByIdAndDelete(id);
  if (!post) {
    res.status(404).json({ message: 'Post not found' });
    return;
  }
  res.json({ message: 'Post deleted' });
});