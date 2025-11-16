describe("Product Details Page", () => {

    it("Should navigate to product details page", () => {
      cy.visit("http://localhost:5173/");
  
      cy.get("[data-testid='product-card']").first().click();
  
      cy.contains("Description").should("exist");
    });
  
  });
  