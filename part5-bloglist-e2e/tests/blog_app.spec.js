const { test, expect, beforeEach, describe } = require('@playwright/test')
const { loginWith, createUser, createBlog } = require('./helper')

describe('Blog app', () => {
	beforeEach(async ({ page, request }) => {
		await request.post('/api/testing/reset')
		await createUser(request, 'billsimmons', 'Bill Simmons', 'billsimmons123')
		await page.goto('/')
	})

	test('Login form is shown', async ({ page }) => {
		const loginForm = page.getByTestId('loginForm')
		await expect(loginForm).toBeVisible()
	})

	describe('Login', () => {
		test('succeeds with correct credentials', async ({ page }) => {
			await loginWith(page, 'billsimmons', 'billsimmons123')
			const notification = page.getByTestId('notification')
			await expect(notification).toContainText('Successfully logged in')
		})

		test('fails with wrong credentials', async ({ page }) => {
			await loginWith(page, 'billsimmons', 'wrongpassword')
			const notification = page.getByTestId('notification')
			await expect(notification).toContainText('Invalid username or password')
		})
	})

	describe('When logged in', () => {
		beforeEach(async ({ page }) => {
			await loginWith(page, 'billsimmons', 'billsimmons123')
		})

		test('a new blog can be created', async ({ page }) => {
			await createBlog(page, 'test title', 'test author', 'test url')
			const blogslist = page.getByTestId('blogslist')
			await expect(blogslist).toContainText('test title')
			await expect(blogslist).toContainText('test author')
		})

		test('a new blog can be liked', async ({ page }) => {
			await createBlog(page, 'test title', 'test author', 'test url')

			await page.getByRole('button', { name: 'view' }).click()
			await page.getByRole('button', { name: 'like' }).click()

			const blogslist = page.getByTestId('blogslist')
			await expect(blogslist).toContainText('likes: 1')
		})

		test('a user who added the blog can delete the blog', async ({ page, request }) => {
			await createBlog(page, 'test title', 'test author', 'test url')

			await page.getByRole('button', { name: 'view' }).click()
			page.on('dialog', async dialog => {
				expect(dialog.message()).toContain('Remove blog "test title" by test author?')
				await dialog.accept()
			});
			await page.getByRole('button', { name: 'remove' }).click()
			await page.getByText('Successfully deleted').waitFor()

			const blogslist = page.getByTestId('blogslist')
			await expect(blogslist).not.toContainText('test title')
		})

		test('only the user who added the blog sees the blogs delete button', async ({ page, request }) => {
			await createBlog(page, 'test title', 'test author', 'test url')
			await page.getByRole('button', { name: 'view' }).click()
			await page.getByRole('button', { name: 'remove' }).isVisible()
			await page.getByRole('button', { name: 'logout' }).click()

			await createUser(request, 'jimstevens', 'Jim Stevens', 'jimstevens123')
			await loginWith(page, 'jimstevens', 'jimstevens123')
			await page.getByRole('button', { name: 'view' }).click()
			const blogslist = page.getByTestId('blogslist')
			await expect(blogslist).not.toContainText('remove')
		})

		test('the blogs are arranged in the order according to the likes', async ({ page }) => {
			await createBlog(page, 'test title', 'test author', 'test url')
			await createBlog(page, 'second title', 'second author', 'second url')

			const firstBlogBefore = page.locator('.blog').first()
			expect(firstBlogBefore).toContainText('test title')

			await page.getByRole('button', { name: 'view' }).nth(1).click()
			await page.getByRole('button', { name: 'like' }).click()
			await page.getByText('likes: 1').waitFor()

			const firstBlogAfter = page.locator('.blog').first()
			expect(firstBlogAfter).toContainText('second title')
		})
	})
})

