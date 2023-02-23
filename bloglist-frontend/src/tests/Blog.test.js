import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, screen } from '@testing-library/react'
// import userEvent from '@testing-library/user-event'

import Blog from '../components/Blog'

describe('<Blog />', () => {
  let container

  const blog = {
    id: 0,
    title: 'Test',
    author: 'test',
    url: 'http://test.com',
    likes: 100,
    user: {
      username: 'test',
      name: 'test'
    }
  }

  const user = {
    username: 'test',
    name: 'test'
  }

  const mockSetMessage = jest.fn()
  const mockSetMessageType = jest.fn()
  const mockSetBlogs = jest.fn()

  beforeEach(() => {
    container = render(
      <Blog
        key={blog.id}
        blog={blog}
        setMessage={mockSetMessage}
        setMessageType={mockSetMessageType}
        user={user}
        setBlogs={mockSetBlogs}
      />
    ).container
  })

  test('renders title and author', () => {
    const element = screen.getByText('Test test')
    expect(element).toBeDefined()
  })

  test('does not render url and likes', () => {
    const div = container.querySelector('.blog_info')
    expect(div).toHaveStyle('display: none')
  })
})
