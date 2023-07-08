import { z } from "zod";
import { Attachment } from "./Elements/Attachment";
import { CodeableConcept } from "./Elements/CodeableConcept";
import { DomainResource } from "./Elements/DomainResource";
import { Reference } from "./Elements/Reference";
import { dateTime } from "./Elements/dateTime";
import { Resources } from "./resources";

export const Consent = DomainResource.extend({
  resourceType: z.literal(Resources.Consent),
  identifier: z.array(z.unknown()).optional(),
  status: z.enum([
    "draft",
    "proposed",
    "active",
    "rejected",
    "inactive",
    "entered-in-error",
  ]),
  scope: CodeableConcept,
  category: z.array(CodeableConcept).min(1),
  patient: Reference(Resources.Patient),
  dateTime: dateTime.optional(),
  performer: z.array(Reference(Resources.Organization)).optional(),
  organization: z.array(Reference(Resources.Organization)).optional(),
  sourceAttachment: Attachment.optional(),
  sourceReference: Reference(Resources.Consent).optional(),
  policy: z
    .object({
      authority: z.string().optional(),
      uri: z.string().optional(),
    })
    .optional(),
  policyRule: CodeableConcept.optional(),
  verification: z
    .object({
      verified: z.boolean(),
      verifiedWith: Reference(Resources.Patient),
      verificationDate: dateTime,
    })
    .optional(),
  provision: z.unknown().optional(),
})
  .strict()
  .and(
    z.union(
      [
        z.object({
          sourceAttachment: Attachment,
          sourceReference: z.undefined(),
        }),
        z.object({
          sourceAttachment: z.undefined(),
          sourceReference: Reference(Resources.Consent),
        }),
        z.object({
          sourceAttachment: z.undefined(),
          sourceReference: z.undefined(),
        }),
      ],
      {
        errorMap: () => ({
          message:
            "Can't have both sourceAttachment and sourceReference at the same time",
        }),
      }
    )
  );

export type Consent = z.infer<typeof Consent>;
