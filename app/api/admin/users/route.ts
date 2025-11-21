import { NextResponse } from "next/server";

import { createClient } from "@supabase/supabase-js";

import { ensureAdminFromBearer } from "../_lib/auth";

type UpdateRolePayload = {
	userId?: string;
	role?: string;
};

export async function GET(request: Request) {
	const auth = await ensureAdminFromBearer(request);
	if (!auth.ok)
		return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
	const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL;
	const SERVICE_ROLE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY;
	if (!SUPABASE_URL || !SERVICE_ROLE_KEY)
		return NextResponse.json(
			{ error: "Server not configured" },
			{ status: 500 },
		);
	const admin = createClient(SUPABASE_URL, SERVICE_ROLE_KEY);
	const { searchParams } = new URL(request.url);
	const page = parseInt(searchParams.get("page") || "1", 10);
	const perPage = parseInt(searchParams.get("perPage") || "20", 10);
	const query = (searchParams.get("query") || "").trim();
	try {
		const { data, error } = await admin.auth.admin.listUsers({ page, perPage });
		if (error)
			return NextResponse.json({ error: error.message }, { status: 400 });
		const users = data?.users ?? [];
		if (query) {
			const q = query.toLowerCase();
			const filtered = users.filter((user) =>
				(user.email || "").toLowerCase().includes(q),
			);
			return NextResponse.json({
				users: filtered,
				page,
				perPage,
				total: filtered.length,
			});
		}
		return NextResponse.json({
			users,
			page,
			perPage,
			total: data?.total ?? users.length,
		});
	} catch (err) {
		const message = err instanceof Error ? err.message : "Unknown error";
		return NextResponse.json({ error: message }, { status: 500 });
	}
}

export async function POST(request: Request) {
	const auth = await ensureAdminFromBearer(request);
	if (!auth.ok)
		return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
	const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL;
	const SERVICE_ROLE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY;
	if (!SUPABASE_URL || !SERVICE_ROLE_KEY)
		return NextResponse.json(
			{ error: "Server not configured" },
			{ status: 500 },
		);
	const admin = createClient(SUPABASE_URL, SERVICE_ROLE_KEY);
	try {
		const body: UpdateRolePayload = await request.json();
		const { userId, role } = body;
		if (!userId || role === undefined)
			return NextResponse.json({ error: "Invalid payload" }, { status: 400 });
		// 빈 문자열은 일반 사용자(역할 없음)로 처리 - null로 저장
		const roleValue = role === "" ? null : role;
		const { data, error } = await admin.auth.admin.updateUserById(userId, {
			app_metadata: { role: roleValue },
		});
		if (error)
			return NextResponse.json({ error: error.message }, { status: 400 });
		return NextResponse.json({ ok: true, user: data.user ?? data });
	} catch (err) {
		const message = err instanceof Error ? err.message : "Unknown error";
		return NextResponse.json({ error: message }, { status: 500 });
	}
}
