import { z } from "zod";
import { Flag } from "./Flag";

function createErrorMessage(issue: z.ZodIssue) {
  const errorMessage = document.getElementById("errorMessage")!;
  Object.entries(issue).forEach(([k, v]) => {
    const paragraph = document.createElement("p");
    const node = document.createTextNode(`${k}: ${v}`);
    paragraph.appendChild(node);
    errorMessage.appendChild(paragraph);
  });
}

export function validator(element: HTMLButtonElement) {
  element.addEventListener("click", () => {
    const i = document.getElementById("resourceInput") as HTMLInputElement;
    const value = JSON.parse(i.value.trim());
    try {
      Flag.parse(value);
    } catch (error: unknown) {
      if (error instanceof z.ZodError) {
        error.issues.forEach((i) => createErrorMessage(i));
      } else {
        console.log(JSON.stringify(error));
      }
    }
  });
}
