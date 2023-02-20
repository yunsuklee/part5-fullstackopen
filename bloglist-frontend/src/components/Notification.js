import React from 'react'

const Notification = ({ message, messageType }) => (
  <div className={ messageType }>
    <p>{message}</p>
  </div>
)

export default Notification