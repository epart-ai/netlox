import { NextResponse } from "next/server";

import { createClient } from "@supabase/supabase-js";

import { ensureAdminFromBearer } from "../_lib/auth";

type AttachmentPayload = {
	file_url: string;
	file_name?: string | null;
	file_size?: number | null;
	mime_type?: string | null;
};

type CreateAttachmentsBody = {
	postId?: string;
	files?: AttachmentPayload[];
};

export async function POST(request: Request) {
	const auth = await ensureAdminFromBearer(request);

	if (!auth.ok) {
		return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
	}

	const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
	const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

	if (!supabaseUrl || !serviceRoleKey) {
		return NextResponse.json(
			{ error: "Server not configured" },
			{ status: 500 },
		);
	}

	try {
		const body: CreateAttachmentsBody = await request.json();
		const postId = body.postId?.trim();
		const files = Array.isArray(body.files) ? body.files : [];

		if (!postId || files.length === 0) {
			return NextResponse.json(
				{ error: "Missing post or files" },
				{ status: 400 },
			);
		}

		const payload = files.map((file) => ({
			post_id: postId,
			file_url: file.file_url,
			file_name: file.file_name ?? null,
			file_size: file.file_size ?? null,
			mime_type: file.mime_type ?? null,
		}));

		const client = createClient(supabaseUrl, serviceRoleKey, {
			auth: {
				autoRefreshToken: false,
				persistSession: false,
				detectSessionInUrl: false,
			},
		});

		const { data, error } = await client
			.from("attachments")
			.insert(payload)
			.select("*");

		if (error) {
			return NextResponse.json({ error: error.message }, { status: 400 });
		}

		return NextResponse.json({ ok: true, attachments: data }, { status: 201 });
	} catch (error) {
		const message = error instanceof Error ? error.message : "Unknown error";
		return NextResponse.json({ error: message }, { status: 500 });
	}
}
