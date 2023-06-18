## isObject(input: unknown): void

This function asserts that the input is an object. If the input is not an object (including `null` or an array), it throws an error.

### Parameters

- `input` (unknown): The value to be checked.

### Throws

- `Error`: If the input is not an object.

### Example

```typescript
try {
  isObject({ name: "John" });
  console.log("Input is an object");
} catch (error) {
  console.error("Input is not an object");
}
```

## hasResourceTypeKey(input: object): void

This function checks if the input object has a `resourceType` property. If the input is `null`, `undefined`, or the `resourceType` property is missing, it throws an error.

### Parameters

- `input` (object): The object to be checked for the presence of the `resourceType` property.

### Throws

- `Error`: If the input object is `null`, `undefined`, or the `resourceType` property is missing.

### Example

```typescript
try {
  const data = { resourceType: "Patient", id: "123" };
  hasResourceTypeKey(data);
  console.log("resourceType property found");
} catch (error) {
  console.error("No resourceType property found");
}
```
