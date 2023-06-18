import { z } from "zod";
import { Coding } from "./Coding";

const instantRegex =
  /([0-9]([0-9]([0-9][1-9]|[1-9]0)|[1-9]00)|[1-9]000)-(0[1-9]|1[0-2])-(0[1-9]|[1-2][0-9]|3[0-1])T([01][0-9]|2[0-3]):[0-5][0-9]:([0-5][0-9]|60)(\.[0-9]+)?(Z|(\+|-)((0[0-9]|1[0-3]):[0-5][0-9]|14:00))/;

export const Meta = z
  .object({
    versionId: z.string().optional(),
    lastUpdated: z.string().regex(instantRegex).optional(),
    source: z.string().optional(),
    profile: z.unknown().optional(),
    security: Coding.optional(),
    tag: Coding.optional(),
  })
  .strict();
