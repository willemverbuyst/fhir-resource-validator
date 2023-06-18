/**
 * @vitest-environment jsdom
 */

import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { cleanUpSuccessDisplay } from "./validator";

describe("cleanUpSuccessDisplay", () => {
  beforeEach(() => {
    const successMessageElement = document.createElement("div");
    successMessageElement.id = "successMessage";

    const child1 = document.createElement("p");
    const child2 = document.createElement("p");
    successMessageElement.appendChild(child1);
    successMessageElement.appendChild(child2);

    document.body.appendChild(successMessageElement);
  });

  afterEach(() => {
    const successMessageElement = document.getElementById("successMessage");

    if (successMessageElement) {
      successMessageElement.remove();
    }
  });

  it("should remove all child elements from the success message element", () => {
    cleanUpSuccessDisplay();

    const successMessageElement = document.getElementById(
      "successMessage"
    ) as HTMLDivElement;

    expect(successMessageElement.childElementCount).toBe(0);
  });

  it("should handle the case when no success message element is found", () => {
    const successMessageElement = document.getElementById(
      "successMessage"
    ) as HTMLDivElement;

    successMessageElement.remove();

    const consoleErrorSpy = vi.spyOn(global.console, "warn");

    cleanUpSuccessDisplay();

    expect(consoleErrorSpy).toHaveBeenCalledWith(
      "No success message element found"
    );
  });
});
