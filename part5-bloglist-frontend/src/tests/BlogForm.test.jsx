import React from 'react'
import '@testing-library/jest-dom'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import BlogForm from '../components/BlogForm'

test('form calls the event handler with the right details when a new blog is created', async () => {
	const user = userEvent.setup()
	const createBlog = vi.fn()

	const { container } = render(<BlogForm createBlog={(createBlog)} />)

	const titleInput = container.querySelector('input[name="Title"]')
	const authorInput = container.querySelector('input[name="Author"]')
	const urlInput = container.querySelector('input[name="URL"]')
	const submitButton = screen.getByText('create')

	await user.type(titleInput, 'test title')
	await user.type(authorInput, 'test author')
	await user.type(urlInput, 'test url')
	await user.click(submitButton)

	expect(createBlog.mock.calls[0][0].title).toBe('test title')
	expect(createBlog.mock.calls[0][0].author).toBe('test author')
	expect(createBlog.mock.calls[0][0].url).toBe('test url')
	expect(createBlog.mock.calls).toHaveLength(1)
})