import { createSlice } from '@reduxjs/toolkit'
import loginService from '../services/login'
import blogService from '../services/blogs'

const loggedInSlice = createSlice({
	name: 'loggedIn',
	initialState: null,
	reducers: {
		setLoggedIn(state, action) {
			return action.payload
		},
	}
})

export const login = (credentials) => {
	return async dispatch => {
		const user = await loginService.login(credentials)
		window.localStorage.setItem('loggedBloglistUser', JSON.stringify(user))
		blogService.setToken(user.token)
		dispatch(setLoggedIn(user))
	}
}

export const logout = () => {
	return dispatch => {
		window.localStorage.clear()
		dispatch(setLoggedIn(null))
	}
}

export const initializeLoggedIn = () => {
	return dispatch => {
		const loggedUserJSON = window.localStorage.getItem('loggedBloglistUser')
		if (loggedUserJSON) {
			const user = JSON.parse(loggedUserJSON)
			dispatch(setLoggedIn(user))
			blogService.setToken(user.token)
		}
	}
}

export const { setLoggedIn } = loggedInSlice.actions
export default loggedInSlice.reducer