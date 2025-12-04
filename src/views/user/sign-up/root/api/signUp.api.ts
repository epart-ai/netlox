import type { User } from "@supabase/supabase-js";

import { createClient } from "@/shared/supabase";
import {
	PROFILE_TABLE,
	type ProfileInput,
} from "@/views/user/profile/root/model";

import type { SignUpPayload } from "../model/sign-up.schema";

type Payload = SignUpPayload & {
	profile?: ProfileInput;
};

export async function signUpWithProfile(
	payload: Payload,
): Promise<{ user: User | null }> {
	const supabase = createClient();
	const { email, password, profile } = payload;

	// 이메일 인증 후 리다이렉트할 URL 생성
	const emailRedirectTo =
		typeof window !== "undefined"
			? `${window.location.origin}/user/signup/verify-email`
			: undefined;

	const { data, error } = await supabase.auth.signUp({
		email,
		password,
		options: {
			emailRedirectTo,
		},
	});

	if (error) {
		// 다른 에러는 그대로 throw
		throw new Error(error.message);
	}

	const user = data.user;

	// Supabase는 보안상의 이유로 이미 존재하는 이메일인지 직접 알려주지 않습니다.
	// 대신 사용자 객체를 반환하지만 identities 배열이 비어있으면 실제로는 사용자가 생성되지 않은 것입니다.
	if (user && (!user.identities || user.identities.length === 0)) {
		throw new Error("email already exists");
	} else {
		if (user && profile) {
			const { error: profileError } = await supabase
				.from(PROFILE_TABLE)
				.upsert({
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
	}

	return { user };
}
