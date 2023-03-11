describe('Blog app', function() {
  beforeEach(function() {
    cy.request('POST', 'http://localhost:3003/api/testing/reset')
    
    const user = {
      name: 'Tester',
      username: 'tester',
      password: 'test'
    }
    cy.request('POST', 'http://localhost:3003/api/users', user)

    cy.visit('http://localhost:3000')
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

})