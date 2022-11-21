describe('Create Collection', () => {
  it('connect wallet', () => {
    cy.visit('/')
    cy.contains('connect wallet').click()
  })
})



// describe('Explore Collections', () => {
//   it('finds the content collection', () => {
//     cy.request('POST', 'api/auth/login', { walletAdress: '0x1Ac816038FF7Caf6479e21cea27195348F62D0c7' })
//       .its('body')
//       .as('currentUser')
//     cy.visit('/')
//     cy.contains('admin').click()
//   })
// })