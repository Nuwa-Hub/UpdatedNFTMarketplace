describe("Create Collection", () => {
  // it("connect wallet", () => {
  //   cy.visit("/");
  //   cy.get(":nth-child(4) > :nth-child(1) > .relative > .bg-indigo-600");
  // });
  // it("explorer", () => {
  //   cy.visit("/");
  //   cy.get(".px-2 > .hidden > :nth-child(1)");
  //   cy.get(".px-2 > .hidden > :nth-child(1) > .absolute :nth-child(2)");
  // });
  // it("create", () => {
  //   cy.visit("/");
  //   cy.get(".px-2 > .hidden > :nth-child(2)");
  //   cy.get(".px-2 > .hidden > :nth-child(2) > .absolute :nth-child(2)");
  // });
  it("get collections", () => {
    cy.request("/api/collection/").as("comments");
    cy.get("@comments").should((response) => {
      expect(response.body).to.have.length(14);
    });
  });
  it("create notification", () => {
    cy.request({
      method: "POST",
      url: "/api/notification/",
      //failOnStatusCode: false, // baseUrl is prepend to URL
      // indicates the body should be form urlencoded and sets Content-Type: application/x-www-form-urlencoded headers
      body: {
        type: "Auction",
        userWalletAddress: "0x6fea76902fabbdaea6a69285beb5ed92559c376e",
        nft: "637c6e9e26c9b8ed62235159",
      },
    }).then((response) => {
      // response.body is automatically serialized into JSON
      expect(response.body).to.have.property("type", "Auction"); // true
    });
  });
  it("create listing", () => {
    cy.request({
      method: "POST",
      url: "/api/notification/",
      //failOnStatusCode: false, // baseUrl is prepend to URL
      // indicates the body should be form urlencoded and sets Content-Type: application/x-www-form-urlencoded headers
      body: {
        seller: "sdfsdf",
        nft: "sdfsdf",
        price: "sdfsdf",
        buyer: "sdfsdf",
      },
    }),
      (response) => {
        // response.body is automatically serialized into JSON
        expect(response.body).to.have.property("type", "Auction"); // true
      };
  });
});

// describe('Explore Collections', () => {
//   it('finds the content collection', () => {
//     cy.request('POST', 'api/auth/login', { walletAdress: '0x1Ac816038FF7Caf6479e21cea27195348F62D0c7' })
//       .its('body')
//       .as('currentUser')
//     cy.visit('/')
//     cy.contains('admin').click()
//   })
// })
