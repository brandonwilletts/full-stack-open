const { test, after, beforeEach, describe } = require('node:test');
const assert = require('node:assert');
const mongoose = require('mongoose');
const supertest = require('supertest');
const app = require('../app');
const helper = require('./test_helper');
const bcrypt = require('bcrypt');
const User = require('../models/user');
const { application } = require('express');

const api = supertest(app);

describe('when there are some users saved initially', () => {
	beforeEach(async () => {
		await User.deleteMany({});
		const passwordHash = await bcrypt.hash('secret', 10);
		helper.initialUsers.forEach(async (userData) => {
			const user = new User({
				username: userData.username,
				name: userData.name,
				passwordHash: passwordHash,
			});
			await user.save();
		});
	});

	describe('addition of a new blog', async () => {
		test('succeeds with valid info', async () => {
			const usersAtStart = await helper.usersInDB();
			const newUser = {
				username: 'jimstevens',
				name: 'Jim Stevens',
				password: 'jimstevens123',
			};
			await api
				.post('/api/users')
				.send(newUser)
				.expect(201)
				.expect('Content-Type', /application\/json/);

			const usersAtEnd = await helper.usersInDB();
			const usernames = usersAtEnd.map(user => user.username);
			assert(usernames.includes(newUser.username));
			assert.strictEqual(usersAtEnd.length, usersAtStart.length + 1);

		});

		test('creation fails with proper statuscode and message if username already taken', async () => {
			const usersAtStart = await helper.usersInDB();
			const newUser = helper.initialUsers[0];
			const result = await api
				.post('/api/users')
				.send(newUser)
				.expect(400)
				.expect('Content-Type', /application\/json/);

			const usersAtEnd = await helper.usersInDB();
			assert(result.body.error.includes('expected `username` to be unique'));
			assert.strictEqual(usersAtEnd.length, usersAtStart.length);
		});

		test('creation fails with proper statuscode and message if password missing', async () => {
			const usersAtStart = await helper.usersInDB();
			const newUser = {
				username: helper.initialUsers[0].username
			};
			const result = await api
				.post('/api/users')
				.send(newUser)
				.expect(400)
				.expect('Content-Type', /application\/json/);

			const usersAtEnd = await helper.usersInDB();
			assert(result.body.error.includes('password missing'));
			assert.strictEqual(usersAtEnd.length, usersAtStart.length);
		});
	});

});

after(async () => {
	await mongoose.connection.close();
});