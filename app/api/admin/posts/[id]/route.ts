import { NextRequest, NextResponse } from "next/server";

import { createClient } from "@supabase/supabase-js";

import { ensureAdminFromBearer } from "../../_lib/auth";

type PatchBody = Partial<{
	title: string;
	content: string;
	board_slug: string;
	etc1?: string | null;
	updated_at: string;
}>;

export async function PATCH(
	request: NextRequest,
	{ params }: { params: { id: string } },
) {
	const auth = await ensureAdminFromBearer(request);
	if (!auth.ok)
		return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
	const { id } = params;
	const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL;
	const SERVICE_ROLE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY;
	if (!SUPABASE_URL || !SERVICE_ROLE_KEY)
		return NextResponse.json(
			{ error: "Server not configured" },
			{ status: 500 },
		);
	const admin = createClient(SUPABASE_URL, SERVICE_ROLE_KEY);
	try {
		const body: PatchBody = await request.json();
		const updates: PatchBody = {};
		if (typeof body.title === "string") updates.title = body.title;
		if (typeof body.content === "string") updates.content = body.content;
		if (typeof body.board_slug === "string")
			updates.board_slug = body.board_slug;
		if (body.etc1 !== undefined) updates.etc1 = body.etc1;
		if (Object.keys(updates).length === 0)
			return NextResponse.json({ error: "No updates" }, { status: 400 });
		updates.updated_at = new Date().toISOString();
		const { data, error } = await admin
			.from("posts")
			.update(updates)
			.eq("id", id)
			.select()
			.single();
		if (error)
			return NextResponse.json({ error: error.message }, { status: 400 });
		return NextResponse.json({ ok: true, post: data });
	} catch (err) {
		const message = err instanceof Error ? err.message : "Unknown error";
		return NextResponse.json({ error: message }, { status: 500 });
	}
}

export async function DELETE(
	request: NextRequest,
	{ params }: { params: { id: string } },
) {
	const auth = await ensureAdminFromBearer(request);
	if (!auth.ok)
		return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
	const { id } = params;
	const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL;
	const SERVICE_ROLE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY;
	if (!SUPABASE_URL || !SERVICE_ROLE_KEY)
		return NextResponse.json(
			{ error: "Server not configured" },
			{ status: 500 },
		);
	const admin = createClient(SUPABASE_URL, SERVICE_ROLE_KEY);
	try {
		const { error } = await admin.from("posts").delete().eq("id", id);
		if (error)
			return NextResponse.json({ error: error.message }, { status: 400 });
		return NextResponse.json({ ok: true });
	} catch (err) {
		const message = err instanceof Error ? err.message : "Unknown error";
		return NextResponse.json({ error: message }, { status: 500 });
	}
}
