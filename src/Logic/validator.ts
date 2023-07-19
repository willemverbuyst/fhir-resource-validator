import { z } from "zod";
import { ResourceType, Resources } from "../fhirR4/resources";
import {
  cleanUpDisplay,
  createErrorMessage,
  createGenericErrorMessage,
  createSuccessMessage,
} from "./dom";
import { parseJSONInput, parseWithZod } from "./parse";

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

export function validator(element: HTMLButtonElement) {
  element.addEventListener("click", () => {
    const value = parseJSONInput();

    if (!value) {
      console.warn("No input to validate");
      return;
    }

    try {
      const resourceType = findResourceType(value);

      parseWithZod(value, resourceType);
      cleanUpDisplay();
      createSuccessMessage();
      console.info("✅ Parsed input with zod");
    } catch (error: unknown) {
      if (error instanceof z.ZodError) {
        cleanUpDisplay();
        error.issues.forEach((i, index) => createErrorMessage(i, index));
        console.error(error);
        return;
      }

      if (error instanceof Error) {
        cleanUpDisplay();
        createGenericErrorMessage(error.message);
        console.error(error.message);
        return;
      }

      cleanUpDisplay();
      createGenericErrorMessage();
      console.error(error);
    }
  });
}
