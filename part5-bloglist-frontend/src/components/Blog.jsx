import { updateBlog, deleteBlog, postComment } from '../reducers/blogReducer'
import { setNotification } from '../reducers/notificationReducer'
import { useDispatch, useSelector } from 'react-redux'
import { BrowserRouter as Router, Routes, Route, Link, useMatch, useNavigate } from 'react-router-dom'
import { useState } from 'react'

const Blog = () => {
	const user = useSelector(state => state.loggedIn)
	const dispatch = useDispatch()
	const navigate = useNavigate()

	const match = useMatch('/blogs/:id')
	const blogs = useSelector(state => state.blog)

	const [newComment, setNewComment] = useState('')

	const blog = match
		? blogs.find(blog => blog.id === String(match.params.id))
		: null

	if (!blog) {
		return null
	}

	const handleLike = () => {
		const newLikes = blog.likes + 1
		const blogToUpdate = {
			...blog,
			likes: newLikes,
		}
		dispatch(updateBlog(blogToUpdate))
	}

	const handleDelete = () => {
		if (window.confirm(`Remove blog "${blog.title}" by ${blog.author}?`)) {
			try {
				dispatch(deleteBlog(blog.id))
				dispatch(setNotification('Successfully deleted', 'success'))
			} catch (error) {
				dispatch(setNotification(`Deletion failed: ${error.message}`, 'error'))
			}
			navigate('/')
		}
	}

	const deleteButton = () => {
		return <button onClick={handleDelete}>remove</button>
	}

	const handleCreateComment = (event) => {
		event.preventDefault()
		dispatch(postComment(blog.id, newComment))
		setNewComment('')
	}

	return (
		<div className='blog'>
			<h2>{blog.title} by {blog.author}</h2>
			<div>
				<div><a href={`http://${blog.url}`}>{blog.url}</a></div>
				<div>
					likes: {blog.likes}
					<button onClick={handleLike}>like</button></div>
				<div>added by {blog.user.name}</div>
				{blog.user.username === user.username && deleteButton()}
			</div>
			<h3>comments</h3>
			<form onSubmit={handleCreateComment}>
				<input
					type="text"
					value={newComment}
					name="Comment"
					data-testid='comment'
					onChange={({ target }) => setNewComment(target.value)}
				/>
				<button type="submit">add comment</button>
			</form>
			{blog.comments.map(comment =>
				<li key={comment}>{comment}</li>
			)}
		</div>
	)
}

export default Blog