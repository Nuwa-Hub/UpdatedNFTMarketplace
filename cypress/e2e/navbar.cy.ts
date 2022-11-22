describe('Create Collection', () => {
  it('connect wallet', () => {
    cy.visit('/')
    cy.get(':nth-child(4) > :nth-child(1) > .relative > .bg-indigo-600')
  })
  it('explorer', () => {
    cy.visit('/')
    cy.get('.px-2 > .hidden > :nth-child(1)')
    cy.get('.px-2 > .hidden > :nth-child(1) > .absolute :nth-child(2)')
  })
  it('create', () => {
    cy.visit('/')
    cy.get('.px-2 > .hidden > :nth-child(2)')
    cy.get('.px-2 > .hidden > :nth-child(2) > .absolute :nth-child(2)')
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