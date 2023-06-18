import { z } from "zod";
import { Encounter } from "./Resources/Encounter";
import { Flag } from "./Resources/Flag";
import {
  findResourceType,
  Resources,
  ResourceType,
} from "./Resources/resources";

function cleanUpSuccessDisplay() {
  const successMessage = document.getElementById("successMessage");

  if (!(successMessage && successMessage instanceof HTMLDivElement)) {
    console.warn("No success message element found");
    return;
  }

  let child = successMessage.lastElementChild;
  while (child) {
    successMessage.removeChild(child);
    child = successMessage.lastElementChild;
  }
}

function displaySuccess() {
  const successMessage = document.getElementById("successMessage");

  if (!(successMessage && successMessage instanceof HTMLDivElement)) {
    console.warn("No success message element found");
    return;
  }

  const successCard = document.createElement("div");
  const title = document.createElement("h4");
  const titleTextNode = document.createTextNode("Looking good!");
  title.appendChild(titleTextNode);
  successCard.appendChild(title);

  successMessage.appendChild(successCard);
}

function createErrorCard(text = "ERROR") {
  const errorCard = document.createElement("div");
  errorCard.className = "error-card";

  const title = document.createElement("h4");
  const titleTextNode = document.createTextNode(text);
  title.appendChild(titleTextNode);
  errorCard.appendChild(title);

  return errorCard;
}

function createErrorParagraph(text: string) {
  const paragraph = document.createElement("p");
  const paragraphTextNode = document.createTextNode(text);
  paragraph.appendChild(paragraphTextNode);

  return paragraph;
}

function cleanUpErrorDisplay() {
  const errorMessage = document.getElementById("errorMessage");

  if (!(errorMessage && errorMessage instanceof HTMLDivElement)) {
    console.warn("No error message element found");
    return;
  }

  let child = errorMessage.lastElementChild;
  while (child) {
    errorMessage.removeChild(child);
    child = errorMessage.lastElementChild;
  }
}

function displayError(
  errorCard: HTMLDivElement,
  paragraph: HTMLParagraphElement
) {
  const errorMessage = document.getElementById("errorMessage");

  if (!(errorMessage && errorMessage instanceof HTMLDivElement)) {
    console.warn("No error message element found");
    return;
  }

  errorCard.appendChild(paragraph);
  errorMessage.appendChild(errorCard);
}

function createErrorMessage(issue: z.ZodIssue, index: number) {
  const errorCard = createErrorCard(`ERROR #${index + 1}`);
  const paragraph = createErrorParagraph(`${issue.path}: ${issue.message}`);

  displayError(errorCard, paragraph);
}

function createGenericErrorMessage(text = "Something went wrong") {
  const errorCard = createErrorCard();
  const paragraph = createErrorParagraph(text);

  displayError(errorCard, paragraph);
}

function cleanUpDisplay() {
  cleanUpErrorDisplay();
  cleanUpSuccessDisplay();
}

function parseJSONInput() {
  const input = document.getElementById("resourceInput");

  if (!(input && input instanceof HTMLTextAreaElement && input.value)) {
    console.warn("No input element found");
    return;
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

function parseWithZod(value: unknown, resourceType: ResourceType) {
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
