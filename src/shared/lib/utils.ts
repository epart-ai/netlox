import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
	return twMerge(clsx(inputs));
}

export function isPathnameMatched(
	pathname: string,
	patterns: Array<string | RegExp>,
): boolean {
	return patterns.some((pattern) =>
		typeof pattern === "string" ? pattern === pathname : pattern.test(pathname),
	);
}

export function isDesktopViewport(): boolean {
	return (
		typeof window !== "undefined" &&
		window.matchMedia("(min-width: 1024px)").matches
	);
}
