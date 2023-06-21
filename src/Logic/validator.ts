import { z } from "zod";
import { Encounter } from "../Resources/Encounter";
import { Flag } from "../Resources/Flag";
import {
  findResourceType,
  Resources,
  ResourceType,
} from "../Resources/resources";
import {
  cleanUpErrorDisplay,
  cleanUpSuccessDisplay,
  createErrorMessage,
  createGenericErrorMessage,
  displaySuccess,
} from "./dom";

export function cleanUpDisplay() {
  cleanUpErrorDisplay();
  cleanUpSuccessDisplay();
}

export function parseJSONInput() {
  const input = document.getElementById("resourceInput");

  if (!(input && input instanceof HTMLTextAreaElement && input.value)) {
    console.warn("No input element found");
    return null;
  }

  try {
    const value = JSON.parse(input.value.trim());
    return value;
  } catch (error) {
    cleanUpDisplay();
    createGenericErrorMessage("Not valid JSON");
    console.error(error);
  }
}

export function parseWithZod(value: unknown, resourceType: ResourceType) {
  switch (resourceType) {
    case Resources.Encounter:
      Encounter.parse(value);
      break;
    case Resources.Flag:
      Flag.parse(value);
      break;

    default:
      throw new Error("Unknown resource type, no validition took place");
  }
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
      displaySuccess();
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
