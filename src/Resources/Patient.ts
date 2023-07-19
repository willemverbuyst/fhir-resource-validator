import { z } from "zod";
import { Address } from "./Elements/Address";
import { Attachment } from "./Elements/Attachment";
import { CodeableConcept } from "./Elements/CodeableConcept";
import { ContactPoint } from "./Elements/ContactPoint";
import { DomainResource } from "./Elements/DomainResource";
import { HumanName } from "./Elements/HumanName";
import { Period } from "./Elements/Period";
import { Reference } from "./Elements/Reference";
import { dataTypes } from "./dataTypes";
import { Resources } from "./resources";

export const Patient = DomainResource.extend({
  resourceType: z.literal(Resources.Patient),
  identifier: z.array(z.unknown()).optional(),
  active: z.boolean().optional(),
  name: z.array(HumanName).optional(),
  telecom: z.array(ContactPoint).optional(),
  gender: z.enum(["male", "female", "other", "unknown"]).optional(),
  birthDate: dataTypes.date.optional(),
  deceasedBoolean: z.boolean().optional(),
  deceasedDateTime: dataTypes.dateTime.optional(),
  address: z.array(Address).optional(),
  maritalStatus: CodeableConcept.optional(),
  multipleBirthBoolean: z.boolean().optional(),
  multipleBirthInteger: z.number().int().optional(),
  photo: z.array(Attachment).optional(),
  contact: z
    .array(
      z.object({
        relationship: z.array(CodeableConcept).optional(),
        name: HumanName.optional(),
        telemcom: z.array(ContactPoint).optional(),
        address: Address.optional(),
        gender: z.enum(["male", "female", "other", "unknown"]).optional(),
        organization: Reference(Resources.Organization).optional(),
        period: Period.optional(),
      }),
    )
    .optional(),
  communication: z
    .array(
      z.object({
        language: CodeableConcept,
        preferred: z.boolean().optional(),
      }),
    )
    .optional(),
  generalPractitioner: z
    .array(
      Reference([
        Resources.Organization,
        Resources.Practitioner,
        Resources.PractitionerRole,
      ]),
    )
    .optional(),
  managingOrganization: Reference(Resources.Organization).optional(),
  link: z
    .array(
      z.object({
        other: Reference([Resources.Patient, Resources.RelatedPerson]),
        type: z.enum(["replaced-by", "replaces", "refer", "seealso"]),
      }),
    )
    .optional(),
})
  .strict()
  .and(
    z.union(
      [
        z.object({
          deceasedBoolean: z.boolean(),
          deceasedDateTime: z.undefined(),
        }),
        z.object({
          deceasedBoolean: z.undefined(),
          deceasedDateTime: dataTypes.dateTime,
        }),
        z.object({
          deceasedBoolean: z.undefined(),
          deceasedDateTime: z.undefined(),
        }),
      ],
      {
        errorMap: () => ({
          message:
            "Can't have both deceasedBoolean and deceasedDateTime at the same time",
        }),
      },
    ),
  )
  .and(
    z.union(
      [
        z.object({
          multipleBirthBoolean: z.boolean(),
          multipleBirthInteger: z.undefined(),
        }),
        z.object({
          multipleBirthBoolean: z.undefined(),
          multipleBirthInteger: z.number().int(),
        }),
        z.object({
          multipleBirthBoolean: z.undefined(),
          multipleBirthInteger: z.undefined(),
        }),
      ],
      {
        errorMap: () => ({
          message:
            "Can't have both multipleBirthBoolean and multipleBirthInteger at the same time",
        }),
      },
    ),
  );

export type Patient = z.infer<typeof Patient>;
