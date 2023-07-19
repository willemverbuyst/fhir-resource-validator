import { z } from "zod";

const decimalRegex = /-?(0|[1-9][0-9]*)(\.[0-9]+)?([eE][+-]?[0-9]+)?/;

export const decimal = z.string().regex(decimalRegex);
