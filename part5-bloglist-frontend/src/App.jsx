import BlogForm from './components/BlogForm'
import LoginForm from './components/LoginForm'
import Notification from './components/Notification'
import Togglable from './components/Togglable'
import BlogList from './components/BlogList'
import UserList from './components/UserList'
import User from './components/User'
import Blog from './components/Blog'

import { useEffect, useRef } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { initializeBlogs } from './reducers/blogReducer'
import { initializeLoggedIn } from './reducers/loggedInReducer'
import { initializeUsers } from './reducers/userReducer'

import { BrowserRouter as Router, Routes, Route, Link, useMatch, useNavigate } from 'react-router-dom'
import Menu from './components/Menu'

const App = () => {
	const dispatch = useDispatch()
	const blogFormRef = useRef()
	const loggedIn = useSelector(state => state.loggedIn)

	useEffect(() => {
		dispatch(initializeBlogs())
	}, [dispatch])

	useEffect(() => {
		dispatch(initializeLoggedIn())
	}, [dispatch])

	useEffect(() => {
		dispatch(initializeUsers())
	}, [dispatch])


	const toggleVisibility = () => {
		blogFormRef.current.toggleVisibility()
	}

	const Home = () => {
		return (
			<>
				<Togglable buttonLabel="new blog" ref={blogFormRef}>
					<BlogForm toggleVisibility={toggleVisibility} />
				</Togglable>
				< BlogList />
			</>
		)
	}

	return (
		<div>
			<h2>blogs</h2>
			<Notification />
			{!loggedIn && <LoginForm />}
			{loggedIn &&
				<>
					<Menu />
					<Routes>
						<Route path='/' element={Home()} />
						<Route path='/users' element={<UserList />} />
						<Route path='/users/:id' element={<User />} />
						<Route path='/blogs/:id' element={<Blog />} />
					</Routes>
				</>
			}
		</div>
	)
}

export default App