import { useState } from 'react'
import PropTypes from 'prop-types'

const LoginForm = ({ handleLogin }) => {
	const [username, setUsername] = useState('')
	const [password, setPassword] = useState('')

	const submitLogin = (event) => {
		event.preventDefault()
		handleLogin({
			username,
			password
		})
		setUsername('')
		setPassword('')
	}

	return (
		<form onSubmit={submitLogin} data-testid='loginForm'>
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

LoginForm.propTypes = {
	handleLogin: PropTypes.func.isRequired
}

export default LoginForm