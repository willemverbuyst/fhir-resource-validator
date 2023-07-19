import { z } from "zod";
import { Reference } from "./Elements/Reference";
import { Resources } from "./resources";

const base64BinaryRegex = /(\s*([0-9a-zA-Z+=]){4}\s*)+/;
const base64Binary = z.string().regex(base64BinaryRegex);

const dateRegex =
  /([0-9]([0-9]([0-9][1-9]|[1-9]0)|[1-9]00)|[1-9]000)(-(0[1-9]|1[0-2])(-(0[1-9]|[1-2][0-9]|3[0-1]))?)?/;
const date = z.string().regex(dateRegex);

const dateTimeRegex =
  /([0-9]([0-9]([0-9][1-9]|[1-9]0)|[1-9]00)|[1-9]000)(-(0[1-9]|1[0-2])(-(0[1-9]|[1-2][0-9]|3[0-1])(T([01][0-9]|2[0-3]):[0-5][0-9]:([0-5][0-9]|60)(\.[0-9]+)?(Z|(\+|-)((0[0-9]|1[0-3]):[0-5][0-9]|14:00)))?)?)?/;
const dateTime = z.string().regex(dateTimeRegex);

const decimalRegex = /-?(0|[1-9][0-9]*)(\.[0-9]+)?([eE][+-]?[0-9]+)?/;
const decimal = z.string().regex(decimalRegex);

const instantRegex =
  /([0-9]([0-9]([0-9][1-9]|[1-9]0)|[1-9]00)|[1-9]000)-(0[1-9]|1[0-2])-(0[1-9]|[1-2][0-9]|3[0-1])T([01][0-9]|2[0-3]):[0-5][0-9]:([0-5][0-9]|60)(\.[0-9]+)?(Z|(\+|-)((0[0-9]|1[0-3]):[0-5][0-9]|14:00))/;
const instant = z.string().regex(instantRegex);

const timeRegex = /([01][0-9]|2[0-3]):[0-5][0-9]:([0-5][0-9]|60)(\.[0-9]+)?/;
const time = z.string().regex(timeRegex);

const Period = z
  .object({
    start: dateTime.optional(),
    end: dateTime.optional(),
  })
  .strict();

const Address = z
  .object({
    use: z.enum(["home", "work", "temp", "old", "billing"]).optional(),
    type: z.enum(["postal", "physical", "both"]).optional(),
    text: z.string().optional(),
    line: z.array(z.string()).optional(),
    city: z.string().optional(),
    district: z.string().optional(),
    state: z.string().optional(),
    postalCode: z.string().optional(),
    country: z.string().optional(),
    period: Period.optional(),
  })
  .strict();

const Attachment = z
  .object({
    contentType: z.unknown().optional(),
    language: z.unknown().optional(),
    data: z.unknown().optional(),
    url: z.unknown().optional(),
    size: z.unknown().optional(),
    hash: z.unknown().optional(),
    title: z.string().optional(),
    creation: dateTime.optional(),
  })
  .strict();

const Coding = z
  .object({
    system: z.string().optional(),
    version: z.string().optional(),
    code: z.string().optional(),
    display: z.string().optional(),
    userSelected: z.boolean().optional(),
  })
  .strict();

const CodeableConcept = z
  .object({
    coding: z.array(Coding).optional(),
    text: z.string().optional(),
  })
  .strict();

const ContactPoint = z
  .object({
    system: z
      .enum(["phone", "fax", "email", "pager", "url", "sms", "other"])
      .optional(),
    value: z.string().optional(),
    use: z.enum(["home", "work", "temp", "old", "mobile"]).optional(),
    rank: z.number().int().optional(),
    period: Period.optional(),
  })
  .strict();

const HumanName = z
  .object({
    use: z
      .enum([
        "usual",
        "official",
        "temp",
        "nickname",
        "anonymous",
        "old",
        "maiden",
      ])
      .optional(),
    text: z.string().optional(),
    family: z.string().optional(),
    given: z.array(z.string()).optional(),
    prefix: z.array(z.string()).optional(),
    suffix: z.array(z.string()).optional(),
    period: Period.optional(),
  })
  .strict();

const Quantity = z
  .object({
    value: z.number().optional(),
    comparator: z.enum(["<", "<=", ">=", ">"]).optional(),
    unit: z.string().optional(),
    system: z.string().optional(),
    code: z.string().optional(), // TODO coded from unit
  })
  .strict();

const Signature = z
  .object({
    type: z.array(Coding),
    when: instant,
    who: Reference([
      Resources.Practitioner,
      Resources.PractitionerRole,
      Resources.RelatedPerson,
      Resources.Patient,
      Resources.Device,
      Resources.Organization,
    ]),
    onBehalfOf: Reference([
      Resources.Practitioner,
      Resources.PractitionerRole,
      Resources.RelatedPerson,
      Resources.Patient,
      Resources.Device,
      Resources.Organization,
    ]).optional(),
    targetFormat: z.string().optional(),
    sigFormat: z.string().optional(),
    data: base64Binary.optional(),
  })
  .strict();

export const dataTypes = {
  base64Binary,
  date,
  dateTime,
  decimal,
  instant,
  time,
  Address,
  Attachment,
  CodeableConcept,
  Coding,
  ContactPoint,
  HumanName,
  Period,
  Quantity,
  Signature,
};
