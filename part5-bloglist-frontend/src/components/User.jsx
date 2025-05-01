import { BrowserRouter as Router, Routes, Route, Link, useMatch, useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux'

const User = () => {
	const match = useMatch('/users/:id')
	const users = useSelector(state => state.users)

	const user = match
		? users.find(user => user.id === String(match.params.id))
		: null

	if (!user) {
		return null
	}

	return (
		<div>
			<h2>{user.name}</h2>
			<h3>added blogs</h3>
			{user.blogs.map(blog =>
				<li key={blog.id}>{blog.title}</li>
			)}
		</div>
	)
}

export default User