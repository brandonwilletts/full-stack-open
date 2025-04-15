import { useState, useEffect } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import loginService from './services/login'
import Notification from './components/Notification'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setURL] = useState('')
  const [notificationMessage, setNotificationMessage] = useState(null)
  const [notificationType, setNotificationType] = useState('success')

  useEffect(() => {
    blogService.getAll().then(blogs =>
      setBlogs( blogs )
    )  
  }, [blogs])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBloglistUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      blogService.setToken(user.token)
    }
  }, [])

  const showNotification = (message, type) => {
    setNotificationType(type)
    setNotificationMessage(message)
    setTimeout(() => {
      setNotificationMessage(null)
    }, 2000)
  }

  const handleLogin = async (event) => {
    event.preventDefault();
    try {
      const user = await loginService.login({username, password});
      window.localStorage.setItem('loggedBloglistUser', JSON.stringify(user))
      
      blogService.setToken(user.token)
      setUser(user)
      setUsername('')
      setPassword('')
      showNotification("Successfully logged in", 'success')
    } catch (error) {
      showNotification("Invalid username or password", 'error')
    }
  };

  const handleLogout = () => {
    window.localStorage.clear();
    setUser(null);
  }

  const handleCreate = async (event) => {
    event.preventDefault();
    try {
      const newBlog = {
        title,
        author,
        url
      }
      
      await blogService.create(newBlog);
      showNotification(`A new blog "${title}" by ${author} created`, 'success')
      
      setTitle('')
      setAuthor('')
      setURL('')
    } catch (error) {
      showNotification(`Create blog unsuccessful: ${error.message}`, 'error')
    }
  }

  const loginForm = () => {
    if (user === null) {
      return(
        <form onSubmit={handleLogin}>
          <div>
            username
              <input
              type="text"
              value={username}
              name="Username"
              onChange={({ target }) => setUsername(target.value)}
            />
          </div>
          <div>
            password
              <input
              type="password"
              value={password}
              name="Password"
              onChange={({ target }) => setPassword(target.value)}
            />
          </div>
          <button type="submit">login</button>
        </form>
      )
    } else {
      return (
        <div>
          <p>
            {user.name} logged in
            <button onClick={handleLogout}>logout</button>
          </p>
          <h2>create new</h2>
          <form onSubmit={handleCreate}>
          <div>
            title
              <input
              type="text"
              value={title}
              name="Title"
              onChange={({ target }) => setTitle(target.value)}
            />
          </div>
          <div>
            author
              <input
              type="text"
              value={author}
              name="Author"
              onChange={({ target }) => setAuthor(target.value)}
            />
          </div>
          <div>
            url
              <input
              type="text"
              value={url}
              name="URL"
              onChange={({ target }) => setURL(target.value)}
            />
          </div>
          <button type="submit">create</button>
        </form>
          {blogs.map(blog =>
            <Blog key={blog.id} blog={blog} />
          )}
        </div>
      )
    }
  }

  return (
    <div>
      <h2>blogs</h2>
      <Notification message={notificationMessage} className={notificationType}/>
      {loginForm()}
    </div>
  )
}

export default App