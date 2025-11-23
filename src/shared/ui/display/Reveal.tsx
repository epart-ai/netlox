"use client";

import type { ComponentPropsWithoutRef, ElementType, ReactNode } from "react";
import { useEffect, useMemo, useRef, useState } from "react";

import { cn } from "@/shared/lib/utils";

type Direction = "up" | "down" | "left" | "right";

export type RevealProps<T extends ElementType> = {
	as?: T;
	children: ReactNode;
	className?: string;
	delayMs?: number;
	durationMs?: number;
	once?: boolean;
	threshold?: number;
	rootMargin?: string;
	from?: Direction;
	distance?: string;
} & Omit<ComponentPropsWithoutRef<T>, "as" | "children" | "className">;

export function Reveal<T extends ElementType = "div">({
	as,
	children,
	className,
	delayMs = 0,
	durationMs = 500,
	once = true,
	threshold = 0.15,
	rootMargin,
	from = "up",
	distance = "30%",
	...rest
}: RevealProps<T>) {
	const Comp = (as ?? "div") as ElementType;
	const ref = useRef<HTMLElement | null>(null);
	const [isVisible, setIsVisible] = useState(false);
	const [hasShown, setHasShown] = useState(false);
	const [prefersReduced, setPrefersReduced] = useState(false);

	useEffect(() => {
		const media = window.matchMedia?.("(prefers-reduced-motion: reduce)");
		if (!media) return;
		const update = () => setPrefersReduced(media.matches);
		update();
		media.addEventListener("change", update);
		return () => media.removeEventListener("change", update);
	}, []);

	useEffect(() => {
		if (!ref.current) return;
		if (once && hasShown) return;
		const element = ref.current;
		const observer = new IntersectionObserver(
			(entries) => {
				const entry = entries[0];
				if (entry.isIntersecting) {
					setIsVisible(true);
					if (once) {
						setHasShown(true);
						observer.unobserve(element);
					}
				} else if (!once) {
					setIsVisible(false);
				}
			},
			{ threshold, rootMargin },
		);
		observer.observe(element);
		return () => observer.disconnect();
	}, [once, threshold, rootMargin, hasShown]);

	const hiddenTransform = useMemo(() => {
		const d = prefersReduced ? "0px" : distance;
		switch (from) {
			case "down":
				return `translate3d(0, -${d}, 0)`;
			case "left":
				return `translate3d(${d}, 0, 0)`;
			case "right":
				return `translate3d(-${d}, 0, 0)`;
			case "up":
			default:
				return `translate3d(0, ${d}, 0)`;
		}
	}, [from, distance, prefersReduced]);

	const effectiveDuration = prefersReduced ? 0 : durationMs;

	return (
		<Comp
			ref={ref as never}
			className={cn(
				"opacity-0 will-change-transform",
				"transition-[opacity,transform] ease-out",
				className,
			)}
			style={{
				opacity: isVisible ? 1 : 0,
				transform: isVisible ? "translate3d(0, 0, 0)" : hiddenTransform,
				transitionDuration: `${effectiveDuration}ms`,
				transitionDelay: `${delayMs}ms`,
			}}
			{...rest}
		>
			{children}
		</Comp>
	);
}
