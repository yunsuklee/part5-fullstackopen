import React from 'react'
import Notification from './Notification'

const LoginForm = ({
  message,
  messageType,
  handleLogin,
  username,
  password,
  setUsername,
  setPassword
}) => (
  <div>
    <h2>log in to application</h2>
    <Notification
      message={message}
      messageType={messageType}
    />
    <form onSubmit={handleLogin}>
      <div>
        <label>username</label>
        <input
          type='text'
          value={username}
          name='username'
          onChange={({ target }) => setUsername(target.value)}
        />
      </div>
      <div>
        <label>password</label>
        <input
          type='password'
          value={password}
          name='password'
          onChange={({ target }) => setPassword(target.value)}
        />
      </div>
      <button type='submit'>login</button>
    </form>
  </div>
)

export default LoginForm