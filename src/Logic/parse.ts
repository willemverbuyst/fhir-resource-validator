import { Consent } from "../Resources/Consent";
import { Encounter } from "../Resources/Encounter";
import { Flag } from "../Resources/Flag";
import { Resources, ResourceType } from "../Resources/resources";
import {
  cleanUpErrorDisplay,
  cleanUpSuccessDisplay,
  createGenericErrorMessage,
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
    case Resources.Consent:
      Consent.parse(value);
      break;
    case Resources.Encounter:
      Encounter.parse(value);
      break;
    case Resources.Flag:
      Flag.parse(value);
      break;
  }
}
