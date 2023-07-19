import { z } from "zod";
import { dataTypes } from "../dataTypes";
import { Coding } from "./Coding";

export const Meta = z
  .object({
    versionId: z.string().optional(),
    lastUpdated: dataTypes.instant.optional(),
    source: z.string().optional(),
    profile: z.unknown().optional(),
    security: Coding.optional(),
    tag: Coding.optional(),
  })
  .strict();
