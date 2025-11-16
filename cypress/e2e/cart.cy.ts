describe("Cart Functionality", () => {

    it("Should add item to cart", () => {
      cy.visit("http://localhost:5173/");
  
      cy.get("[data-testid='product-card']").first().click();
  
      cy.contains("Add to Cart").click();
  
      cy.visit("http://localhost:5173/cart");
  
      cy.contains("My Cart").should("exist");
      cy.get("[data-testid='cart-item']").should("have.length", 1);
    });
  
  });
  