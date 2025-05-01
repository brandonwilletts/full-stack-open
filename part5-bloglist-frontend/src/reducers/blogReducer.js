import { createSlice } from '@reduxjs/toolkit'
import blogService from '../services/blogs'

const blogSlice = createSlice({
	name: 'blogs',
	initialState: [],
	reducers: {
		setBlogs(state, action) {
			return action.payload
		},
		appendBlog(state, action) {
			state.push(action.payload)
		},
		removeBlog(state, action) {
			const id = action.payload
			return state.filter(blog => blog.id !== id)
		},
		modifyBlog(state, action) {
			const modifiedBlog = action.payload
			return state.map(blog =>
				blog.id !== modifiedBlog.id ? blog : modifiedBlog
			)
		},
	}
})

export const initializeBlogs = () => {
	return async dispatch => {
		const blogs = await blogService.getAll()
		dispatch(setBlogs(blogs))
	}
}

export const createBlog = (blogObject) => {
	return async dispatch => {
		const newBlog = await blogService.create(blogObject)
		dispatch(appendBlog(newBlog))
	}
}

export const deleteBlog = (id) => {
	return async dispatch => {
		await blogService.deleteBlog(id)
		dispatch(removeBlog(id))
	}
}

export const updateBlog = (blogObject) => {
	return async dispatch => {
		const updatedBlog = await blogService.update(blogObject)
		dispatch(modifyBlog(updatedBlog))
	}
}

export const postComment = (id, comment) => {
	return async dispatch => {
		const updatedBlog = await blogService.postComment(id, comment)
		dispatch(modifyBlog(updatedBlog))
	}
}

export const { setBlogs, appendBlog, removeBlog, modifyBlog } = blogSlice.actions
export default blogSlice.reducer