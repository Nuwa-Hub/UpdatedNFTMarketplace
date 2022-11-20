describe('Create NFT', () => {
    it('finds the content collection', () => {
        cy.visit('/nft/create')
        cy.get('.h2').contains('CREATE NEW NFT')
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