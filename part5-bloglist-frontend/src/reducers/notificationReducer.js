import { createSlice } from '@reduxjs/toolkit'

const notificationSlice = createSlice({
	name: 'notifications',
	initialState: {
		message: null,
		type: null
	},
	reducers: {
		writeNotification(state, action) {
			return {
				message: action.payload.message,
				type: action.payload.type
			}
		},
		clearNotification() {
			return {
				message: null,
				type: null
			}
		},
	}
})

export const setNotification = (message, type) => {
	return dispatch => {
		dispatch(writeNotification({ message, type }))
		setTimeout(() => {
			dispatch(clearNotification())
		}, 5000)
	}
}

export const { writeNotification, clearNotification } = notificationSlice.actions
export default notificationSlice.reducer