Cypress.Commands.add('login', ({ username, password }) => {
  cy.request('POST', `${Cypress.env('BACKEND')}/login`, {
    username,
    password,
  })
    .then(response => {
      localStorage.setItem('loggedBlogAppUser', JSON.stringify(response.body))
      cy.visit('')
    })
})

Cypress.Commands.add('createBlog', (blog)=>{
  cy.request({
    method: 'POST',
    url:`${Cypress.env('BACKEND')}/blogs`,
    body: blog,
    headers: {
      'Authorization': `Bearer ${JSON.parse(localStorage.getItem('loggedBlogAppUser')).token}`
    }
  })
    .then(response => {
      cy.visit('')
    })
})