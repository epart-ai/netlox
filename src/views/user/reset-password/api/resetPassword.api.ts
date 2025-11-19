import type { Session } from "@supabase/supabase-js";

import { createClient } from "@/shared/supabase";

export type Result = Session | null;

export async function getCurrentSession(): Promise<Result> {
	const supabase = createClient();
	const {
		data: { session },
		error,
	} = await supabase.auth.getSession();

	if (error) {
		throw new Error(error.message);
	}

	return session;
}

export async function updatePassword(newPassword: string): Promise<void> {
	const supabase = createClient();
	const { error } = await supabase.auth.updateUser({ password: newPassword });

	if (error) {
		throw new Error(error.message);
	}
}
