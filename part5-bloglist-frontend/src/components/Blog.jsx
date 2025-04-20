import { useState } from 'react'

const Blog = ({ blog, addLike, deleteBlog, user }) => {
	const [visible, setVisible] = useState(false)
	const [buttonLabel, setButtonLabel] = useState('view')

	const hideWhenVisible = { display: visible ? 'none' : '' }
	const showWhenVisible = { display: visible ? '' : 'none' }

	const toggleVisibility = () => {
		setVisible(!visible)
		setButtonLabel(visible ? 'view' : 'hide')
	}

	const handleLike = () => {
		const newLikes = blog.likes + 1
		const newBlog = {
			title: blog.title,
			author: blog.author,
			url: blog.url,
			likes: newLikes,
			user: blog.user.id
		}
		addLike(blog.id, newBlog)
	}

	const handleDelete = () => {
		if (window.confirm(`Remove blog "${blog.title}" by ${blog.author}?`)) {
			deleteBlog(blog.id)
		}
	}

	const deleteButton = () => {
		return <button onClick={handleDelete}>remove</button>
	}

	const blogStyle = {
		paddingTop: 10,
		paddingLeft: 2,
		border: 'solid',
		borderWidth: 1,
		marginBottom: 5
	}

	return (
		<div className='blog' style={blogStyle}>
			<div>
				{blog.title} {blog.author}
				<button onClick={toggleVisibility}>{buttonLabel}</button>
			</div>
			<div style={showWhenVisible}>
				<div>{blog.url}</div>
				<div>
					likes: {blog.likes}
					<button onClick={handleLike}>like</button></div>
				<div>{blog.user.name}</div>
				{blog.user.username === user.username && deleteButton()}
			</div>
		</div>
	)
}

export default Blog