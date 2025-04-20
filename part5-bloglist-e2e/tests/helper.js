const loginWith = async (page, username, password) => {
	await page.getByTestId('username').fill(username)
	await page.getByTestId('password').fill(password)
	await page.getByRole('button', { name: 'login' }).click()
}

const createUser = async (request, username, name, password) => {
	await request.post('/api/users', {
		data: {
			username,
			name,
			password
		}
	})
}

const createBlog = async (page, title, author, url) => {
	await page.getByRole('button', { name: 'new blog' }).click()
	await page.getByTestId('title').fill(title)
	await page.getByTestId('author').fill(author)
	await page.getByTestId('url').fill(url)
	await page.getByRole('button', { name: 'create' }).click()
	await page.getByText(`A new blog "${title}" by ${author} created`).waitFor()
}

export { loginWith, createUser, createBlog }