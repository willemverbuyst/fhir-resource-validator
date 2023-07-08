import patient_1 from "../fixtures/patient_1.json";
import patient_10 from "../fixtures/patient_10.json";
import patient_2 from "../fixtures/patient_2.json";
import patient_3 from "../fixtures/patient_3.json";
import patient_4 from "../fixtures/patient_4.json";
import patient_5 from "../fixtures/patient_5.json";
import patient_8 from "../fixtures/patient_8.json";
import patient_9 from "../fixtures/patient_9.json";

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

  it("should add patient_2 and have a successfull validation", () => {
    cy.get("#resourceInput").invoke("val", JSON.stringify(patient_2));
    cy.get("#validateBtn").click();
    cy.get(".success-card").should("contain", "Looking good!");
  });

  it("should add patient_3 and have a successfull validation with warning", () => {
    cy.get("#resourceInput").invoke("val", JSON.stringify(patient_3));
    cy.get("#validateBtn").click();
    cy.get(".warning-card > h4").should("contain", "WARNING #1");
    cy.get(".warning-card > p").should(
      "contain",
      "Unrecognized key(s) in object: '_gender'"
    );
  });

  it("should add patient_4 and have a successfull validation", () => {
    cy.get("#resourceInput").invoke("val", JSON.stringify(patient_4));
    cy.get("#validateBtn").click();
    cy.get(".success-card").should("contain", "Looking good!");
  });

  it("should add patient_5 and have a successfull validation", () => {
    cy.get("#resourceInput").invoke("val", JSON.stringify(patient_5));
    cy.get("#validateBtn").click();
    cy.get(".success-card").should("contain", "Looking good!");
  });

  it("should add patient_8 and have a successfull validation", () => {
    cy.get("#resourceInput").invoke("val", JSON.stringify(patient_8));
    cy.get("#validateBtn").click();
    cy.get(".success-card").should("contain", "Looking good!");
  });

  it("should add patient_9 and have a successfull validation", () => {
    cy.get("#resourceInput").invoke("val", JSON.stringify(patient_9));
    cy.get("#validateBtn").click();
    cy.get(".success-card").should("contain", "Looking good!");
  });

  it("should add patient_10 and have a successfull validation", () => {
    cy.get("#resourceInput").invoke("val", JSON.stringify(patient_10));
    cy.get("#validateBtn").click();
    cy.get(".success-card").should("contain", "Looking good!");
  });
});
