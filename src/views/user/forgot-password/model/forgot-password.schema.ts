import { z } from "zod";

export const forgotPasswordPayloadSchema = z.object({
	email: z.string().trim().email("유효한 이메일 주소를 입력해 주세요."),
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
