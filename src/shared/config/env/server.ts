import "server-only";

import { z } from "zod";

const serverEnvSchema = z.object({
	SUPABASE_SERVICE_ROLE_KEY: z.string().min(1).optional(),
	SMTP_HOST: z.string().min(1).optional(),
	SMTP_PORT: z.string().min(1).optional(),
	SMTP_USER: z.string().min(1).optional(),
	SMTP_PASS: z.string().min(1).optional(),
	CONTACT_RECIPIENT_EMAIL: z
		.string()
		.optional()
		.transform((val) => {
			if (!val) return undefined;
			// 쉼표로 구분된 이메일 주소들을 배열로 변환
			return val.split(",").map((email) => email.trim()).filter(Boolean);
		})
		.pipe(z.array(z.string().email()).optional()),
	CONTACT_FROM_EMAIL: z.string().email().optional(),
	SMTP_SECURE: z.enum(["true", "false"]).optional(),
});

const parsedServerEnv = serverEnvSchema.safeParse({
	SUPABASE_SERVICE_ROLE_KEY: process.env.SUPABASE_SERVICE_ROLE_KEY,
	SMTP_HOST: process.env.SMTP_HOST,
	SMTP_PORT: process.env.SMTP_PORT,
	SMTP_USER: process.env.SMTP_USER,
	SMTP_PASS: process.env.SMTP_PASS,
	CONTACT_RECIPIENT_EMAIL: process.env.CONTACT_RECIPIENT_EMAIL,
	CONTACT_FROM_EMAIL: process.env.CONTACT_FROM_EMAIL,
	SMTP_SECURE: process.env.SMTP_SECURE,
});

if (!parsedServerEnv.success) {
	console.error("서버 환경변수 검증 실패", parsedServerEnv.error.flatten().fieldErrors);
	throw new Error("환경변수를 확인하세요.");
}

export const serverEnv = parsedServerEnv.data;
