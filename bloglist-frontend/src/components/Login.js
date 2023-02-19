import React from 'react'

const loginForm = (props) => (
  <div>
    <h2>log in to application</h2>
    <form onSubmit={props.handleLogin}>
      <div>
        <label>username</label>
        <input
          type='text'
          value={props.username}
          name='username'
          onChange={({ target }) => props.setUsername(target.value)}
        />
      </div>
      <div>
        <label>password</label>
        <input
          type='password'
          value={props.password}
          name='password'
          onChange={({ target }) => props.setPassword(target.value)}
        />
      </div>
      <button type='submit'>login</button>
    </form>
  </div>
)

export default loginForm