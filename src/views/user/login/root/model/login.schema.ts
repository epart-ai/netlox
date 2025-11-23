import { z } from "zod";

export const loginPayloadSchema = z.object({
	email: z.string().trim().email(""),
	password: z.string().min(8, "").regex(/\d/, ""),
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
