import { useState } from 'react'
import { useDispatch } from 'react-redux'
import PropTypes from 'prop-types'
import { login } from '../reducers/loggedInReducer'
import { setNotification } from '../reducers/notificationReducer'

const LoginForm = () => {
	const [username, setUsername] = useState('')
	const [password, setPassword] = useState('')

	const dispatch = useDispatch()

	const resetFields = () => {
		setUsername('')
		setPassword('')
	}

	const handleLogin = async (event) => {
		event.preventDefault()
		const credentials = { username, password }
		try {
			dispatch(login(credentials))
			dispatch(setNotification('Successfully logged in', 'success'))
		} catch (error) {
			dispatch(setNotification('Invalid username or password', 'error'))
		}
		resetFields()
	}

	return (
		<form onSubmit={handleLogin} data-testid='loginForm'>
			<div>
				username:
				<input
					type="text"
					value={username}
					name="Username"
					data-testid='username'
					onChange={({ target }) => setUsername(target.value)}
				/>
			</div>
			<div>
				password:
				<input
					type="password"
					value={password}
					name="Password"
					data-testid='password'
					onChange={({ target }) => setPassword(target.value)}
				/>
			</div>
			<button type="submit">login</button>
		</form>
	)
}

LoginForm.displayName = 'LoginForm'

export default LoginForm