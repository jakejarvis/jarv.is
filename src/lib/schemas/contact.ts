import { z } from "zod";

export const ContactSchema = z
  .object({
    name: z.string().trim().min(1, { message: "Your name is required." }),
    email: z.string().email({ message: "Your email address is required." }),
    message: z.string().trim().min(15, { message: "Your message must be at least 15 characters." }),
  })
  .readonly();

export type ContactInput = z.infer<typeof ContactSchema>;
