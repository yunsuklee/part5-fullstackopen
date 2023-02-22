import React, { useState, useEffect, useRef } from 'react'
import Blog from './Blog'
import BlogForm from './BlogForm'
import Togglable from './Togglable'
import Notification from './Notification'
import blogService from '../services/blogs'

const BlogList = (props) => {
  const [blogs, setBlogs] = useState([])
  const [url, setUrl] = useState('')
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')

  const blogFormRef = useRef()

  useEffect(async () => {
    const initialBlogs = await blogService.getAll()
    setBlogs(initialBlogs)
  }, [])

  const addBlog = async (event) => {
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
      props.setMessageType('success')
      props.setMessage(`A new blog ${title} by ${author}`)
      blogFormRef.current.toggleVisibility()

      setTitle('')
      setAuthor('')
      setUrl('')

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
          title={title}
          author={author}
          url={url}
          setTitle={setTitle}
          setAuthor={setAuthor}
          setUrl={setUrl}
          addBlog={addBlog}
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