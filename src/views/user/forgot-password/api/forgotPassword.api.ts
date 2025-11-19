import { createClient } from "@/shared/supabase";

export type PasswordResetOptions = {
	redirectTo?: string;
};

export async function requestPasswordReset(
	email: string,
	options?: PasswordResetOptions,
): Promise<void> {
	const supabase = createClient();
	const { error } = await supabase.auth.resetPasswordForEmail(email, {
		redirectTo: options?.redirectTo,
	});

	if (error) {
		throw new Error(error.message);
	}
}
