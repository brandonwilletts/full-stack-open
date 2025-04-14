const blogsRouter = require('express').Router();
const Blog = require('../models/blog');
const middleware = require('../utils/middleware');

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

blogsRouter.post('/', middleware.userExtractor, async (request, response,) => {
	const user = request.user;
	const blog = new Blog(request.body);
	blog.user = user._id;
	const savedBlog = await blog.save();
	response.status(201).json(savedBlog);
});

blogsRouter.delete('/:id', middleware.userExtractor, async (request, response) => {
	const user = request.user;
	const blog = await Blog.findById(request.params.id);
	if (blog.user.toString() !== user._id.toString()) {
		return response.status(401).json({ error: 'invalid user' });
	}

	await Blog.deleteOne(blog);
	response.status(204).end();
});

blogsRouter.put('/:id', async (request, response) => {
	const blog = {
		id: request.body.id,
		title: request.body.title,
		author: request.body.author,
		url: request.body.url,
		likes: request.body.likes,
		user: request.body.user
	};
	const updatedBlog = await Blog.findByIdAndUpdate(request.params.id, blog, { new: true });
	response.json(updatedBlog);
});

module.exports = blogsRouter;