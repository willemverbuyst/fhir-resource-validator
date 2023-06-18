import { describe, expect, it } from "vitest";
import { Resources } from "../Resources/resources";
import { hasResourceTypeKey, isObject } from "./utils";

describe("isObject", () => {
  it("should throw an error if input is not an object", () => {
    expect(() => {
      isObject(42);
    }).toThrow("Input is not an object");

    expect(() => {
      isObject("hello");
    }).toThrow("Input is not an object");

    expect(() => {
      isObject(null);
    }).toThrow("Input is not an object");

    expect(() => {
      isObject([]);
    }).toThrow("Input is not an object");
  });

  it("should not throw an error if input is an object", () => {
    expect(() => {
      isObject({});
    }).not.toThrow();

    expect(() => {
      isObject({ name: "John" });
    }).not.toThrow();
  });
});

describe("hasResourceTypeKey", () => {
  it("should throw an error if input does not have resourceType property", () => {
    expect(() => {
      hasResourceTypeKey({});
    }).toThrow("No resourceType property found");

    expect(() => {
      hasResourceTypeKey({ name: "John" });
    }).toThrow("No resourceType property found");
  });

  it("should not throw an error if input does not have resourceType property", () => {
    expect(() => {
      hasResourceTypeKey({ resourceType: Resources.Encounter });
    }).not.toThrow();
  });
});
