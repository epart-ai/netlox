"use client";

import { cn } from "@/shared/lib/utils";

export default function TopButton() {
	return (
		<div className={cn("sticky bottom-0 right-0 flex w-full justify-end")}>
			<button
				type="button"
				className="absolute bottom-3 right-2 flex size-9 items-center justify-center rounded-lg bg-blue-40 text-white lg:bottom-4 lg:right-4 lg:size-12"
				onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
			>
				↑
			</button>
		</div>
	);
}
