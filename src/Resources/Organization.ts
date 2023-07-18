import { z } from "zod";
import { Address } from "./Elements/Address";
import { CodeableConcept } from "./Elements/CodeableConcept";
import { ContactPoint } from "./Elements/ContactPoint";
import { DomainResource } from "./Elements/DomainResource";
import { HumanName } from "./Elements/HumanName";
import { Reference } from "./Elements/Reference";
import { Resources } from "./resources";

export const Organization = DomainResource.extend({
  resourceType: z.literal(Resources.Organization),
  identifier: z.array(z.unknown()).optional(),
  active: z.boolean().optional(),
  type: z.array(CodeableConcept).optional(),
  name: z.string().optional(),
  alias: z.array(z.string()).optional(),
  telecom: z.array(ContactPoint).optional(),
  address: z.array(Address).optional(),
  partOf: Reference(Resources.Organization).optional(),
  contact: z
    .array(
      z.object({
        purpose: CodeableConcept.optional(),
        name: HumanName.optional(),
        telecom: z.array(ContactPoint).optional(),
        address: Address.optional(),
      }),
    )
    .optional(),
  endpoint: z.array(Reference(Resources.Endpoint)).optional(),
}).strict();

export type Organization = z.infer<typeof Organization>;
