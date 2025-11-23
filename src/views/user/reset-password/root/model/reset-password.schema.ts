import { z } from "zod";

/**
 * Payload 스키마 (실제 비밀번호 변경 요청에 사용되는 데이터)
 */
export const resetPasswordPayloadSchema = z.object({
	password: z
		.string()
		.min(8, "Password must be at least 8 characters and include a number.")
		.regex(
			/\d/,
			"Password must be at least 8 characters and include a number.",
		),
});

/**
 * 폼에서만 사용하는 필드 스키마
 */
export const resetPasswordFormOnlySchema = z.object({
	confirmPassword: z
		.string()
		.min(8, "Password must be at least 8 characters and include a number.")
		.regex(
			/\d/,
			"Password must be at least 8 characters and include a number.",
		),
});

/**
 * RHF에서 사용하는 최종 폼 스키마
 * - payload + 폼 전용 필드를 합치고, 비밀번호 일치 여부를 검증
 */
export const resetPasswordFormSchema = resetPasswordPayloadSchema
	.merge(resetPasswordFormOnlySchema)
	.refine(
		(values: { password: string; confirmPassword: string }) =>
			values.password === values.confirmPassword,
		{
			message: "Passwords do not match.",
			path: ["confirmPassword"],
		},
	);

export type ResetPasswordPayload = z.infer<typeof resetPasswordPayloadSchema>;
export type ResetPasswordFormValues = z.infer<typeof resetPasswordFormSchema>;

export const resetPasswordPayloadDefaultValues: ResetPasswordPayload = {
	password: "",
};

export const resetPasswordFormDefaultValues: ResetPasswordFormValues = {
	...resetPasswordPayloadDefaultValues,
	confirmPassword: "",
};
