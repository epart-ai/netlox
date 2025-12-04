import { z } from "zod";

export const withdrawAccountSchema = z.object({
	confirmPassword: z.string().min(1, "Please fill in all required fields."),
});

export type WithdrawAccountFormValues = z.infer<typeof withdrawAccountSchema>;

