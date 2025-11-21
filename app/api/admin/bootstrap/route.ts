import { NextResponse } from "next/server";

import { createClient } from "@supabase/supabase-js";

export async function POST(request: Request) {
	const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL;
	const SERVICE_ROLE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY;
	const BOOTSTRAP_TOKEN = process.env.BOOTSTRAP_TOKEN;

	if (!SUPABASE_URL || !SERVICE_ROLE_KEY) {
		return NextResponse.json(
			{ error: "Server not configured" },
			{ status: 500 },
		);
	}

	// 간단 보호: Authorization: Bearer <BOOTSTRAP_TOKEN>
	const authHeader = request.headers.get("authorization") || "";
	const token = authHeader.toLowerCase().startsWith("bearer ")
		? authHeader.slice(7)
		: "";
	if (!BOOTSTRAP_TOKEN || token !== BOOTSTRAP_TOKEN) {
		return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
	}

	const admin = createClient(SUPABASE_URL, SERVICE_ROLE_KEY, {
		auth: { autoRefreshToken: false, persistSession: false },
	});

	// 기본 자격증명
	const email = "admin@admin.com";
	const password = "admin";

	try {
		const { error } = await admin.auth.admin.createUser({
			email,
			password,
			email_confirm: true,
		});
		if (error) {
			// 이미 존재하면 통과
			if (
				!String(error.message || "")
					.toLowerCase()
					.includes("already")
			) {
				return NextResponse.json({ error: error.message }, { status: 400 });
			}
		}

		return NextResponse.json({ ok: true, email });
	} catch (err) {
		const message = err instanceof Error ? err.message : "Unknown error";
		return NextResponse.json({ error: message }, { status: 500 });
	}
}
