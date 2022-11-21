describe('Landing page', () => {
  it('hero section', () => {
    cy.visit('/')
    cy.get('h1').should('contain', 'Summer')
  })

  it('shop collection', () => {
    cy.visit('/')
    cy.contains('Shop Collection').click()
    cy.url().should('include', 'collection')
  })
  it('raffle', () => {
    cy.visit('/')
    cy.get('.mx-auto > :nth-child(1) > .inline-block').click()
    cy.url().should('include', 'raffleNfts')
  })
})