import { NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

import { ensureAdminFromBearer } from "../_lib/auth";

type CreatePostBody = {
	title?: string;
	content?: string;
	board_slug?: string;
	etc1?: string | null;
	etc2?: string | null;
	etc3?: string | null;
	etc4?: string | null;
	etc5?: string | null;
};

export async function POST(request: Request) {
	const auth = await ensureAdminFromBearer(request);

	if (!auth.ok) {
		return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
	}

	try {
		const body: CreatePostBody = await request.json();
		const title = body.title?.trim() ?? "";
		const content = body.content?.trim() ?? "";
		const boardSlug = body.board_slug?.trim() ?? "";
		if (!title || !content || !boardSlug) {
			return NextResponse.json({ error: "Missing fields" }, { status: 400 });
		}

		const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
		const anonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

		if (!supabaseUrl || !anonKey) {
			return NextResponse.json({ error: "Server not configured" }, { status: 500 });
		}

		const client = createClient(supabaseUrl, anonKey, {
			global: {
				headers: {
					Authorization: `Bearer ${auth.token}`,
				},
			},
			auth: {
				autoRefreshToken: false,
				persistSession: false,
				detectSessionInUrl: false,
			},
		});

		const insertPayload = {
			title,
			content,
			board_slug: boardSlug,
			etc1: body.etc1 ?? null,
			etc2: body.etc2 ?? null,
			etc3: body.etc3 ?? null,
			etc4: body.etc4 ?? null,
			etc5: body.etc5 ?? null,
			author_id: auth.user.id,
			author_name: auth.user.email?.split("@")[0] ?? "admin",
			views: 0,
		};

		const { data, error } = await client.from("posts").insert(insertPayload).select("*").single();

		if (error) {
			return NextResponse.json({ error: error.message }, { status: 400 });
		}

		return NextResponse.json({ ok: true, post: data }, { status: 201 });
	} catch (error) {
		const message = error instanceof Error ? error.message : "Unknown error";
		return NextResponse.json({ error: message }, { status: 500 });
	}
}
