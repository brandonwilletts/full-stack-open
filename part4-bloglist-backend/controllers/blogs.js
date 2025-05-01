const blogsRouter = require('express').Router();
const Blog = require('../models/blog');
const middleware = require('../utils/middleware');
const User = require('../models/user');

blogsRouter.get('/', async (request, response) => {
	const blogs = await Blog.find({}).populate('user');
	response.json(blogs);
});

blogsRouter.get('/:id', async (request, response) => {
	const blog = await Blog.findById(request.params.id);
	if (blog) {
		response.json(blog);
	} else {
		response.status(404).end();
	}
});

blogsRouter.post('/', middleware.userExtractor, async (request, response) => {
	const blog = new Blog(request.body);
	const user = request.user;
	blog.user = user;
	const savedBlog = await blog.save();
	user.blogs = user.blogs.concat(savedBlog._id);
	await user.save();
	response.status(201).json(savedBlog);
});


blogsRouter.post('/:id/comments', async (request, response) => {
	const blog = await Blog.findById(request.params.id);
	if (blog) {
		blog.comments = blog.comments.concat(request.body.comment);
		await blog.save();
		response.json(blog);
	} else {
		response.status(404).end();
	}
});

blogsRouter.delete('/:id', middleware.userExtractor, async (request, response) => {
	const user = request.user;
	const blogToDelete = await Blog.findById(request.params.id);
	if (blogToDelete.user.toString() !== user._id.toString()) {
		return response.status(401).json({ error: 'invalid user' });
	}
	await Blog.deleteOne(blogToDelete);
	user.blogs = user.blogs.filter(blog => blog._id !== blogToDelete._id);
	await user.save();
	response.status(204).end();
});

blogsRouter.put('/:id', async (request, response) => {
	const blog = {
		title: request.body.title,
		author: request.body.author,
		url: request.body.url,
		likes: request.body.likes,
	};
	const updatedBlog = await Blog.findByIdAndUpdate(request.params.id, blog, { new: true });
	updatedBlog.user = await User.findById(request.body.user.id);
	response.json(updatedBlog);
});

module.exports = blogsRouter;