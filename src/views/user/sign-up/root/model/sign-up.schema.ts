import { z } from "zod";

export const signUpPayloadSchema = z.object({
	profile: z.object({
		fullname: z.string().trim().min(1, "This field is required."),
		companyname: z.string().trim().min(1, "This field is required."),
	}),
	email: z.string().trim().email("").min(1, "This field is required."),
	password: z
		.string()
		.min(8, "Password must be at least 8 characters and include a number.")
		.regex(
			/\d/,
			"Password must be at least 8 characters and include a number.",
		),
});

export const signUpFormOnlySchema = z.object({
	confirmPassword: z.string().min(6, "This field is required."),
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
			message: "Passwords do not match.",
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
