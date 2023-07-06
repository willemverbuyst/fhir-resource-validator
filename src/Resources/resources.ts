export const Resources = {
  Consent: "Consent",
  Contract: "Contract",
  DocumentReference: "DocumentReference",
  Encounter: "Encounter",
  Flag: "Flag",
  Patient: "Patient",
  Practitioner: "Practitioner",
  PractitionerRole: "PractitionerRole",
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
