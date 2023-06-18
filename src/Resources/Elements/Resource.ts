import { z } from "zod";
import { Meta } from "./Meta";

export const Resource = z
  .object({
    id: z.string().optional(),
    meta: Meta.optional(),
    implicitRules: z.string().optional(),
    language: z.string().optional(),
  })
  .strict();
