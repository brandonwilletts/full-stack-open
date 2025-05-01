import { configureStore } from '@reduxjs/toolkit'
import notificationReducer from './reducers/notificationReducer'
import blogReducer from './reducers/blogReducer'
import loggedInReducer from './reducers/loggedInReducer'
import userReducer from './reducers/userReducer'

const store = configureStore({
	reducer: {
		notification: notificationReducer,
		blog: blogReducer,
		loggedIn: loggedInReducer,
		users: userReducer,
	}
})

export default store