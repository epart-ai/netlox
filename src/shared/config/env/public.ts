import { z } from "zod";

const publicEnvSchema = z.object({
	NEXT_PUBLIC_SUPABASE_URL: z.string().url(),
	NEXT_PUBLIC_SUPABASE_ANON_KEY: z.string().min(1),
});

const parsedPublicEnv = publicEnvSchema.safeParse({
	NEXT_PUBLIC_SUPABASE_URL: process.env.NEXT_PUBLIC_SUPABASE_URL,
	NEXT_PUBLIC_SUPABASE_ANON_KEY: process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
});

if (!parsedPublicEnv.success) {
	console.error(
		"공개 환경변수 검증 실패",
		parsedPublicEnv.error.flatten().fieldErrors,
	);
	throw new Error("NEXT_PUBLIC_SUPABASE_* 환경변수를 확인하세요.");
}

export const publicEnv = parsedPublicEnv.data;
