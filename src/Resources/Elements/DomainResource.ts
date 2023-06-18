import { z } from "zod";
import { Extension } from "./Extension";
import { Narrative } from "./Narrative";
import { Resource } from "./Resource";

export const DomainResource = Resource.extend({
  id: z.string().optional(),
  text: Narrative.optional(),
  contained: Resource.optional(),
  extension: Extension.optional(),
  modifierExtension: Extension.optional(),
}).strict();
