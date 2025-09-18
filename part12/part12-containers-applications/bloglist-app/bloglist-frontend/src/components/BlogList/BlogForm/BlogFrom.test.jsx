import { BlogForm } from './BlogForm.jsx'
import { render, screen } from '@testing-library/react'
import { userEvent } from '@testing-library/user-event'

describe ('<BlogFrom /> ', () => {
  test('updates parent state and calls onSubmit', async () => {
    const createBlog = vi.fn()
    const user = userEvent.setup()

    render(<BlogForm createBlog={createBlog} />)

    const inputs = screen.getAllByRole('textbox')
    const titleInput = inputs[0]
    const authorInput = inputs[1]
    const urlInput = inputs[2]
    const createButton = screen.getByText('create')

    await user.type(titleInput, 'test blog title')
    await user.type(authorInput, 'test blog author')
    await user.type(urlInput, 'some url')
    await user.click(createButton)

    expect(createBlog.mock.calls).toHaveLength(1)
    expect(createBlog.mock.calls[0][0].title).toBe('test blog title')
    expect(createBlog.mock.calls[0][0].author).toBe('test blog author')
  })
})