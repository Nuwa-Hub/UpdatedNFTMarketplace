describe('Create NFT', () => {
    it('Form', () => {
        cy.visit('/nft/create')
        cy.get('input[name=NFTName]').type('new NFT')
        cy.get('textarea[name=description]').type('Description')
        // cy.get('input[id=react-select-3-input]').type('asd')
        // cy.get('input[type=file]').selectFile('cypress/e2e/nft.webp')
    })
})

describe('Create NFT', () => {
    it('Form', () => {
        cy.visit('/collection/create')
        cy.get('input[name=collectionName]').type('new Collection')
        cy.get('textarea[name=description]').type('Description')
        // cy.get('input[id=react-select-3-input]').type('asd')
        // cy.get('input[type=file]').selectFile('cypress/e2e/nft.webp')
    })
})

// describe('The Login Page', () => {
//     it('sets auth cookie when logging in via form submission', function () {
//         cy.visit('/nft/create')
//         cy.get('input[name=NFTName]').type('new NFT')
//         cy.get('input[name=description]').type('Description')
//         cy.get('input[name=collectionId]').type('asd')
//         cy.get('input[type=file]').selectFile('nft.webp')
//         cy.contains('SUBMIT').click()
//     })
// })