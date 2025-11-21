"use client";

import { createContext, useContext, useState } from "react";

import type { SupabaseClient } from "@supabase/supabase-js";

import { createClient } from "@/shared/supabase/client";

const SupabaseClientContext = createContext<SupabaseClient | null>(null);

export function SupabaseProvider({ children }: { children: React.ReactNode }) {
	const [client] = useState(() => createClient());

	return (
		<SupabaseClientContext.Provider value={client}>
			{children}
		</SupabaseClientContext.Provider>
	);
}

export function useSupabaseClient() {
	const client = useContext(SupabaseClientContext);

	if (!client) {
		throw new Error(
			"SupabaseProvider 내부에서만 Supabase 클라이언트를 사용할 수 있습니다.",
		);
	}

	return client;
}
