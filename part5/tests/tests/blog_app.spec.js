const {test, expect, beforeEach, describe} = require('@playwright/test')
const {login, createBlog, expandBlog} = require('./helper')
describe('Blog app', () => {
  const testUser = {
    name: 'Jon Doe',
    username: 'secretUser',
    password: 'secret',
  }
  beforeEach(async ({page, request}) => {
    await request.post('/api/testing/reset')
    await request.post('/api/users', {
      data: testUser
    })
    await page.goto('/')
  })

  describe('Logging', () => {

    test('Login form is shown', async ({page}) => {
      await expect(page.getByTestId('username')).toBeVisible()
      await expect(page.getByTestId('password')).toBeVisible()
    })

    describe('Login', () => {
      test('succeeds with correct credentials', async ({page}) => {
        await login(page, testUser.username, testUser.password)
        await expect(page.getByRole('button', {name: 'logout'})).toBeVisible()
        await expect(page.getByText('Jon Doe logged in')).toBeVisible()
      })

      test('fails with wrong credentials', async ({page}) => {
        await login(page, testUser.username, 'wrong')
        await page.getByRole('button', {name: 'login'}).click()
        await expect(page.getByText('wrong credentials')).toBeVisible()
      })
    })
  })

  describe('When logged in', () => {
    beforeEach(async ({page}) => {
      await login(page, testUser.username, testUser.password)
    })

    test('a new blog can be created', async ({page}) => {
      await createBlog(page, 'to save blog', 'pushkin', 'https://playwright.dev/docs/locators#filter-by-text')
      await expect(page.getByText('to save blog pushkin')).toBeVisible()
    })

    describe('and two blogs exist', () => {
      beforeEach(async ({page}) => {
        await createBlog(page, 'first', 'pushkin', 'https://playwright.dev/docs/locators#filter-by-text')
        await createBlog(page, 'second', 'unknown author', 'https://playwright.dev/docs/locators#filter-by-text')
      })

      test('these blogs are sorted by likes', async ({page}) => {
        const blogItems = page.getByTestId('blog-item')
        const secondItem = blogItems.filter({ hasText: 'second' })

        await secondItem.getByRole('button', { name: 'view' }).click()
        await secondItem.getByRole('button', { name: 'like' }).click()

        await expect(blogItems.first()).toContainText('second')
      })
    })

    describe('and a blog exists', () => {
      beforeEach(async ({page}) => {
        await createBlog(page, 'to like blog', 'pushkin', 'https://playwright.dev/docs/locators#filter-by-text')
      })

      test('the blog can be liked', async ({page}) => {
        const blogDiv = await expandBlog(page, 'to like blog')
        await expect(blogDiv.getByTestId('like')).toContainText('0')
        await blogDiv.getByRole('button', {name: 'like'}).click()
        await expect(blogDiv.getByTestId('like')).toContainText('1')
      })

      test('the user can be delete the blog', async ({page}) => {
        const blogDiv = await expandBlog(page, 'to like blog')
        page.once('dialog', async (dialog) => {
          await dialog.accept()
        })
        await blogDiv.getByRole('button', {name: 'Delete'}).click()
        await expect(blogDiv).not.toBeAttached()
      })

      describe('the user logged out and another user logged in', () => {
        beforeEach(async ({page, request}) => {
          await request.post('/api/users', {
            data: {
              name: 'Second User',
              username: 'secondUser',
              password: 'secret',
            }
          })
          await page.getByTestId('logout').click()
          await login(page, 'secondUser', 'secret')
        })

        test('another user can not delete the blog', async ({page}) => {
          const blogDiv = await expandBlog(page, 'to like blog')
          await expect(blogDiv.getByRole('button', {name: 'Delete'})).not.toBeAttached()
        })
      })
    })
  })
})