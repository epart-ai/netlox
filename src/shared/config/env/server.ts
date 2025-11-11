import "server-only";

import { z } from "zod";

const serverEnvSchema = z.object({
	SUPABASE_SERVICE_ROLE_KEY: z.string().min(1).optional(),
});

const parsedServerEnv = serverEnvSchema.safeParse({
	SUPABASE_SERVICE_ROLE_KEY: process.env.SUPABASE_SERVICE_ROLE_KEY,
});

if (!parsedServerEnv.success) {
	console.error("서버 환경변수 검증 실패", parsedServerEnv.error.flatten().fieldErrors);
	throw new Error("SUPABASE_SERVICE_ROLE_KEY 환경변수를 확인하세요.");
}

export const serverEnv = parsedServerEnv.data;

