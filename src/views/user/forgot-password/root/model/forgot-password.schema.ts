import { z } from "zod";

export const forgotPasswordPayloadSchema = z.object({
	email: z.string().trim().email(""),
});

export const forgotPasswordFormOnlySchema = z.object({});

export const forgotPasswordFormSchema = forgotPasswordPayloadSchema.merge(
	forgotPasswordFormOnlySchema,
);

export type ForgotPasswordPayload = z.infer<typeof forgotPasswordPayloadSchema>;
export type ForgotPasswordFormValues = z.infer<typeof forgotPasswordFormSchema>;

export const forgotPasswordFormDefaultValues: ForgotPasswordFormValues = {
	email: "",
};

export const toForgotPasswordPayload = (
	values: ForgotPasswordFormValues,
): ForgotPasswordPayload => ({
	email: values.email,
});
