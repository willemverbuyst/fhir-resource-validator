import { hasResourceTypeKey, isObject } from "../Logic/utils";
import { Encounter } from "./Encounter";
import { Flag } from "./Flag";

export const Resources = {
  Encounter: "Encounter",
  Flag: "Flag",
  Patient: "Patient",
} as const;

export type ResourceType = keyof typeof Resources;

export function findResourceType(value: Flag | Encounter) {
  isObject(value);
  hasResourceTypeKey(value);

  const resourceType = Resources[value.resourceType];

  if (!resourceType) {
    throw new Error("Unknown resource type");
  }

  return resourceType;
}
