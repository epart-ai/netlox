import { z } from "zod";

export const changePasswordSchema = z
	.object({
		currentPassword: z.string().min(1, "Please enter your current password."),
		newPassword: z
			.string()
			.min(1, "Please enter your new password.")
			.refine(
				(password) => password.length >= 8,
				"New password must be at least 8 characters and include a number.",
			)
			.refine(
				(password) => /\d/.test(password),
				"New password must be at least 8 characters and include a number.",
			)
			.max(72, "The password can be up to 72 characters."),
		confirmNewPassword: z
			.string()
			.min(1, "Please enter your new password again."),
	})
	.refine((data) => data.newPassword === data.confirmNewPassword, {
		message:
			"New passwords do not match. Please ensure both fields are identical.",
		path: ["confirmNewPassword"],
	})
	.refine((data) => data.currentPassword !== data.newPassword, {
		message: "The new password must be different from the current password.",
		path: ["newPassword"],
	});

export type ChangePasswordFormValues = z.infer<typeof changePasswordSchema>;

