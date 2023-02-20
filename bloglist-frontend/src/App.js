import React, { useState, useEffect } from 'react'
import Login from './components/Login'
import BlogList from './components/BlogList'
import blogService from './services/blogs'
import loginService from './services/login'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [user, setUser] = useState(null)
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setUrl] = useState('')
  const [message, setMessage] = useState('')
  const [messageType, setMessageType] = useState('')

  useEffect(() => {
    blogService.getAll().then(blogs =>
      setBlogs(blogs)
    )
  }, [])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogAppUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      blogService.setToken(user.token)
    }
  }, [])

  const handleLogin = async (event) => {
    event.preventDefault()

    try {
      const user = await loginService.login({
        username, password
      })

      window.localStorage.setItem(
        'loggedBlogAppUser', JSON.stringify(user)
      )

      blogService.setToken(user.token)
      setUser(user)
      setUsername('')
      setPassword('')

      setMessageType('success')
      setMessage(`Welcome back ${user.username}!`)

      setTimeout(() => {
        setMessage('')
        setMessageType('')
      }, 5000)

    } catch(exception) {
      setMessageType('error')
      setMessage('Wrong username or password')

      setTimeout(() => {
        setMessage('')
        setMessageType('')
      }, 5000)
    }
  }

  const handleSubmit = async (event) => {
    event.preventDefault()
    const blogObject = {
      title: title,
      author: author,
      url: url
    }

    try {
      await blogService.create(blogObject)
      const blogs = await blogService.getAll()

      setBlogs(blogs)
      setMessageType('success')
      setMessage(`A new blog ${title} by ${author}`)

      setTitle('')
      setAuthor('')
      setUrl('')

      setTimeout(() => {
        setMessage('')
        setMessageType('')
      }, 5000)

    } catch(exception) {
      setMessageType('error')
      setMessage('Something went wrong, please try again later')

      setTimeout(() => {
        setMessage('')
        setMessageType('')
      }, 5000)
    }
  }

  return (
    <div>
      {!user &&
      <Login
        username={username}
        password={password}
        setUsername={setUsername}
        setPassword={setPassword}
        handleLogin={handleLogin}
        message={message}
        messageType={messageType}
      />}
      {user &&
        <div>
          <BlogList
            blogs={blogs}
            user={user}
            setUser={setUser}
            title={title}
            author={author}
            url={url}
            setTitle={setTitle}
            setAuthor={setAuthor}
            setUrl={setUrl}
            handleSubmit={handleSubmit}
            message={message}
            messageType={messageType}
          />
        </div>
      }
    </div>
  )
}

export default App