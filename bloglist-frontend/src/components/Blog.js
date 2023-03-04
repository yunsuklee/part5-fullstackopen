import React, { useState } from 'react'
import blogService from '../services/blogs'

const blogStyle = {
  paddingTop: 10,
  paddingLeft: 2,
  border: 'solid',
  borderWidth: 1,
  marginBottom: 5
}

const Blog = ({
  blog,
  setMessage,
  setMessageType,
  user,
  setBlogs,
  increaseLikes
}) => {
  const [likes, setLikes] = useState(blog.likes)
  const [visible, setVisible] = useState(false)
  const showWhenVisible = { display: visible ? '' : 'none' }

  const toggleVisibility = () => {
    setVisible(!visible)
  }

  const increaseLikesLocal = async () => {
    const updatedBlog = {
      title: blog.title,
      author: blog.author,
      url: blog.url,
      userId: blog.user.id,
      likes: likes + 1,
    }

    try {
      const response = await blogService
        .increaseLikes(updatedBlog, blog.id)

      setLikes(response.likes)
      const blogs = await blogService.getAll()
      setBlogs(blogs)

    } catch(exception) {
      setMessageType('error')
      setMessage('Something went wrong, please try again later')

      setTimeout(() => {
        setMessage('')
        setMessageType('')
      }, 5000)
    }
  }

  const removeBlog = async () => {
    if(window.confirm(`Remove blog ${blog.title} by ${blog.author}?`)) {
      try {
        await blogService.remove(blog.id)
        const blogs = await blogService.getAll()
        setBlogs(blogs)
      } catch(exception) {
        setMessageType('error')
        setMessage('Something went wrong, please try again later')

        setTimeout(() => {
          setMessage('')
          setMessageType('')
        }, 5000)
      }
    }
  }

  const showDeleteButton = (username) => {
    if (user.username === username) {
      return (
        <button onClick={removeBlog}>remove</button>
      )
    }
  }

  return (
    <div style={blogStyle} className='blog'>
      {blog.title} {blog.author}
      <button onClick={toggleVisibility}>
        {visible ? 'hide' : 'view'}
      </button>
      <div style={showWhenVisible} className='blog_info'>
        <p>{blog.url}</p>
        <div>
          <span>{likes}</span>
          <button onClick={increaseLikes ? increaseLikes : increaseLikesLocal}>like</button>
        </div>
        <p>{blog.user.name}</p>
        {showDeleteButton(blog.user.username)}
      </div>
    </div>
  )
}

export default Blog