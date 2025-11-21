import { NextResponse } from "next/server";

import {
	type EmailSettingsInput,
	getEmailSettings,
	upsertEmailSettings,
} from "@/shared/config/email-settings";

import { ensureAdminFromBearer } from "../_lib/auth";

export async function GET(request: Request) {
	const auth = await ensureAdminFromBearer(request);
	if (!auth.ok) {
		return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
	}

	try {
		const settings = await getEmailSettings();
		return NextResponse.json({ settings });
	} catch (error) {
		const message = error instanceof Error ? error.message : "Unknown error";
		return NextResponse.json({ error: message }, { status: 500 });
	}
}

export async function PUT(request: Request) {
	const auth = await ensureAdminFromBearer(request);
	if (!auth.ok) {
		return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
	}

	try {
		const body: EmailSettingsInput = await request.json();

		// 빈 문자열을 null로 변환
		const input: EmailSettingsInput = {
			smtp_host: body.smtp_host?.trim() || null,
			smtp_port: body.smtp_port?.trim() || null,
			smtp_user: body.smtp_user?.trim() || null,
			smtp_pass: body.smtp_pass?.trim() || null,
			contact_recipient_email: body.contact_recipient_email?.trim() || null,
			contact_from_email: body.contact_from_email?.trim() || null,
			smtp_secure: body.smtp_secure || null,
		};

		const settings = await upsertEmailSettings(input);
		return NextResponse.json({ ok: true, settings });
	} catch (error) {
		const message = error instanceof Error ? error.message : "Unknown error";
		return NextResponse.json({ error: message }, { status: 500 });
	}
}
