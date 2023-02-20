import React, { useState, useEffect } from 'react'
import LoginForm from './components/LoginForm'
import BlogList from './components/BlogList'
import loginService from './services/login'
import blogService from './services/blogs'

const App = () => {
  const [message, setMessage] = useState('')
  const [messageType, setMessageType] = useState('')

  const [user, setUser] = useState(null)
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

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

  return (
    <div>
      {!user &&
      <LoginForm
        username={username}
        password={password}
        setUsername={setUsername}
        setPassword={setPassword}
        handleLogin={handleLogin}
        message={message}
        messageType={messageType}
      />}
      {user &&
        <BlogList
          user={user}
          setUser={setUser}
          message={message}
          setMessage={setMessage}
          messageType={messageType}
          setMessageType={setMessageType}
        />
      }
    </div>
  )
}

export default App