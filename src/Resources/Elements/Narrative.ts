import { z } from "zod";

export const Narrative = z
  .object({
    status: z.enum(["generated", "extensions", "additional", "empty"]),
    div: z.string(),
  })
  .strict();
