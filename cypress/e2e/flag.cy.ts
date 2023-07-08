import { default as flag_1, default as flag_2 } from "../fixtures/flag_1.json";

describe("flag.spec.cy", () => {
  beforeEach(() => {
    cy.visit("/");
    cy.get("#resourceInput").clear();
  });

  it("should add flag_1 and have a successfull validation", () => {
    cy.get("#resourceInput").invoke("val", JSON.stringify(flag_1));
    cy.get("#validateBtn").click();
    cy.get(".success-card").should("contain", "Looking good!");
  });

  it("should add flag_2 and have a successfull validation", () => {
    cy.get("#resourceInput").invoke("val", JSON.stringify(flag_2));
    cy.get("#validateBtn").click();
    cy.get(".success-card").should("contain", "Looking good!");
  });
});
