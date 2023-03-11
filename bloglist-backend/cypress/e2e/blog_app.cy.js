describe('Blog app', function() {
  beforeEach(function() {
    cy.request('POST', `${Cypress.env('BACKEND')}/testing/reset`)
    
    const user = {
      name: 'Tester',
      username: 'tester',
      password: 'test'
    }
    cy.request('POST', `${Cypress.env('BACKEND')}/users`, user)

    cy.visit('')
  })

  it('Login form is shown', function() {
    cy.contains('log in to application')
  })

  describe('Login', function() {
    it('succeeds with correct credentials', function() {
      cy.get('#username').type('tester')
      cy.get('#password').type('test')
      cy.get('#submit').click()

      cy.contains('Welcome back tester!')
        .should('have.css', 'color', 'rgb(0, 128, 0)')
    })

    it('fails with wrong credentials', function() {
      cy.get('#username').type('not-tester')
      cy.get('#password').type('nos-test')
      cy.get('#submit').click()

      cy.contains('Wrong username or password')
        .should('have.css', 'color', 'rgb(255, 0, 0)')
    })
  })

  describe('When logged in', function() {
    beforeEach(function() {
      cy.login({ username: 'tester', password: 'test' })
    })

    it('A blog can be created', function() {
      cy.get('#new-blog').click()
      cy.get('#title').type('A Cypress made blog')
      cy.get('#author').type('Tester')
      cy.get('#url').type('http://test.com')
      cy.get('#create').click()

      cy.contains('A Cypress made blog')
    })

    describe('And a blog exists', function() {
      beforeEach(function() {
        cy.createBlog({
          title: 'Another Cypress made blog',
          author: 'Tester',
          url: 'http://test.com'
        })
      })

      it('Users can like a blog', function() {
        cy.contains('view').click()
        cy.contains('like').click()
        cy.contains('1')
      })

      it('The user who created the blog can delete it', function() {
        cy.contains('view').click()
        cy.contains('remove').click()
        
        cy.get('html').should('not.contain', '.blog')
      })

      it('Other users but the creator cannot see the delete button', function() {
        cy.contains('logout').click()
        
        const user = {
          name: 'Tester2',
          username: 'tester2',
          password: 'test2'
        }
        cy.request('POST', `${Cypress.env('BACKEND')}/users`, user)
        
        cy.login({ username: 'tester2', password: 'test2' })

        cy.contains('view').click()
        cy.contains('Another Cypress made blog')
          .should('not.contain', 'remove')
      })
    })

    describe('And multiple blogs exist', function() {
      beforeEach(function() {
        cy.createBlog({
          title: 'First Cypress made blog',
          author: 'Tester',
          url: 'http://test.com'
        })

        cy.wait(2000)

        cy.contains('view').click()
        cy.contains('like').click()
        cy.contains('1')

        cy.createBlog({
          title: 'Second Cypress made blog',
          author: 'Tester',
          url: 'http://test.com'
        })
      })

      it('They will be ordered according to likes', function() {
        cy.get('.blog').eq(0).should('contain', 'First Cypress made blog')
        cy.get('.blog').eq(1).should('contain', 'Second Cypress made blog')
      })
    })
  })

})