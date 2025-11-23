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
		const raw = error.message?.toLowerCase?.() ?? "";
		// 미인증 계정
		if (
			raw.includes("not confirmed") ||
			raw.includes("confirm") ||
			raw.includes("verify")
		) {
			throw new Error("Please verify your email to log in.");
		}
		// 자격 증명 오류
		if (
			raw.includes("invalid login credentials") ||
			raw.includes("invalid email or password") ||
			raw.includes("invalid credentials") ||
			raw.includes("invalid_grant")
		) {
			throw new Error("Incorrect email or password. Please try again.");
		}
		// 일반 오류
		throw new Error("로그인에 실패했습니다.");
	}

	return { user: data.user };
}
