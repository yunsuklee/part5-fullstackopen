import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'

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
  const mockIncreaseLikes = jest.fn()

  beforeEach(() => {
    container = render(
      <Blog
        key={blog.id}
        blog={blog}
        setMessage={mockSetMessage}
        setMessageType={mockSetMessageType}
        user={user}
        setBlogs={mockSetBlogs}
        increaseLikes={mockIncreaseLikes}
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

  test('url and likes are shown when button is clicked', async () => {
    const user = userEvent.setup()
    const button = screen.getByText('view')
    await user.click(button)

    const div = container.querySelector('.blog_info')
    expect(div).not.toHaveStyle('display: none')
  })

  test('clicking twice the like button calls event handler twice', async () => {
    const user = userEvent.setup()
    const button = screen.getByText('view')
    await user.click(button)

    const likeButton = screen.getByText('like')
    await user.click(likeButton)
    await user.click(likeButton)

    expect(mockIncreaseLikes.mock.calls).toHaveLength(2)
  })
})
