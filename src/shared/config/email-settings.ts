import "server-only";

import { createSupabaseServiceClient } from "@/shared/supabase/service";

export type EmailSettings = {
	id: string;
	smtp_host: string | null;
	smtp_port: string | null;
	smtp_user: string | null;
	smtp_pass: string | null;
	contact_recipient_email: string | null;
	contact_from_email: string | null;
	smtp_secure: string | null;
	created_at: string;
	updated_at: string;
};

export type EmailSettingsInput = {
	smtp_host?: string | null;
	smtp_port?: string | null;
	smtp_user?: string | null;
	smtp_pass?: string | null;
	contact_recipient_email?: string | null;
	contact_from_email?: string | null;
	smtp_secure?: string | null;
};

/**
 * Email 설정을 조회합니다. (단일 레코드)
 */
export async function getEmailSettings(): Promise<EmailSettings | null> {
	const supabase = createSupabaseServiceClient();
	const { data, error } = await supabase
		.from("email_settings")
		.select("*")
		.order("created_at", { ascending: false })
		.limit(1)
		.single();

	if (error) {
		// 레코드가 없는 경우 null 반환
		if (error.code === "PGRST116") {
			return null;
		}
		throw new Error(`이메일 설정 조회 실패: ${error.message}`);
	}

	return data;
}

/**
 * Email 설정을 저장/업데이트합니다. (단일 레코드만 유지)
 */
export async function upsertEmailSettings(
	input: EmailSettingsInput,
): Promise<EmailSettings> {
	const supabase = createSupabaseServiceClient();

	// 기존 레코드 확인
	const existing = await getEmailSettings();

	const payload: EmailSettingsInput & { updated_at?: string } = {
		...input,
		updated_at: new Date().toISOString(),
	};

	if (existing) {
		// 기존 레코드 업데이트
		const { data, error } = await supabase
			.from("email_settings")
			.update(payload)
			.eq("id", existing.id)
			.select()
			.single();

		if (error) {
			throw new Error(`이메일 설정 업데이트 실패: ${error.message}`);
		}

		return data;
	}

	// 새 레코드 생성
	const { data, error } = await supabase
		.from("email_settings")
		.insert(payload)
		.select()
		.single();

	if (error) {
		throw new Error(`이메일 설정 생성 실패: ${error.message}`);
	}

	return data;
}
