import { z } from "zod";

const baseExtension = z.object({
  url: z.string().optional(),
});

type Extension = z.infer<typeof baseExtension> & {
  extension?: Extension[];
};

export const Extension: z.ZodType<Extension> = baseExtension.extend({
  extension: z.lazy(() => Extension.array()).optional(),
  value: z.unknown().optional(),
});
