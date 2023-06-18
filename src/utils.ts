export function isObject(input: unknown): asserts input is object {
  if (typeof input !== "object" || input === null || Array.isArray(input)) {
    throw new Error("Input is not an object");
  }
}

export function hasResourceTypeKey(input: object) {
  if (!input || !("resourceType" in input)) {
    throw new Error("No resourceType property found");
  }
}
