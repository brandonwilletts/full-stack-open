import { useState } from 'react'
import { useDispatch } from 'react-redux'
import { createBlog } from '../reducers/blogReducer'
import { setNotification } from '../reducers/notificationReducer'

const BlogForm = ({ toggleVisibility }) => {
	const [title, setTitle] = useState('')
	const [author, setAuthor] = useState('')
	const [url, setUrl] = useState('')

	const dispatch = useDispatch()

	const resetFields = () => {
		setTitle('')
		setAuthor('')
		setUrl('')
	}

	const handleCreateBlog = (event) => {
		event.preventDefault()
		try {
			dispatch(createBlog({ title, author, url }))
			dispatch(setNotification(`A new blog "${title}" by ${author} created`, 'success'))
		} catch (error) {
			dispatch(setNotification(`Create blog unsuccessful: ${error.message}`, 'error'))
		}
		resetFields()
		toggleVisibility()
	}

	return (
		<>
			<h2>create new</h2>
			<form onSubmit={handleCreateBlog}>
				<div>
					title:
					<input
						type="text"
						value={title}
						name="Title"
						data-testid='title'
						onChange={({ target }) => setTitle(target.value)}
					/>
				</div>
				<div>
					author:
					<input
						type="text"
						value={author}
						name="Author"
						data-testid='author'
						onChange={({ target }) => setAuthor(target.value)}
					/>
				</div>
				<div>
					url:
					<input
						type="text"
						value={url}
						name="URL"
						data-testid='url'
						onChange={({ target }) => setUrl(target.value)}
					/>
				</div>
				<button type="submit">create</button>
			</form>
		</>
	)
}

export default BlogForm