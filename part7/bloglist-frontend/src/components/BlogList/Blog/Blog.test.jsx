import { render, screen } from '@testing-library/react'
import Blog from './Blog'
import { userEvent } from '@testing-library/user-event'

describe('<Blog />', () => {
  const blog = {
    title: 'Component rendered',
    author: 'John Doe',
    url: 'https://github.com/JohnDoe',
    likes: 5,
    user: {
      username: 'JohnDoe',
    },
  }
  const user = {
    username: 'JohnDoe',
  }
  let updateBlog
  let deleteBlog
  let userE

  const renderBlog = () =>
    render(
      <Blog
        blog={blog}
        user={user}
        deleteBlog={deleteBlog}
        update={updateBlog}
      />
    )

  beforeEach(() => {
    updateBlog = vi.fn()
    deleteBlog = vi.fn()
    userE = userEvent.setup()
  })

  test('renders title and author', () => {
    renderBlog()

    const element = screen.queryByText(`${blog.title} ${blog.author}`)
    expect(element).toBeDefined()
  })

  test('does not render url and likes by default', () => {
    renderBlog()

    expect(screen.queryByText(blog.url)).not.toBeInTheDocument()
    expect(screen.queryByText(blog.likes)).not.toBeInTheDocument()
  })

  test('clicking by the show button  render url and likes', async () => {
    renderBlog()
    const userE = userEvent.setup()
    const showButton = screen.getByRole('button')
    await userE.click(showButton)
    expect(screen.queryByText(blog.url)).toBeDefined()
    expect(screen.queryByText(blog.likes)).toBeDefined()
  })

  test('clicking twice by the like button calls update handler twice', async () => {
    updateBlog.mockReturnValue({ likes: 0 })
    renderBlog()
    const userE = userEvent.setup()
    const showButton = screen.getByRole('button')
    await userE.click(showButton)
    const likeButton = await screen.findByText('like')
    await userE.dblClick(likeButton)
    expect(updateBlog.mock.calls).toHaveLength(2)
  })
})
