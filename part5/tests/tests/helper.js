const login = async (page, username, password) => {
  await page.getByTestId('username').fill(username)
  await page.getByTestId('password').fill(password)
  await page.getByRole('button', {name: 'login'}).click()
}
const createBlog = async (page, title, author, url) => {
  await page.getByRole('button', {name: 'create blog'}).click()
  await page.getByTestId('title').fill(title)
  await page.getByTestId('author').fill(author)
  await page.getByTestId('url').fill(url)
  await page.getByRole('button', {name: 'create'}).click()
}

const expandBlog = async (page, title) => {
  const blogDiv = page.locator('[data-testid="blog-item"]', { hasText: title }).first()
  const showButton = blogDiv.getByRole('button', {name: 'view'})
  await showButton.click()
  return blogDiv
}

module.exports = {login, createBlog, expandBlog}