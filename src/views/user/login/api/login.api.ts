import type { User } from "@supabase/supabase-js";

import { createClient } from "@/shared/supabase";

type Payload = {
	email: string;
	password: string;
};

type Result = {
	user: User | null;
};

export async function signInWithEmail(payload: Payload): Promise<Result> {
	const supabase = createClient();
	const { email, password } = payload;

	const { data, error } = await supabase.auth.signInWithPassword({
		email,
		password,
	});

	if (error) {
		throw new Error(error.message);
	}

	return { user: data.user };
}
