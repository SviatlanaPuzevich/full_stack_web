describe('Blog app', function () {
  beforeEach(function () {
    cy.visit('')
  })

  it('Login form is shown', function () {
    cy.contains('username')
    cy.contains('password')
  })

  describe('Login', function () {
    const testUser = {
      name: 'Ivan Ivanov',
      username: 'ivanov',
      password: 'rainysummer'
    }

    beforeEach(function () {
      cy.request('POST', `${Cypress.env('BACKEND')}/testing/reset`)
      cy.request('POST', `${Cypress.env('BACKEND')}/users/`, testUser)
    })

    it('succeeds with correct credentials', function () {
      cy.get('[data-testid="username"]').type(testUser.username)
      cy.get('[data-testid="password"]').type(testUser.password)
      cy.contains('login').click()
      cy.contains(`${testUser.name} logged in`)
    })

    it('fails with wrong credentials', function () {
      cy.get('[data-testid="username"]').type(testUser.username)
      cy.get('[data-testid="password"]').type('wrong')
      cy.get('button[type="submit"]').click()
      cy.contains(/wrong credentials/i)
      cy.get('html').should('not.contain', `${testUser.name} logged in`)
    })

    describe('When logged in', function () {
      beforeEach(function () {
        cy.login(testUser)
      })

      it('A blog can be created', function () {
        const blog = {
          title: 'Summer blog',
          author: 'Summer',
          url: 'https://docs.cypress.io/app/get-started/why-cypress#In-a-nutshell',
        }
        cy.contains('button', 'create blog').click()
        cy.get('[data-testid="title"]').type(blog.title)
        cy.get('[data-testid="author"]').type(blog.author)
        cy.get('[data-testid="url"]').type(blog.url)
        cy.get('[data-testid="createBlog"]').click()
        cy.contains('div', `${blog.title} ${blog.author}`)
      })

      describe('and a blog exists', function () {
        const blog = {
          title: 'Summer blog',
          author: 'Summer',
          url: 'https://docs.cypress.io/app/get-started/why-cypress#In-a-nutshell',
        }
        beforeEach(function () {
          cy.createBlog(blog)
        })

        it(' can like the blog', function () {
          cy.contains('div', blog.title).contains('button', 'view').click()
          cy.get('[data-testid="like"]').should('contain', '0')
          cy.get('[data-testid="like"] button').click()
          cy.get('[data-testid="like"]').should('contain', '1')
        })

        it('the user can delete this blog', function () {
          cy.contains('div', blog.title).contains('button', 'view').click()
          cy.contains('button', 'Delete').click()
          cy.on('window:confirm', () => true)
          cy.contains(`${blog.title} ${blog.author}`).should('not.exist')
        })


        describe('and login another user', function () {
          beforeEach(function () {
            const secondUser = {
              username: 'vasia',
              name: 'Vasia',
              password: 'secret'
            }
            cy.request('POST', `${Cypress.env('BACKEND')}/users/`, secondUser)
            cy.login(secondUser)
          })


          it('another user can not delete the blog', function () {
            cy.contains('div', blog.title).contains('button', 'view').click()
            cy.contains('button', 'Delete').should('not.exist')
          })
        })

        describe('and the second blog exists', function () {
          beforeEach(function () {
            cy.createBlog({title: 'second', author: 'Summer', url: "http://docs.cypress.io"})
          })

          it('another user can not delete the blog', function () {
            const secondTitle = 'second'
            cy.get('[data-testid="blog-item"]').eq(0).should('contain', blog.title)
            cy.get('[data-testid="blog-item"]').eq(1).should('contain', secondTitle)
            cy.contains('div', secondTitle).contains('button', 'view').click()
            cy.get('[data-testid="like"] button').click()
            cy.get('[data-testid="blog-item"]').eq(0).should('contain', secondTitle)
            cy.get('[data-testid="blog-item"]').eq(1).should('contain', blog.title)
          })
        })

      })
    })
  })
})