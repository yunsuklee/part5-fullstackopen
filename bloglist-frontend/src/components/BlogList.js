import React from 'react'
import Blog from './Blog'
import BlogForm from './BlogForm'

const BlogList = (props) => (
  <div>
    <h2>blogs</h2>
    <p>
      {props.user.name} logged in
      <button onClick={() => {
        window.localStorage.removeItem('loggedBlogAppUser')
        props.setUser(null)
      }}>
        logout
      </button>
    </p>
    <BlogForm
      title={props.title}
      author={props.author}
      url={props.url}
      setTitle={props.setTitle}
      setAuthor={props.setAuthor}
      setUrl={props.setUrl}
      handleSubmit={props.handleSubmit}
    />
    {props.blogs.map(blog =>
      <Blog key={blog.id} blog={blog} />
    )}
  </div>
)

export default BlogList