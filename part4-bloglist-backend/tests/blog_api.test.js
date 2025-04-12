const { test, after, beforeEach, describe } = require('node:test');
const assert = require('node:assert');
const mongoose = require('mongoose');
const supertest = require('supertest');
const app = require('../app');
const helper = require('./test_helper');
const Blog = require('../models/blog');
const { application } = require('express');

const api = supertest(app);

describe('when there are some blogs saved initially', () => {
  beforeEach(async () => {
    await Blog.deleteMany({});
    await Blog.insertMany(helper.initialBlogs);
  });

  test('blogs are returned as json', async () => {
    await api
      .get('/api/blogs')
      .expect(200)
      .expect('Content-Type', /application\/json/);
  });

  test('the correct amount of blog posts are returned', async () => {
    const response = await api.get('/api/blogs');
    assert.strictEqual(response.body.length, helper.initialBlogs.length);
  });

  test('blogs are identified by id not _id', async () => {
    const response = await api.get('/api/blogs');
    const blog1 = response.body[0];
    assert(!blog1._id);
    assert(blog1.id);
  });

  describe('addition of a new blog', async () => {
    test('succeeds with valid info', async () => {
      const newBlog = {
        title: 'The annexation of Puerto Rico',
        author: 'James Earl Jones',
        url: 'http://www.google.com',
        likes: 16,
      };
      await api
        .post('/api/blogs')
        .send(newBlog)
        .expect(201)
        .expect('Content-Type', /application\/json/);

      const response = await api.get('/api/blogs');
      const titles = response.body.map(r => r.title);
      assert.strictEqual(response.body.length, helper.initialBlogs.length + 1);
      assert(titles.includes(newBlog.title));
    });

    test('with missing likes property will default to 0', async () => {
      const newBlog = {
        title: 'The annexation of Puerto Rico',
        author: 'James Earl Jones',
        url: 'http://www.google.com',
      };
      await api
        .post('/api/blogs')
        .send(newBlog)
        .expect(201)
        .expect('Content-Type', /application\/json/);

      const response = await api.get('/api/blogs');
      const newBlogLikes = response.body.find(e => e.title === newBlog.title).likes;
      assert.strictEqual(newBlogLikes, 0);
    });

    test('fails with statuscode 400 if title is missing', async () => {
      const newBlog = {
        author: 'James Earl Jones',
        url: 'http://www.google.com',
      };
      await api
        .post('/api/blogs')
        .send(newBlog)
        .expect(400);

      const response = await api.get('/api/blogs');
      assert.strictEqual(response.body.length, helper.initialBlogs.length);
    });

    test('fails with statuscode 400 if url is missing', async () => {
      const newBlog = {
        title: 'The annexation of Puerto Rico',
        author: 'James Earl Jones',
      };
      await api
        .post('/api/blogs')
        .send(newBlog)
        .expect(400);

      const response = await api.get('/api/blogs');
      assert.strictEqual(response.body.length, helper.initialBlogs.length);
    });
  });

  describe('deletion of a blog', async () => {
    test('succeeds with status code 204 if id is valid', async () => {
      const blogs = await api.get('/api/blogs');
      const blogToDelete = blogs.body[0];
      await api
        .delete(`/api/blogs/${blogToDelete.id}`)
        .expect(204);

      const response = await api.get('/api/blogs');
      console.log(response.body.length);
      assert.strictEqual(response.body.length, helper.initialBlogs.length - 1);

      const titles = response.body.map(r => r.title);
      assert(!titles.includes(blogToDelete.title));
    });

    test('fails with status code 400 if id is invalid', async () => {
      await api
        .delete('/api/blogs/invalid_id')
        .expect(400);

      const response = await api.get('/api/blogs');
      console.log(response.body.length);
      assert.strictEqual(response.body.length, helper.initialBlogs.length);
    });
  });

  describe('update of a blog', async () => {
    test('succeeds if id is valid', async () => {
      const blogs = await api.get('/api/blogs');
      const blogToUpdate = blogs.body[0];
      const attributesToUpdate = {
        likes: 78
      };

      await api
        .put(`/api/blogs/${blogToUpdate.id}`)
        .send(attributesToUpdate)
        .expect(200);

      const updatedBlog = await api.get(`/api/blogs/${blogToUpdate.id}`);
      assert.strictEqual(updatedBlog.body.likes, attributesToUpdate.likes);
    });

    test('fails with status code 400 if id is invalid', async () => {
      const blogToUpdate = { id: 'invalid_id' };
      const attributesToUpdate = {
        likes: 78
      };

      await api
        .put(`/api/blogs/${blogToUpdate.id}`)
        .send(attributesToUpdate)
        .expect(400);
    });
  });
});

after(async () => {
  await mongoose.connection.close();
});