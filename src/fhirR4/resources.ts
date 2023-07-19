export const Resources = {
  Bundle: "Bundle",
  Consent: "Consent",
  Contract: "Contract",
  Device: "Device",
  DocumentReference: "DocumentReference",
  Encounter: "Encounter",
  Endpoint: "Endpoint",
  Flag: "Flag",
  Group: "Group",
  HealthcareService: "HealthcareService",
  Location: "Location",
  Medication: "Medication",
  Patient: "Patient",
  PlanDefinition: "PlanDefinition",
  Practitioner: "Practitioner",
  PractitionerRole: "PractitionerRole",
  Procedure: "Procedure",
  QuestionnaireResponse: "QuestionnaireResponse",
  Organization: "Organization",
  RelatedPerson: "RelatedPerson",
} as const;

export type ResourceType = keyof typeof Resources;
