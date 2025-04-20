import { useState, useEffect, useRef } from 'react'
import blogService from './services/blogs'
import loginService from './services/login'
import Blog from './components/Blog'
import BlogForm from './components/BlogForm'
import LoginForm from './components/LoginForm'
import Notification from './components/Notification'
import Togglable from './components/Togglable'

const App = () => {
	const [blogs, setBlogs] = useState([])
	const [user, setUser] = useState(null)
	const [notificationMessage, setNotificationMessage] = useState(null)
	const [notificationType, setNotificationType] = useState('success')

	useEffect(() => {
		blogService.getAll().then(blogs => {
			setBlogs(blogs)
		})
	}, [])

	useEffect(() => {
		const loggedUserJSON = window.localStorage.getItem('loggedBloglistUser')
		if (loggedUserJSON) {
			const user = JSON.parse(loggedUserJSON)
			setUser(user)
			blogService.setToken(user.token)
		}
	}, [])

	const showNotification = (message, type) => {
		setNotificationType(type)
		setNotificationMessage(message)
		setTimeout(() => {
			setNotificationMessage(null)
		}, 2000)
	}

	const handleLogin = async (credentials) => {
		try {
			const user = await loginService.login(credentials)
			window.localStorage.setItem('loggedBloglistUser', JSON.stringify(user))
			blogService.setToken(user.token)
			setUser(user)
			showNotification('Successfully logged in', 'success')
		} catch (error) {
			showNotification('Invalid username or password', 'error')
		}
	}

	const handleLogout = () => {
		window.localStorage.clear()
		setUser(null)
	}

	const addLike = async (id, newObject) => {
		try {
			await blogService.update(id, newObject)
			await blogService.getAll().then(blogs => {
				setBlogs(blogs)
			})
		} catch (error) {
			showNotification(error.message, 'error')
		}
	}

	const deleteBlog = async (id) => {
		try {
			await blogService.deleteBlog(id)
			setBlogs(blogs.filter(blog => blog.id !== id))
			showNotification('Successfully deleted', 'success')
		} catch (error) {
			showNotification(`Deletion failed: ${error.message}`, 'error')
		}
	}

	const addBlog = async (blogObject) => {
		blogFormRef.current.toggleVisibility()
		try {
			const returnedBlog = await blogService.create(blogObject)
			setBlogs(blogs.concat(returnedBlog))
			showNotification(`A new blog "${returnedBlog.title}" by ${returnedBlog.author} created`, 'success')
		} catch (error) {
			showNotification(`Create blog unsuccessful: ${error.message}`, 'error')
		}
	}

	const blogFormRef = useRef()

	return (
		<div>
			<h2>blogs</h2>
			<Notification message={notificationMessage} className={notificationType} />
			{!user &&
				<>
					<LoginForm
						handleLogin={handleLogin}
					/>
				</>
			}
			{user &&
				<>
					<p>
						{user.name} logged in
						<button onClick={handleLogout}>logout</button>
					</p>
					<Togglable
						buttonLabel="new blog"
						ref={blogFormRef}
					>
						<BlogForm
							createBlog={addBlog}
						/>
					</Togglable>
					<div data-testid='blogslist'>
						{blogs
							.sort((a, b) => b.likes - a.likes)
							.map(blog =>
								<Blog key={blog.id} blog={blog} addLike={addLike} deleteBlog={deleteBlog} user={user} />
							)}
					</div>
				</>
			}
		</div>
	)
}

export default App