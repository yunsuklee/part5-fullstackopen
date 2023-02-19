import React from 'react'

const BlogForm = (props) => (
  <div>
    <h2>create new</h2>
    <form onSubmit={props.handleSubmit}>
      <div>
        <label htmlFor="title">title:</label>
        <input
          id="title"
          name="title"
          type="text"
          value={props.title}
          onChange={({ target }) => props.setTitle(target.value)}
        />
      </div>
      <div>
        <label htmlFor="author">author:</label>
        <input
          id="author"
          name="author"
          type="text"
          value={props.author}
          onChange={({ target }) => props.setAuthor(target.value)}
        />
      </div>
      <div>
        <label htmlFor="url">url:</label>
        <input
          id="url"
          name="url"
          type="url"
          value={props.url}
          onChange={({ target }) => props.setUrl(target.value)}
        />
      </div>
      <button type="submit">
        create
      </button>
    </form>
  </div>
)

export default BlogForm
