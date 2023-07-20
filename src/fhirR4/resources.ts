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
  Organization: "Organization",
  Patient: "Patient",
  PlanDefinition: "PlanDefinition",
  Practitioner: "Practitioner",
  PractitionerRole: "PractitionerRole",
  Procedure: "Procedure",
  RelatedPerson: "RelatedPerson",
  QuestionnaireResponse: "QuestionnaireResponse",
} as const;

export type ResourceType = keyof typeof Resources;
