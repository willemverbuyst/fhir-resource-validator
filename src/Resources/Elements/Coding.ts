import { z } from "zod";

export const Coding = z
  .object({
    system: z.string().optional(),
    version: z.string().optional(),
    code: z.string().optional(),
    display: z.string().optional(),
    userSelected: z.boolean().optional(),
  })
  .strict();
