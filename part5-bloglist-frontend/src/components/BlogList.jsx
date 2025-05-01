import { useSelector } from 'react-redux'
import { BrowserRouter as Router, Routes, Route, Link, useMatch, useNavigate } from 'react-router-dom'

const BlogList = () => {
	const blogs = useSelector(state => state.blog)

	const blogStyle = {
		paddingTop: 10,
		paddingLeft: 2,
		border: 'solid',
		borderWidth: 1,
		marginBottom: 5
	}

	return (
		<div data-testid='blogslist'>
			{blogs
				//.sort((a, b) => b.likes - a.likes)
				.map(blog =>
					<div key={blog.id} style={blogStyle}>
						<Link to={`/blogs/${blog.id}`}>{blog.title}</Link>
					</div>
				)
			}
		</div >
	)
}

export default BlogList