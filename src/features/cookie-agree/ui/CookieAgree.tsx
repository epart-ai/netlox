"use client";

import { useState } from "react";

import { ROUTES } from "@/shared/config";
import { cn } from "@/shared/lib/utils";
import { Button } from "@/shared/ui/shadcn";

export const CookieAgree = () => {
	const [isAccepted, setIsAccepted] = useState(false);

	return (
		<div
			className={cn(
				"bg-blur fixed bottom-0 left-0 z-30 w-full border-t border-white/25 py-8 transition-transform duration-300 ease-out lg:py-12",
				isAccepted ? "translate-y-full" : "translate-y-0",
			)}
		>
			<div className="wrapper h-full">
				<div className="wrapper flex h-full flex-col items-center justify-between gap-4 md:flex-row">
					<div>
						<p className="paragraph-14 md:paragraph-16">
							This website uses cookies to ensure you get the best experience.
							<br className="hidden md:block" /> {""}
							By continuing to use our site, you agree to our {""}
							<a
								href={ROUTES.COOKIE_POLICY}
								className="font-bold text-blue-20/75 underline"
							>
								Cookie Policy
							</a>
							.
						</p>
					</div>
					<Button
						variant="primary"
						onClick={() => {
							console.log("clcik");

							setIsAccepted(true);
						}}
					>
						Accept
					</Button>
				</div>
			</div>
		</div>
	);
};
