import { z } from "zod";
import { DomainResource } from "./Elements/DomainResource";
import { Reference } from "./Elements/Reference";
import { dataTypes } from "./dataTypes";
import { Resources } from "./resources";

export const Organization = DomainResource.extend({
  resourceType: z.literal(Resources.Organization),
  identifier: z.array(z.unknown()).optional(),
  active: z.boolean().optional(),
  type: z.array(dataTypes.CodeableConcept).optional(),
  name: z.string().optional(),
  alias: z.array(z.string()).optional(),
  telecom: z.array(dataTypes.ContactPoint).optional(),
  address: z.array(dataTypes.Address).optional(),
  partOf: Reference(Resources.Organization).optional(),
  contact: z
    .array(
      z.object({
        purpose: dataTypes.CodeableConcept.optional(),
        name: dataTypes.HumanName.optional(),
        telecom: z.array(dataTypes.ContactPoint).optional(),
        address: dataTypes.Address.optional(),
      }),
    )
    .optional(),
  endpoint: z.array(Reference(Resources.Endpoint)).optional(),
}).strict();

export type Organization = z.infer<typeof Organization>;
