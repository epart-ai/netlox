import { z } from "zod";

export const signUpPayloadSchema = z.object({
	profile: z.object({
		fullname: z.string().trim().min(1, "이름을 입력해 주세요."),
		companyname: z.string().trim().min(1, "회사명을 입력해 주세요."),
	}),
	email: z.string().trim().email("유효한 이메일 주소를 입력해 주세요."),
	password: z.string().min(6, "비밀번호는 최소 6자 이상이어야 합니다."),
});

export const signUpFormOnlySchema = z.object({
	confirmPassword: z.string().min(6, "비밀번호 확인을 입력해 주세요."),
	terms: z.boolean().refine((value: boolean) => value, {
		message: "",
	}),
});

export const signUpFormSchema = signUpPayloadSchema
	.merge(signUpFormOnlySchema)
	.refine(
		(values: { password: string; confirmPassword: string }) =>
			values.password === values.confirmPassword,
		{
			message: "비밀번호가 일치하지 않습니다.",
			path: ["confirmPassword"],
		},
	);

export type SignUpPayload = z.infer<typeof signUpPayloadSchema>;
export type SignUpFormValues = z.infer<typeof signUpFormSchema>;

export const signUpFormDefaultValues: SignUpFormValues = {
	profile: {
		fullname: "",
		companyname: "",
	},
	email: "",
	password: "",
	confirmPassword: "",
	terms: false,
};
