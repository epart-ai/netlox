"use client";

import Image from "next/image";
import { useEffect, useState } from "react";

import { cn } from "@/shared/lib/utils";
import { Button } from "@/shared/ui";

const Header = () => {
	const [isMobileNavOpen, setIsMobileNavOpen] = useState(false);

	// Lock body scroll when mobile nav is open (mobile only)
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

	const navItems = [
		{ label: "Product", href: "#product" },
		{ label: "Solutions", href: "#solutions" },
		{ label: "Technology", href: "#technology" },
		{ label: "Trust", href: "#trust" },
		{ label: "Business", href: "#business" },
		{ label: "Resource", href: "#resource" },
	];

	return (
		<header className={cn("shadow-y-1 fixed top-0 z-50 w-full")}>
			<div className={cn("bg-blur relative z-10 border-b border-border")}>
				<div className="wrapper">
					<div
						className={cn(
							"relative flex h-15 items-center justify-center lg:h-20 lg:justify-between",
						)}
					>
						<button
							className="absolute left-0 top-5 h-4 w-5 lg:hidden"
							type="button"
							aria-label="Open mobile navigation"
							aria-expanded={isMobileNavOpen}
							onClick={() => setIsMobileNavOpen((v) => !v)}
						>
							<span
								className={cn(
									"transform-origin-center pointer-events-none absolute left-0 top-1/2 h-[1px] w-full -translate-y-2 bg-paragraph",
									"lg:transform-none",
									isMobileNavOpen ? "translate-y-0 rotate-45" : "",
								)}
							></span>
							<span
								className={cn(
									"pointer-events-none absolute left-0 top-1/2 h-[1px] w-full bg-paragraph",
									"lg:opacity-100",
									isMobileNavOpen ? "opacity-0" : "opacity-100",
								)}
							></span>
							<span
								className={cn(
									"transform-origin-center pointer-events-none absolute left-0 top-1/2 h-[1px] w-full translate-y-2 bg-paragraph",
									"lg:transform-none",
									isMobileNavOpen ? "!translate-y-0 -rotate-45" : "",
								)}
							></span>
						</button>
						<a className="relative z-20" href="/" aria-label="Go to homepage">
							<Image
								className="h-auto w-[120px] lg:w-[140px] lg:w-[180px]"
								alt="Logo"
								src="/images/logo.svg"
								width={120}
								height={20}
							/>
						</a>
					</div>
				</div>
			</div>
			<div
				aria-label="Mobile navigation wrapper"
				className={cn(
					"shadow-x-1 bg-blur absolute flex h-[calc(100vh-theme(height.15)-1px)] w-[60vw] max-w-[320px] transform flex-col justify-between border-r-[1px] border-border py-10 transition-transform duration-300 ease-out",
					"lg:pointer-events-none lg:static lg:z-20 lg:h-auto lg:w-full lg:max-w-none lg:transform-none lg:border-none lg:bg-transparent lg:p-0 lg:shadow-none lg:backdrop-blur-none lg:backdrop-brightness-100 lg:absolute-center lg:[-webkit-backdrop-filter:none]",

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
									<a href={item.href} className="paragraph-18 font-medium">
										{item.label}
									</a>
								</li>
							))}
						</ul>
					</nav>
					<div className="flex flex-wrap items-center justify-center lg:pointer-events-auto lg:justify-end">
						<Button
							variant="text"
							sm={true}
							md={true}
							className="paragraph-16 font-medium"
							type="button"
							aria-label="Login to your account"
						>
							Login
						</Button>
						<Button
							variant="primary"
							sm={true}
							md={true}
							lg={true}
							type="button"
							aria-label="Sign up for an account"
						>
							<span className="">Sign Up</span>
						</Button>
					</div>
				</div>
			</div>
		</header>
	);
};

export default Header;
