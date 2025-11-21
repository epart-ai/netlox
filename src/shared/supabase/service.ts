import { createClient } from "@supabase/supabase-js";
import "server-only";

import { publicEnv } from "@/shared/config/env/public";
import { serverEnv } from "@/shared/config/env/server";

export function createSupabaseServiceClient() {
	const serviceRoleKey = serverEnv.SUPABASE_SERVICE_ROLE_KEY;

	if (!serviceRoleKey) {
		throw new Error("SUPABASE_SERVICE_ROLE_KEY가 설정되어 있지 않습니다.");
	}

	return createClient(publicEnv.NEXT_PUBLIC_SUPABASE_URL, serviceRoleKey, {
		auth: {
			autoRefreshToken: false,
			persistSession: false,
		},
	});
}
