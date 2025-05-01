import { BrowserRouter as Router, Routes, Route, Link, useMatch, useNavigate } from 'react-router-dom'
import LoginInfo from './LoginInfo'

const Menu = () => {
	const padding = {
		paddingRight: 5
	}
	const menuStyle = {
		backgroundColor: 'lightgrey'
	}
	return (
		<div style={menuStyle}>
			<Link to='/' style={padding}>blogs</Link>
			<Link to='/users/' style={padding}>users</Link>
			<LoginInfo />
		</div>
	)
}

export default Menu