import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { ZodIssueCode, ZodParsedType } from "zod";
import {
  cleanUpErrorDisplay,
  cleanUpSuccessDisplay,
  createErrorCard,
  createErrorMessage,
  createErrorParagraph,
  createGenericErrorMessage,
  displayError,
  displaySuccess,
} from "./dom";

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

    const consoleWarnSpy = vi.spyOn(global.console, "warn");

    cleanUpSuccessDisplay();

    expect(consoleWarnSpy).toHaveBeenCalledWith(
      "No success message element found"
    );

    consoleWarnSpy.mockRestore();
  });
});

describe("displaySuccess", () => {
  beforeEach(() => {
    const successMessageElement = document.createElement("div");
    successMessageElement.id = "successMessage";
    document.body.appendChild(successMessageElement);
  });

  afterEach(() => {
    const successMessageElement = document.getElementById("successMessage");

    if (successMessageElement) {
      successMessageElement.remove();
    }
  });

  it("should handle the case when no success message element is found", () => {
    const successMessageElement = document.getElementById(
      "successMessage"
    ) as HTMLDivElement;

    successMessageElement.remove();

    const consoleWarnSpy = vi.spyOn(global.console, "warn");

    displaySuccess();

    expect(consoleWarnSpy).toHaveBeenCalledWith(
      "No success message element found"
    );

    consoleWarnSpy.mockRestore();
  });

  it("should add success card to successMessage element", () => {
    displaySuccess();

    const successCard = document.querySelector("#successMessage > div");
    const title = successCard?.querySelector("h4");
    const titleText = title?.textContent;

    expect(successCard).not.toBeNull();
    expect(title).not.toBeNull();
    expect(titleText).toBe("Looking good!");
  });
});

describe("createErrorCard", () => {
  it("should create an error card with the given text", () => {
    const text = "Something went wrong!";
    const errorCard = createErrorCard(text);

    expect(errorCard).toBeInstanceOf(HTMLDivElement);
    expect(errorCard.classList.contains("error-card")).toBe(true);

    const title = errorCard.querySelector("h4");
    expect(title).not.toBeNull();
    expect(title?.textContent).toBe(text);
  });

  it("should create an error card with default text when no text is provided", () => {
    const defaultText = "ERROR";
    const errorCard = createErrorCard();

    expect(errorCard).toBeInstanceOf(HTMLDivElement);
    expect(errorCard.classList.contains("error-card")).toBe(true);

    const title = errorCard.querySelector("h4");
    expect(title).not.toBeNull();
    expect(title?.textContent).toBe(defaultText);
  });
});

describe("createErrorParagraph", () => {
  it("should create a paragraph element with the given text", () => {
    const text = "An error occurred!";
    const paragraph = createErrorParagraph(text);

    expect(paragraph).toBeInstanceOf(HTMLParagraphElement);
    expect(paragraph.textContent).toBe(text);
  });
});

describe("cleanUpErrorDisplay", () => {
  beforeEach(() => {
    const errorMessageElement = document.createElement("div");
    errorMessageElement.id = "errorMessage";
    const child1 = document.createElement("p");
    child1.textContent = "Error 1";
    const child2 = document.createElement("p");
    child2.textContent = "Error 2";
    const child3 = document.createElement("p");
    child3.textContent = "Error 3";
    errorMessageElement.appendChild(child1);
    errorMessageElement.appendChild(child2);
    errorMessageElement.appendChild(child3);

    document.body.appendChild(errorMessageElement);
  });

  afterEach(() => {
    const errorMessageElement = document.getElementById("errorMessage");

    if (errorMessageElement) {
      errorMessageElement.remove();
    }
  });
  it("should remove all child elements from the error message element", () => {
    cleanUpErrorDisplay();

    const errorMessage = document.getElementById("errorMessage");
    expect(errorMessage).toBeInstanceOf(HTMLDivElement);
    expect(errorMessage?.childElementCount).toBe(0);
  });

  it("should not throw any errors when no error message element is found", () => {
    expect(cleanUpErrorDisplay).not.toThrow();
  });

  it("should handle the case when no error message element is found", () => {
    const errorMessageElement = document.getElementById(
      "errorMessage"
    ) as HTMLDivElement;

    errorMessageElement.remove();

    const consoleWarnSpy = vi.spyOn(global.console, "warn");

    cleanUpErrorDisplay();

    expect(consoleWarnSpy).toHaveBeenCalledWith(
      "No error message element found"
    );

    consoleWarnSpy.mockRestore();
  });
});

describe("displayError", () => {
  beforeEach(() => {
    const errorMessageElement = document.createElement("div");
    errorMessageElement.id = "errorMessage";

    document.body.appendChild(errorMessageElement);
  });

  afterEach(() => {
    const errorMessageElement = document.getElementById("errorMessage");

    if (errorMessageElement) {
      errorMessageElement.remove();
    }
  });

  it("should append the error card and paragraph to the error message element", () => {
    const errorCard = document.createElement("div");
    const paragraph = document.createElement("p");
    paragraph.textContent = "An error occurred!";

    displayError(errorCard, paragraph);

    const errorMessage = document.getElementById("errorMessage");
    expect(errorMessage).toBeInstanceOf(HTMLDivElement);
    expect(errorMessage?.childElementCount).toBe(1);

    const appendedErrorCard = errorMessage?.querySelector("div");
    expect(appendedErrorCard).toBe(errorCard);

    const appendedParagraph = errorCard.querySelector("p");
    expect(appendedParagraph).toBe(paragraph);
    expect(appendedParagraph?.textContent).toBe("An error occurred!");
  });

  it("should not throw any errors when no error message element is found", () => {
    const errorCard = document.createElement("div");
    const paragraph = document.createElement("p");
    paragraph.textContent = "An error occurred!";

    expect(() => displayError(errorCard, paragraph)).not.toThrow();
  });

  it("should handle the case when no error message element is found", () => {
    const errorMessageElement = document.getElementById(
      "errorMessage"
    ) as HTMLDivElement;

    errorMessageElement.remove();

    const consoleWarnSpy = vi.spyOn(global.console, "warn");

    cleanUpErrorDisplay();

    expect(consoleWarnSpy).toHaveBeenCalledWith(
      "No error message element found"
    );

    consoleWarnSpy.mockRestore();
  });
});

describe("createErrorMessage", () => {
  beforeEach(() => {
    const errorMessageElement = document.createElement("div");
    errorMessageElement.id = "errorMessage";

    document.body.appendChild(errorMessageElement);
  });

  afterEach(() => {
    const errorMessageElement = document.getElementById("errorMessage");

    if (errorMessageElement) {
      errorMessageElement.remove();
    }
  });

  it("should create an error message with the correct error card and paragraph", () => {
    const issue = {
      expected: "'active' | 'inactive' | 'entered-in-error'",
      received: ZodParsedType.undefined,
      code: ZodIssueCode.invalid_literal,
      path: ["status"],
      message: "Required",
    };
    const index = 0;

    createErrorMessage(issue, index);

    const errorMessage = document.getElementById("errorMessage");
    expect(errorMessage).toBeInstanceOf(HTMLDivElement);
    expect(errorMessage?.childElementCount).toBe(1);

    const appendedErrorCard = errorMessage?.querySelector(".error-card");
    expect(appendedErrorCard).not.toBeNull();

    const appendedParagraph = appendedErrorCard?.querySelector("p");
    expect(appendedParagraph).not.toBeNull();
    expect(appendedParagraph?.textContent).toBe("status: Required");
  });

  it("should create an error message with the correct error card and paragraph even if path is missing in issue", () => {
    const issue = {
      expected: "'active' | 'inactive' | 'entered-in-error'",
      received: ZodParsedType.undefined,
      code: ZodIssueCode.invalid_literal,
      path: [],
      message: "Error message",
    };
    const index = 0;

    createErrorMessage(issue, index);

    const errorMessage = document.getElementById("errorMessage");
    expect(errorMessage).toBeInstanceOf(HTMLDivElement);
    expect(errorMessage?.childElementCount).toBe(1);

    const appendedErrorCard = errorMessage?.querySelector(".error-card");
    expect(appendedErrorCard).not.toBeNull();

    const appendedParagraph = appendedErrorCard?.querySelector("p");
    expect(appendedParagraph).not.toBeNull();
    expect(appendedParagraph?.textContent).toBe("Error message");
  });
});

describe("createGenericErrorMessage", () => {
  beforeEach(() => {
    const errorMessageElement = document.createElement("div");
    errorMessageElement.id = "errorMessage";

    document.body.appendChild(errorMessageElement);
  });

  afterEach(() => {
    const errorMessageElement = document.getElementById("errorMessage");

    if (errorMessageElement) {
      errorMessageElement.remove();
    }
  });

  it("should create an error message with the correct error card and paragraph", () => {
    const text = "Error, something went wrong";

    createGenericErrorMessage(text);

    const errorMessage = document.getElementById("errorMessage");
    expect(errorMessage).toBeInstanceOf(HTMLDivElement);
    expect(errorMessage?.childElementCount).toBe(1);

    const appendedErrorCard = errorMessage?.querySelector(".error-card");
    expect(appendedErrorCard).not.toBeNull();

    const appendedParagraph = appendedErrorCard?.querySelector("p");
    expect(appendedParagraph).not.toBeNull();
    expect(appendedParagraph?.textContent).toBe(text);
  });

  it("should create an error message with default text when no text is provided", () => {
    const defaultText = "Something went wrong";

    createGenericErrorMessage();

    const errorMessage = document.getElementById("errorMessage");
    expect(errorMessage).toBeInstanceOf(HTMLDivElement);
    expect(errorMessage?.childElementCount).toBe(1);

    const appendedErrorCard = errorMessage?.querySelector(".error-card");
    expect(appendedErrorCard).not.toBeNull();

    const appendedParagraph = appendedErrorCard?.querySelector("p");
    expect(appendedParagraph).not.toBeNull();
    expect(appendedParagraph?.textContent).toBe(defaultText);
  });
});
