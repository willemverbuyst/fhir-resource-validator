import { z } from "zod";

export const Extension = z
  .object({
    uri: z.string().optional(),
    value: z.array(z.unknown()).optional(),
  })
  .strict();
