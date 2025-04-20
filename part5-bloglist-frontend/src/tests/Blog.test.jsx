import React from 'react'
import '@testing-library/jest-dom'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import Blog from '../components/Blog'


test('renders blog title and author but not URL or likes by default', () => {
	//create component
	const blog = {
		title: 'Blog component testing',
		author: 'James Smith',
		url: 'www.google.com',
		likes: 50,
		user: {
			username: 'stevejenkins',
			name: 'Steve Jenkins'
		}
	}
	const currentUser = {
		username: 'stevejenkins',
		name: 'Steve Jenkins'
	}

	//render component
	render(<Blog blog={blog} user={currentUser} />)

	//select rendered component
	const title = screen.getByText(blog.title, { exact: false })
	const author = screen.getByText(blog.author, { exact: false })
	const url = screen.getByText(blog.url, { exact: false })
	const likes = screen.getByText(blog.likes, { exact: false })

	//test rendered component
	expect(title).toBeVisible()
	expect(author).toBeVisible()
	expect(url).not.toBeVisible()
	expect(likes).not.toBeVisible()
})

test('renders blog URL and likes when view button clicked', async () => {
	const blog = {
		title: 'Blog component testing',
		author: 'James Smith',
		url: 'www.google.com',
		likes: 50,
		user: {
			username: 'stevejenkins',
			name: 'Steve Jenkins'
		}
	}
	const currentUser = {
		username: 'stevejenkins',
		name: 'Steve Jenkins'
	}
	render(<Blog blog={blog} user={currentUser} />)

	const user = userEvent.setup()
	const button = screen.getByText('view')
	await user.click(button)

	const url = screen.getByText(blog.url, { exact: false })
	const likes = screen.getByText(blog.likes, { exact: false })

	expect(url).toBeVisible()
	expect(likes).toBeVisible()
})