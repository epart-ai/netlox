"use client";

import { cn } from "@/shared/lib/utils";

export default function TopButton() {
	return (
		<div className={cn("sticky bottom-0 right-0 flex w-full justify-end p-4")}>
			<button
				type="button"
				className="flex size-12 items-center justify-center rounded-lg bg-blue-40 text-white"
				onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
			>
				↑
			</button>
		</div>
	);
}
