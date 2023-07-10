import { z } from "zod";
import { CodeableConcept } from "./CodeableConcept";
import { Quantity } from "./Quantity";

const base = z
  .object({
    url: z.string(),
    valueBase64Binary: z.string().regex(/(\s*([0-9a-zA-Z\\+\\=]){4}\s*)+/),
    valueBoolean: z.boolean(),
    valueCodeableConcept: CodeableConcept,
    valueString: z.string(),
    valueQuantity: Quantity.optional(),
    valueCode: z.string(),
  })
  .strict()
  .partial();

type Extension = {
  extension?: Extension[];
};

export const extension: z.ZodType<Extension> = base
  .extend({
    extension: z.lazy(() => extension.array()).optional(),
  })
  .superRefine((val, ctx) => {
    if (!val.url) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: "Property url is required",
      });
    }

    if (Object.keys(val).filter((i) => i !== "url").length === 0) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: "At least one of value options or extension is required",
      });
    }

    if (
      Object.keys(val)
        .filter((i) => i !== "url")
        .includes("extension") &&
      Object.keys(val).filter((i) => i !== "url").length > 1
    ) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: "Or extension or a value option is allowed, not both",
      });
    }

    if (
      Object.keys(val).filter((i) => i !== "url" && i !== "extension").length >
      1
    ) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: "Only one value option is allowed",
      });
    }
  });
