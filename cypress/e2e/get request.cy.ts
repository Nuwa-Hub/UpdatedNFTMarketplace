describe("Create Collection", () => {
      
    it("get collections", () => {
        cy.request("/api/nft/").as("nfts");
        cy.get("@nfts").should((response) => {
          expect(response.body).to.have.length(17);
        });
      });
    it("get collections", () => {
      cy.request("/api/collection/").as("comments");
      cy.get("@comments").should((response) => {
        expect(response.body).to.have.length(14);
      });
    });
    it("get listings", () => {
        cy.request("/api/listing/").as("comments");
        cy.get("@comments").should((response) => {
          expect(response.body).to.have.length(52);
        });
      });
      it("get price list", () => {
        cy.request("/api/nft/price/63752cdbc7dc5566b1f3c005").as("comments");
        cy.get("@comments").should((response) => {
          expect(response.body).to.have.length(2);
        });
      });
      it("most visited collections", () => {
        cy.request("/api/collection/mostvisited").as("comments");
        cy.get("@comments").should((response) => {
          expect(response.body).to.have.length(6);
        });
      });
      it("most visited nfts", () => {
        cy.request("/api/nft/mostvisited").as("comments");
        cy.get("@comments").should((response) => {
          expect(response.body).to.have.length(8);
        });
      });
      it("get auctions", () => {
        cy.request("/api/auction/").as("comments");
        cy.get("@comments").should((response) => {
          expect(response.body).to.have.length(17);
        });
      });
  });