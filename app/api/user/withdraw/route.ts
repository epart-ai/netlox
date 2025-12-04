import { NextResponse } from "next/server";
import "server-only";

import { createClient } from "@supabase/supabase-js";

import { createSupabaseServerClient } from "@/shared/supabase/server";

export const runtime = "nodejs";

export async function POST(request: Request) {
	try {
		const supabase = createSupabaseServerClient();

		// 현재 사용자 확인
		const {
			data: { user },
			error: userError,
		} = await supabase.auth.getUser();

		if (userError || !user) {
			return NextResponse.json(
				{ error: "Unauthorized" },
				{ status: 401 },
			);
		}

		// Service Role Key로 관리자 클라이언트 생성
		const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL;
		const SERVICE_ROLE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY;

		if (!SUPABASE_URL || !SERVICE_ROLE_KEY) {
			return NextResponse.json(
				{ error: "Server not configured" },
				{ status: 500 },
			);
		}

		const admin = createClient(SUPABASE_URL, SERVICE_ROLE_KEY, {
			auth: {
				autoRefreshToken: false,
				persistSession: false,
			},
		});

		// 사용자 삭제
		const { error: deleteError } = await admin.auth.admin.deleteUser(
			user.id,
		);

		if (deleteError) {
			return NextResponse.json(
				{
					error:
						"An error occurred while sending the link. Please try again.",
				},
				{ status: 500 },
			);
		}

		return NextResponse.json({ success: true });
	} catch (error) {
		console.error("Account withdrawal error:", error);
		return NextResponse.json(
			{
				error: "An error occurred while sending the link. Please try again.",
			},
			{ status: 500 },
		);
	}
}

