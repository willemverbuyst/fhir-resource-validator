import { z } from "zod";
import { dataTypes } from "../dataTypes";

export const Meta = z
  .object({
    versionId: z.string().optional(),
    lastUpdated: dataTypes.instant.optional(),
    source: z.string().optional(),
    profile: z.unknown().optional(),
    security: dataTypes.Coding.optional(),
    tag: dataTypes.Coding.optional(),
  })
  .strict();
