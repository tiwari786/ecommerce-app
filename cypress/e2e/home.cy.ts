/// <reference types="cypress" />

describe("Home Page Tests", () => {

    it("Should load the home page", () => {
      cy.visit("http://localhost:5173/");
      cy.contains("Our Products").should("exist");
    });
  
    it("Should display product cards", () => {
      cy.visit("http://localhost:5173/");  
      cy.get("[data-testid='product-card']").should("have.length.greaterThan", 0);
    });
  
  });
  