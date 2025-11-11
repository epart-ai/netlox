"use client";

import { QueryProvider } from "@/app/providers/query-provider";
import { SupabaseProvider } from "@/shared/supabase";

export function AppProviders({ children }: { children: React.ReactNode }) {
	return (
		<SupabaseProvider>
			<QueryProvider>{children}</QueryProvider>
		</SupabaseProvider>
	);
}
