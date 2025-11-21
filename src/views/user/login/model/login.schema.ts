import { z } from "zod";

export const loginPayloadSchema = z.object({
	email: z.string().trim().email("유효한 이메일 주소를 입력해 주세요."),
	password: z.string().min(6, "비밀번호는 최소 6자 이상이어야 합니다."),
});

export const loginFormOnlySchema = z.object({});

export const loginFormSchema = loginPayloadSchema.merge(loginFormOnlySchema);

export type LoginPayload = z.infer<typeof loginPayloadSchema>;
export type LoginFormValues = z.infer<typeof loginFormSchema>;

export const loginFormDefaultValues: LoginFormValues = {
	email: "",
	password: "",
};

export const toLoginPayload = (values: LoginFormValues): LoginPayload => ({
	email: values.email,
	password: values.password,
});
