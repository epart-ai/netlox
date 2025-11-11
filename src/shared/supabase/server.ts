import "server-only";

import { createServerClient, type CookieOptions } from "@supabase/ssr";
import type { SupabaseClient } from "@supabase/supabase-js";
import { cookies } from "next/headers";

import { publicEnv } from "@/shared/config/env/public";

export const createSupabaseServerClient = (): SupabaseClient => {
	const cookieStore = cookies();

	return createServerClient(
		publicEnv.NEXT_PUBLIC_SUPABASE_URL,
		publicEnv.NEXT_PUBLIC_SUPABASE_ANON_KEY,
		{
			cookies: {
				get(name: string) {
					return cookieStore.get(name)?.value;
				},
				set(name: string, value: string, options: CookieOptions) {
					try {
						cookieStore.set({ name, value, ...options });
					} catch {
						// Server Component에서는 set/delete가 허용되지 않을 수 있음
					}
				},
				remove(name: string, options: CookieOptions) {
					try {
						cookieStore.delete({ name, ...options });
					} catch {
						// Server Component에서는 set/delete가 허용되지 않을 수 있음
					}
				},
			},
		},
	);
};

