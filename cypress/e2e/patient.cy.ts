import { default as patient_1 } from "../fixtures/patient_1.json";

describe("flag.spec.cy", () => {
  beforeEach(() => {
    cy.visit("/");
    cy.get("#resourceInput").clear();
  });

  it("should add patient_1 and have a successfull validation with warnings", () => {
    cy.get("#resourceInput").invoke("val", JSON.stringify(patient_1));
    cy.get("#validateBtn").click();
    cy.get("#message > :nth-child(1) > h4").should("contain", "WARNING #1");
    cy.get(":nth-child(1) > p").should(
      "contain",
      "contact,0,name: Unrecognized key(s) in object: '_family'"
    );
    cy.get("#message > :nth-child(2) > h4").should("contain", "WARNING #2");
    cy.get(":nth-child(2) > p").should(
      "contain",
      "Unrecognized key(s) in object: '_birthDate'"
    );
  });
});
