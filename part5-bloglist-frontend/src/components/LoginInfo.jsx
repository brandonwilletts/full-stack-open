import { useSelector, useDispatch } from 'react-redux'
import { logout } from '../reducers/loggedInReducer'

const LoginInfo = () => {
	const dispatch = useDispatch()
	const loggedIn = useSelector(state => state.loggedIn)

	const handleLogout = () => {
		dispatch(logout())
	}

	return (
		<p>
			{loggedIn.name} logged in
			<button onClick={handleLogout}>logout</button>
		</p>
	)
}

export default LoginInfo