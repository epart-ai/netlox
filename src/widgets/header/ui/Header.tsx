"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";

import { ROUTES } from "@/shared/config";
import { cn } from "@/shared/lib/utils";
import { useSupabaseClient } from "@/shared/supabase";
import { Button } from "@/shared/ui/shadcn";

import { HeaderAuth } from "./HeaderAuth";

export const Header = () => {
	const [isMobileNavOpen, setIsMobileNavOpen] = useState(false);
	const pathname = usePathname();
	const prevPathRef = useRef(pathname);
	const supabase = useSupabaseClient();
	const [userEmail, setUserEmail] = useState<string | null>(null);

	useEffect(() => {
		const isDesktop = () =>
			typeof window !== "undefined" &&
			window.matchMedia("(min-width: 1024px)").matches;
		if (isMobileNavOpen && !isDesktop()) {
			document.documentElement.style.overflow = "hidden";
			document.body.style.overflow = "hidden";
		} else {
			document.documentElement.style.overflow = "";
			document.body.style.overflow = "";
		}
		return () => {
			document.documentElement.style.overflow = "";
			document.body.style.overflow = "";
		};
	}, [isMobileNavOpen]);

	useEffect(() => {
		if (prevPathRef.current !== pathname) {
			if (isMobileNavOpen) setIsMobileNavOpen(false);
			prevPathRef.current = pathname;
		}
	}, [pathname, isMobileNavOpen]);

	// 인증 상태 구독: 로그인/로그아웃 시 Header가 즉시 반영되도록
	useEffect(() => {
		let isMounted = true;

		// 초기 사용자 정보 로드
		supabase.auth.getUser().then(({ data }) => {
			if (!isMounted) return;
			setUserEmail(data.user?.email ?? null);
		});

		// 상태 변경 구독
		const {
			data: { subscription },
		} = supabase.auth.onAuthStateChange((_event, session) => {
			setUserEmail(session?.user?.email ?? null);
		});

		return () => {
			isMounted = false;
			subscription.unsubscribe();
		};
	}, [supabase]);

	const navItems = [
		{ label: "Product", href: ROUTES.PRODUCTS_OPEN_SOURCE },
		{ label: "Solutions", href: ROUTES.SOLUTIONS_AI_LLM },
		{ label: "Technology", href: ROUTES.TECHNOLOGY_FEATURES },
		{ label: "Trust", href: ROUTES.TRUST_SUCCESS_STORY },
		{ label: "Business", href: ROUTES.BUSINESS_PRICING },
		{ label: "Resource", href: ROUTES.RESOURCE_DOCUMENTATION },
	];

	return (
		<header className={cn("fixed top-0 z-50 w-full shadow-y-1")}>
			<div className={cn("bg-blur relative z-10 border-b border-white/25")}>
				<div className="wrapper">
					<div
						className={cn(
							"relative flex h-header items-center justify-center lg:justify-between",
						)}
					>
						<button
							className="h-4 w-5 absolute-center-left lg:hidden"
							type="button"
							aria-label="Open mobile navigation"
							aria-expanded={isMobileNavOpen}
							onClick={() => setIsMobileNavOpen((v) => !v)}
						>
							<span
								className={cn(
									"transform-origin-center pointer-events-none absolute left-0 top-1/2 h-[1px] w-full -translate-y-2 bg-white/75",
									"lg:transform-none",
									isMobileNavOpen ? "translate-y-0 rotate-45" : "",
								)}
							></span>
							<span
								className={cn(
									"pointer-events-none absolute left-0 top-1/2 h-[1px] w-full bg-white/75",
									"lg:opacity-100",
									isMobileNavOpen ? "opacity-0" : "opacity-100",
								)}
							></span>
							<span
								className={cn(
									"transform-origin-center pointer-events-none absolute left-0 top-1/2 h-[1px] w-full translate-y-2 bg-white/75",
									"lg:transform-none",
									isMobileNavOpen ? "!translate-y-0 -rotate-45" : "",
								)}
							></span>
						</button>
						<h1>
							<a className="relative z-20" href="/" aria-label="Go to homepage">
								<Image
									className="h-auto w-[120px] md:w-[150px] lg:w-[180px]"
									alt="Logo"
									src="/images/common/logo.svg"
									width={120}
									height={20}
								/>
							</a>
							<span className="hidden">NetLOX</span>
						</h1>
					</div>
				</div>
			</div>
			<div
				className={cn(
					"bg-blur absolute flex h-[calc(100vh-var(--header-h))] w-[60vw] max-w-[320px] transform flex-col justify-between border-r-[1px] border-white/25 py-10 shadow-x-1 transition-transform duration-300 ease-out",
					"lg:pointer-events-none lg:static lg:z-20 lg:h-auto lg:w-full lg:max-w-none lg:transform-none lg:border-none lg:bg-transparent lg:p-0 lg:shadow-none lg:backdrop-blur-none lg:backdrop-brightness-100 lg:absolute-center lg:[backdrop-filter:none]",

					isMobileNavOpen ? "translate-x-0" : "-translate-x-[calc(100vw+5vw)]",
				)}
				aria-hidden={!isMobileNavOpen}
			>
				<div className="wrapper flex h-full flex-col justify-between lg:flex">
					<nav
						className="lg:pointer-events-auto lg:absolute-center"
						aria-label="Main navigation"
					>
						<ul className="flex flex-col items-center gap-8 lg:flex-row">
							{navItems.map((item) => (
								<li key={item.label}>
									<Link href={item.href} className="paragraph-18 font-medium">
										{item.label}
									</Link>
								</li>
							))}
						</ul>
					</nav>
					<div className="flex flex-wrap items-center justify-center lg:pointer-events-auto lg:ml-auto">
						<HeaderAuth userEmail={userEmail} />

						<Button
							asChild
							variant="primary"
							type="button"
							aria-label="Sign up for an account"
						>
							<Link href={ROUTES.USER_SIGNUP}>Sign Up</Link>
						</Button>
					</div>
				</div>
			</div>
		</header>
	);
};
