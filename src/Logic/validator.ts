import { z } from "zod";
import { findResourceType } from "../Resources/resources";
import {
  createErrorMessage,
  createGenericErrorMessage,
  displaySuccess,
} from "./dom";
import { cleanUpDisplay, parseJSONInput, parseWithZod } from "./parse";

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
