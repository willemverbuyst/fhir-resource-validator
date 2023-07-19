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

export function getResourceType(value: unknown) {
  if (
    typeof value === "object" &&
    value !== null &&
    "resourceType" in value &&
    typeof value.resourceType === "string"
  ) {
    return (value as { resourceType: string }).resourceType;
  }

  return null;
}

export function findResourceType(value: unknown) {
  const resourceType = getResourceType(value);

  if (resourceType && resourceType in Resources) {
    return Resources[resourceType as ResourceType];
  }

  throw new Error("Unknown resource type");
}
