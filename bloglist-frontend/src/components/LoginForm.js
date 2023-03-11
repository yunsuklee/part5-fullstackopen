import React from 'react'
import Notification from './Notification'
import PropTypes from 'prop-types'

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
          id='username'
          type='text'
          value={username}
          name='username'
          onChange={({ target }) => setUsername(target.value)}
        />
      </div>
      <div>
        <label>password</label>
        <input
          id='password'
          type='password'
          value={password}
          name='password'
          onChange={({ target }) => setPassword(target.value)}
        />
      </div>
      <button
        id='submit'
        type='submit'
      >
        login
      </button>
    </form>
  </div>
)

LoginForm.propTypes = {
  message: PropTypes.string.isRequired,
  messageType: PropTypes.string.isRequired,
  handleLogin: PropTypes.func.isRequired,
  username: PropTypes.string.isRequired,
  password: PropTypes.string.isRequired,
  setUsername: PropTypes.func.isRequired,
  setPassword: PropTypes.func.isRequired
}

export default LoginForm