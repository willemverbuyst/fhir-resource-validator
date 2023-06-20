import { z } from "zod";

export function cleanUpSuccessDisplay() {
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

export function displaySuccess() {
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

export function createErrorCard(text = "ERROR") {
  const errorCard = document.createElement("div");
  errorCard.className = "error-card";

  const title = document.createElement("h4");
  const titleTextNode = document.createTextNode(text);
  title.appendChild(titleTextNode);
  errorCard.appendChild(title);

  return errorCard;
}

export function createErrorParagraph(text: string) {
  const paragraph = document.createElement("p");
  const paragraphTextNode = document.createTextNode(text);
  paragraph.appendChild(paragraphTextNode);

  return paragraph;
}

export function cleanUpErrorDisplay() {
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

export function displayError(
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

export function createErrorMessage(issue: z.ZodIssue, index: number) {
  const errorCard = createErrorCard(`ERROR #${index + 1}`);
  const message = issue.path.length
    ? `${issue.path}: ${issue.message}`
    : issue.message;
  const paragraph = createErrorParagraph(message);

  displayError(errorCard, paragraph);
}

export function createGenericErrorMessage(text = "Something went wrong") {
  const errorCard = createErrorCard();
  const paragraph = createErrorParagraph(text);

  displayError(errorCard, paragraph);
}
