// describe('Create Collection', () => {
//   it('finds the content collection', () => {
//     cy.visit('/')
//     cy.contains('Create Collection').click()
//     // cy.url().should('include', 'collection/create')
//   })
// })

// describe('Create NFT', () => {
//   it('finds the content collection', () => {
//     cy.visit('/')
//     cy.contains('Create NFT').click()
//     cy.url().should('include', 'nft/create')
//   })
// })

// describe('Explore Collections', () => {
//   it('finds the content collection', () => {
//     cy.visit('/')
//     cy.contains('Explore Collections').click()
//     cy.url().should('include', 'collection')
//   })
// })


describe('Explore Collections', () => {
  beforeEach(() => {
    //login before each test
    cy.request('POST', '/api/auth/login', { walletAdress: '0x1Ac816038FF7Caf6479e21cea27195348F62D0c7' })
      .its('body')
      .as('currentUser')
  })
  it('finds the content collection', () => {
    cy.visit('/')
    cy.contains('admin').click()
    // cy.url().should('include', 'collection')
  })
})