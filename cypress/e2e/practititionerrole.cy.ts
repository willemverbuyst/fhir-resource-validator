import practitionerrole_1 from "../fixtures/practitionerrole_1.json";

describe("practitionerrole.spec.cy", () => {
  beforeEach(() => {
    cy.visit("/");
    cy.get("#resourceInput").clear();
  });

  it("should add practitionerrole_1 and have a successfull validation", () => {
    cy.get("#resourceInput").invoke("val", JSON.stringify(practitionerrole_1));
    cy.get("#validateBtn").click();
    cy.get(".success-card").should("contain", "Looking good!");
  });
});
