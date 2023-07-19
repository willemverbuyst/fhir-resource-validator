import { z } from "zod";
import { DomainResource } from "./Elements/DomainResource";
import { dataTypes } from "./dataTypes";
import { fhirR4Resource } from "./fhirR4Resources";
import { Resources } from "./resources";

export const Bundle = DomainResource.extend({
  resourceType: z.literal(Resources.Bundle),
  identifier: z.unknown().optional(),
  type: z.enum([
    "document",
    "message",
    "transaction",
    "transaction-response",
    "batch",
    "batch-response",
    "history",
    "searchset",
    "collection",
  ]),
  timestamp: dataTypes.instant.optional(),
  total: z.number().nonnegative().max(2_147_483_647).optional(),
  link: z
    .object({
      relation: z.string(),
      url: z.string(),
    })
    .optional(),
  entry: z
    .array(
      z.object({
        fullUrl: z.string().optional(),
        resource: fhirR4Resource.optional(),
        search: z
          .object({
            mode: z.enum(["match", "include", "outcome"]).optional(),
            score: dataTypes.decimal.optional(),
          })
          .optional(),
        request: z
          .object({
            method: z.enum(["GET", "HEAD", "POST", "PUT", "DELETE", "PATCH"]),
            uri: z.string(),
            ifNoneMatch: z.string().optional(),
            ifModifiedSince: z.string().optional(),
            ifMatch: z.string().optional(),
            ifNoneExist: z.string().optional(),
          })
          .optional(),
        response: z
          .object({
            status: z.string(),
            location: z.string().optional(),
            etag: z.string(),
            lastModified: dataTypes.instant.optional(),
            outcome: fhirR4Resource.optional(),
          })
          .optional(),
      }),
    )
    .optional(),
  signature: dataTypes.Signature.optional(),
}).strict();

export type Bundle = z.infer<typeof Bundle>;
