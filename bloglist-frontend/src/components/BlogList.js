import Blog from './Blog'

const BlogList = ({ blogs, user, setUser }) => (
  <div>
    <h2>blogs</h2>
    <p>
      {user.name} logged in
      <button onClick={() => {
        window.localStorage.removeItem('loggedBlogAppUser')
        setUser(null)
      }}>
        logout
      </button>
    </p>
    {blogs.map(blog =>
      <Blog key={blog.id} blog={blog} />
    )}
  </div>
)

export default BlogList