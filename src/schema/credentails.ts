import { z } from "zod";

export const createCredentialsSchema = z.object({
  name: z.string().max(30),
  value: z.string().max(60),
});

export type createCredentialsSchemaType = z.infer<
  typeof createCredentialsSchema
>;
