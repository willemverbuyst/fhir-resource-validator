import { z } from "zod";
import { Consent } from "./Consent";
import { Encounter } from "./Encounter";
import { Flag } from "./Flag";
import { Organization } from "./Organization";
import { Patient } from "./Patient";
import { PractitionerRole } from "./PractitionerRole";

export const fhirR4Resource = z.union([
  Consent,
  Encounter,
  Flag,
  Organization,
  Patient,
  PractitionerRole,
]);
