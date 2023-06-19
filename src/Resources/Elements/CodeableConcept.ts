import { z } from "zod";
import { Coding } from "./Coding";

export const CodeableConcept = z
  .object({
    coding: z.array(Coding).optional(),
    text: z.string().optional(),
  })
  .strict();
