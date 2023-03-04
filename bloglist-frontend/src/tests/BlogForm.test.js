import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'

import BlogForm from '../components/BlogForm'

test('<BlogForm /> check that the form calls event handler for new blog', async () => {
  const mockAddBlog = jest.fn()

  let container = render(
    <BlogForm createBlog={mockAddBlog} />
  ).container

  const user = userEvent.setup()
  const createButton = screen.getByText('create')
  const titleInput = container.querySelector('#title')
  const authorInput = container.querySelector('#author')
  const urlInput = container.querySelector('#url')

  await user.type(titleInput, 'testing blog form')
  await user.type(authorInput, 'test')
  await user.type(urlInput, 'http://test.com')
  await user.click(createButton)

  expect(mockAddBlog.mock.calls).toHaveLength(1)
  expect(mockAddBlog.mock.calls[0][0].title).toBe('testing blog form')
  expect(mockAddBlog.mock.calls[0][0].author).toBe('test')
  expect(mockAddBlog.mock.calls[0][0].url).toBe('http://test.com')
})
