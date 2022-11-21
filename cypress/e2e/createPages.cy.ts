describe('Create NFT', () => {
    it('Form', () => {
        cy.visit('/nft/create')
        cy.get('input[name=NFTName]').type('new NFT')
        cy.get('textarea[name=description]').type('Description')
    })
})

describe('Create Collection', () => {
    it('Form', () => {
        cy.visit('/collection/create')
        cy.get('input[name=collectionName]').type('new Collection')
        cy.get('textarea[name=description]').type('Description')
    })
})