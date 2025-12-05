"use client";

import Image from "next/image";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";

import { ChevronDownIcon } from "lucide-react";

import { ROUTES } from "@/shared/config";
import { cn } from "@/shared/lib/utils";
import { logoWidth } from "@/shared/styles/snippets";
import { useSupabaseClient } from "@/shared/supabase";
import { TextLink } from "@/shared/ui/navigation";

import { HeaderAuth } from "./HeaderAuth";

export const Header = () => {
	const [isMobileNavOpen, setIsMobileNavOpen] = useState(false);
	const [openMobileIndex, setOpenMobileIndex] = useState<number | false>(false);
	const pathname = usePathname();
	const prevPathRef = useRef(pathname);
	const supabase = useSupabaseClient();
	const [userEmail, setUserEmail] = useState<string | null>(null);
	const [isDesktop, setIsDesktop] = useState(false);

	// 데스크탑 해상도 감지 및 구독
	useEffect(() => {
		if (typeof window === "undefined") return;
		const mq = window.matchMedia("(min-width: 1024px)");
		const handleChange = (e: MediaQueryListEvent) => {
			setIsDesktop(e.matches);
		};
		// 초기 상태 설정
		setIsDesktop(mq.matches);
		// 구독
		if (typeof mq.addEventListener === "function") {
			mq.addEventListener("change", handleChange);
			return () => {
				mq.removeEventListener("change", handleChange);
			};
		} else {
			const legacyMq = mq as MediaQueryList & {
				addListener: (listener: (e: MediaQueryListEvent) => void) => void;
				removeListener: (listener: (e: MediaQueryListEvent) => void) => void;
			};
			legacyMq.addListener(handleChange);
			return () => {
				legacyMq.removeListener(handleChange);
			};
		}
	}, []);

	useEffect(() => {
		if (isMobileNavOpen && !isDesktop) {
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
	}, [isMobileNavOpen, isDesktop]);

	useEffect(() => {
		if (prevPathRef.current !== pathname) {
			if (isMobileNavOpen) setIsMobileNavOpen(false);
			prevPathRef.current = pathname;
		}
	}, [pathname, isMobileNavOpen]);

	// 모바일 내비 닫힐 때 아코디언도 닫기
	useEffect(() => {
		if (!isMobileNavOpen) {
			setOpenMobileIndex(false);
		}
	}, [isMobileNavOpen]);

	// 데스크탑 해상도가 되면 아코디언 초기화
	useEffect(() => {
		if (isDesktop) {
			setOpenMobileIndex(false);
		}
	}, [isDesktop]);

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
		{
			label: "Product",
			href: ROUTES.PRODUCTS_ENTERPRISE,
			children: [
				{ label: "Enterprise", href: ROUTES.PRODUCTS_ENTERPRISE },
				{ label: "Premium", href: ROUTES.PRODUCTS_PREMIUM },
				{ label: "SaaS", href: ROUTES.PRODUCTS_SAAS },
				{ label: "Open Source", href: ROUTES.PRODUCTS_OPEN_SOURCE },
			],
		},
		{
			label: "Solutions",
			href: ROUTES.SOLUTIONS_AI_LLM,
			children: [
				{ label: "AI & LLM", href: ROUTES.SOLUTIONS_AI_LLM },
				{ label: "Kubernetes", href: ROUTES.SOLUTIONS_KUBERNETES },
				{ label: "5G Telco", href: ROUTES.SOLUTIONS_5G_TELCO },
				{ label: "Edge Computing", href: ROUTES.SOLUTIONS_EDGE_COMPUTING },
			],
		},
		{
			label: "Technology",
			href: ROUTES.TECHNOLOGY_FEATURES,
			children: [
				{ label: "Features", href: ROUTES.TECHNOLOGY_FEATURES },
				{ label: "Performance", href: ROUTES.TECHNOLOGY_PERFORMANCE },
			],
		},
		{
			label: "Trust",
			href: ROUTES.TRUST_SUCCESS_STORY,
			children: [{ label: "Success Story", href: ROUTES.TRUST_SUCCESS_STORY }],
		},
		{
			label: "Business",
			href: ROUTES.BUSINESS_PRICING,
			children: [
				{ label: "Pricing", href: ROUTES.BUSINESS_PRICING },
				{ label: "Contact", href: ROUTES.BUSINESS_CONTACT },
			],
		},
		{
			label: "Resource",
			href: ROUTES.RESOURCE_DOCUMENTATION,
			children: [
				{ label: "Documentation", href: ROUTES.RESOURCE_DOCUMENTATION },
				{ label: "Blog", href: ROUTES.RESOURCE_BLOG },
				{ label: "News", href: ROUTES.RESOURCE_NEWS },
			],
		},
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
									className={logoWidth}
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
					"bg-blur absolute flex h-[calc(100dvh-var(--header-h))] w-[60vw] max-w-[320px] transform flex-col justify-between overflow-y-auto border-r-[1px] border-white/25 shadow-x-1 transition-transform duration-300 ease-out lg:overflow-visible",
					"lg:pointer-events-none lg:static lg:z-20 lg:h-full lg:w-full lg:max-w-none lg:transform-none lg:border-none lg:bg-transparent lg:shadow-none lg:backdrop-blur-none lg:backdrop-brightness-100 lg:absolute-center lg:[backdrop-filter:none]",

					isMobileNavOpen ? "translate-x-0" : "-translate-x-[calc(100vw+5vw)]",
				)}
				aria-hidden={!isMobileNavOpen}
			>
				<div className="wrapper flex flex-1 flex-col justify-between gap-10 py-10 lg:flex lg:py-0">
					<nav
						className="lg:pointer-events-auto lg:h-full lg:absolute-center"
						aria-label="Main navigation"
					>
						<ul className="navigation-list lg:flex lg:h-full lg:items-center lg:gap-8">
							{navItems.map((item, idx) => (
								<li
									key={item.label}
									className="group relative w-full lg:h-full"
								>
									<TextLink
										href={item.href}
										label={item.label}
										size="lg"
										colors="white75"
										className="w-full justify-between py-4 font-medium group-hover:text-white lg:h-full"
										onClick={(e) => {
											const hasChildren =
												Array.isArray(item.children) &&
												item.children.length > 0;
											if (hasChildren && !isDesktop) {
												e.preventDefault();
												setOpenMobileIndex((v) => (v === idx ? false : idx));
											}
										}}
										rightIcon={
											<ChevronDownIcon
												className={cn(
													"size-4 transition-transform duration-200 lg:hidden",
													openMobileIndex === idx ? "rotate-180" : "",
												)}
											/>
										}
									/>
									{Array.isArray(item.children) && item.children.length > 0 && (
										<div
											className={cn(
												"from-white/8 -mx-[5vw] mb-4 grid border-white/25 bg-gradient-to-b to-white/0 px-[10vw] backdrop-blur-md",
												"grid-rows-[0fr] overflow-hidden transition-[grid-template-rows] duration-300 ease-out",
												// Desktop dropdown position and animation
												"lg:pointer-events-none lg:absolute lg:left-1/2 lg:top-full lg:z-50 lg:m-0 lg:block lg:w-40 lg:-translate-x-1/2 lg:-translate-y-2 lg:rounded-md lg:border lg:px-0 lg:py-3.5 lg:opacity-0 lg:group-hover:pointer-events-auto lg:group-hover:opacity-100",
												// Mobile accordion animation
												openMobileIndex === idx
													? "grid-rows-[1fr] border-b border-t"
													: "",
											)}
											aria-hidden={openMobileIndex !== idx}
										>
											<ul className="min-h-0 overflow-hidden">
												{item.children.map((child) => (
													<li key={child.label} className="whitespace-nowrap">
														<TextLink
															href={child.href}
															label={child.label}
															size="md"
															colors="white75"
															className="w-full py-3.5 font-medium lg:justify-center"
														/>
													</li>
												))}
											</ul>
										</div>
									)}
								</li>
							))}
						</ul>
					</nav>
					<HeaderAuth userEmail={userEmail} />
				</div>
			</div>
		</header>
	);
};
