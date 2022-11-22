describe("Create Collection", () => {
   

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
      }).then(
        (response) => {
          // response.body is automatically serialized into JSON
          expect(response.body).to.have.property("type", "Auction"); // true
        });
    });
  });