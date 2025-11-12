"use client";

import { createBrowserClient } from "@supabase/ssr";

export function createClient() {
	const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
	const anonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
  
	if (!url || !anonKey) {
		throw new Error("Supabase public 환경변수가 설정되어 있지 않습니다.");
	}

	return createBrowserClient(url, anonKey);
}
