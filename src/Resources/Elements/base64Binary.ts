import { z } from "zod";

const base64BinaryRegex = /(\s*([0-9a-zA-Z+=]){4}\s*)+/;

export const base64Binary = z.string().regex(base64BinaryRegex);
