import React, { useState, useEffect, useRef } from 'react'
import Blog from './Blog'
import BlogForm from './BlogForm'
import Togglable from './Togglable'
import Notification from './Notification'
import blogService from '../services/blogs'

const BlogList = (props) => {
  const [blogs, setBlogs] = useState([])
  const blogFormRef = useRef()

  useEffect(() => {
    blogService.getAll().then(blogs =>
      setBlogs(blogs)
    )
  }, [])

  const createBlog = async (blogObject) => {
    try {
      await blogService.create(blogObject)
      const blogs = await blogService.getAll()

      setBlogs(blogs)
      props.setMessageType('success')
      props.setMessage(`A new blog ${blogObject.title} by ${blogObject.author}`)
      blogFormRef.current.toggleVisibility()

      setTimeout(() => {
        props.setMessage('')
        props.setMessageType('')
      }, 5000)

    } catch(exception) {
      // console.log(exception)

      props.setMessageType('error')
      props.setMessage('Something went wrong, please try again later')

      setTimeout(() => {
        props.setMessage('')
        props.setMessageType('')
      }, 5000)
    }
  }

  return (
    <div>
      <h2>blogs</h2>
      <Notification
        message={props.message}
        messageType={props.messageType}
      />
      <p>
        {props.user.name} logged in
        <button onClick={() => {
          window.localStorage.removeItem('loggedBlogAppUser')
          props.setUser(null)
        }}>
          logout
        </button>
      </p>
      <Togglable buttonLabel='new blog' ref={blogFormRef}>
        <BlogForm
          createBlog={createBlog}
        />
      </Togglable>
      {blogs
        .sort((a, b) => b.likes - a.likes)
        .map(blog =>
          <Blog
            key={blog.id}
            blog={blog}
            setMessage={props.setMessage}
            setMessageType={props.setMessageType}
            user={props.user}
            setBlogs={setBlogs}
          />
        )}
    </div>
  )
}

export default BlogList