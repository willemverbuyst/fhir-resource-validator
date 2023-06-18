import { z } from "zod";
import { Narrative } from "./Narrative";

export const DomainResource = z
  .object({
    id: z.string().optional(),
    text: Narrative.optional(),
    container: z.unknown().optional(),
    extension: z.unknown().optional(),
    modifierExtension: z.unknown().optional(),
  })
  .strict();
