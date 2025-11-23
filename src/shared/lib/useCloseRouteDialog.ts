"use client";

import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useCallback } from "react";

export function useCloseRouteDialog() {
	const router = useRouter();
	const pathname = usePathname();
	const searchParams = useSearchParams();

	return useCallback(() => {
		if (!pathname) {
			router.back();
			return;
		}
		if (searchParams?.has("dialog")) {
			const params = new URLSearchParams(searchParams.toString());
			params.delete("dialog");
			const next = params.toString();
			const href = next ? `${pathname}?${next}` : pathname;
			router.replace(href);
		} else {
			router.back();
		}
	}, [pathname, router, searchParams]);
}
