import { z } from "zod";
export const contactFormSchema = z.object({
    email: z.email("Please enter a valid email address.").trim(),
    message: z.string().trim().min(1, "Message is required.").max(2000, "Message must be 2000 characters or fewer."),
    captchaToken: z.string().optional(),
});

export type TContactForm = z.infer<typeof contactFormSchema>;
