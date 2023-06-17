import { z } from "zod";
import { Flag } from "./Flag";

function createErrorMessage(issue: z.ZodIssue, index: number) {
  const errorMessage = document.getElementById("errorMessage")!;
  const errorCard = document.createElement("div");
  errorCard.className = "error-card";
  const title = document.createElement("h4");
  const titleTextNode = document.createTextNode(`ERROR #${index + 1}`);
  title.appendChild(titleTextNode);
  errorCard.appendChild(title);

  const paragraph = document.createElement("p");
  const paragraphTextNode = document.createTextNode(
    `${issue.path}: ${issue.message.toLowerCase()}`
  );
  paragraph.appendChild(paragraphTextNode);
  errorCard.appendChild(paragraph);

  errorMessage.appendChild(errorCard);
}

export function validator(element: HTMLButtonElement) {
  element.addEventListener("click", () => {
    const i = document.getElementById("resourceInput") as HTMLInputElement;
    const value = JSON.parse(i.value.trim());
    try {
      Flag.parse(value);
    } catch (error: unknown) {
      if (error instanceof z.ZodError) {
        error.issues.forEach((i, index) => createErrorMessage(i, index));
      } else {
        console.log(JSON.stringify(error));
      }
    }
  });
}
