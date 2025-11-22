import type { User } from "@supabase/supabase-js";

import { createClient } from "@/shared/supabase";

import { PROFILE_TABLE, type ProfileInput } from "../../profile/model";
import type { SignUpPayload } from "../model/sign-up.schema";

type Payload = SignUpPayload & {
	profile?: ProfileInput;
};

export async function signUpWithProfile(
	payload: Payload,
): Promise<{ user: User | null }> {
	const supabase = createClient();
	const { email, password, profile } = payload;

	const { data, error } = await supabase.auth.signUp({
		email,
		password,
	});

	if (error) {
		throw new Error(error.message);
	}

	const user = data.user;

	if (user && profile) {
		const { error: profileError } = await supabase.from(PROFILE_TABLE).upsert({
			id: user.id,
			fullname: profile.fullname ?? null,
			companyname: profile.companyname ?? null,
			etc1: profile.etc1 ?? null,
			etc2: profile.etc2 ?? null,
			etc3: profile.etc3 ?? null,
			etc4: profile.etc4 ?? null,
			etc5: profile.etc5 ?? null,
		});

		if (profileError) {
			throw new Error(profileError.message);
		}
	}

	return { user };
}
