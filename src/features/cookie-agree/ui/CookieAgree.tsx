"use client";

import { useEffect, useState } from "react";

import Cookies from "js-cookie";

import { ROUTES } from "@/shared/config";
import { cn } from "@/shared/lib/utils";
import { Button } from "@/shared/ui/shadcn/button";

const COOKIE_NAME = "cookie_consent";

export const CookieAgree = () => {
	const [isAccepted, setIsAccepted] = useState(false);
	const [hasAccepted, setHasAccepted] = useState<boolean | null>(null);
	const [enterReady, setEnterReady] = useState(false);

	useEffect(() => {
		// 클라이언트 마운트 이후에만 쿠키 확인 (SSR/Hydration 불일치 방지)
		setHasAccepted(Cookies.get(COOKIE_NAME) != null);
	}, []);

	useEffect(() => {
		// 배너가 처음 나타날 때 슬라이드 인 애니메이션을 적용
		if (hasAccepted === false) {
			const id = requestAnimationFrame(() => setEnterReady(true));
			return () => cancelAnimationFrame(id);
		}
		setEnterReady(false);
	}, [hasAccepted]);

	// 초기 상태에서는 아무것도 렌더링하지 않아 FOUC 방지
	if (hasAccepted === null) return <></>;

	return hasAccepted ? (
		<></>
	) : (
		<div
			className={cn(
				"bg-blur fixed bottom-0 left-0 z-30 w-full border-t border-white/25 py-8 transition-transform duration-300 ease-out lg:py-12",
				isAccepted
					? "translate-y-full"
					: enterReady
						? "translate-y-0"
						: "translate-y-full",
			)}
		>
			<div className="wrapper flex h-full flex-col items-center justify-between gap-4 md:flex-row">
				<div>
					<p className="paragraph-14 md:paragraph-16">
						This website uses cookies to ensure you get the best experience.
						<br className="hidden md:block" />
						By continuing to use our site, you agree to our
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
					onClick={() => {
						// Persist acceptance for 1 year
						Cookies.set(COOKIE_NAME, "1", {
							expires: 365, // days
							path: "/",
							sameSite: "lax",
							secure: process.env.NODE_ENV === "production",
						});
						setIsAccepted(true);
						// 애니메이션 후 언마운트 (transition 300ms와 일치)
						setTimeout(() => setHasAccepted(true), 320);
					}}
				>
					Accept
				</Button>
			</div>
		</div>
	);
};
