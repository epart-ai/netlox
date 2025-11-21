"use client";

import dynamic from "next/dynamic";
import { useState } from "react";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const ReactQueryDevtools = dynamic(
	() =>
		import("@tanstack/react-query-devtools").then((m) => m.ReactQueryDevtools),
	{ ssr: false },
);

export function QueryProvider({ children }: { children: React.ReactNode }) {
	const [queryClient] = useState(
		() =>
			new QueryClient({
				defaultOptions: {
					queries: {
						staleTime: 60 * 1000,
						retry: 1,
					},
				},
			}),
	);

	return (
		<QueryClientProvider client={queryClient}>
			{children}
			{process.env.NODE_ENV !== "production" ? (
				<ReactQueryDevtools initialIsOpen={false} />
			) : null}
		</QueryClientProvider>
	);
}
