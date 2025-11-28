"use client";

import { useEffect, useMemo, useRef, useState } from "react";

type AnimatedCounterProps = {
	/** 최종 값 */
	value: number;
	/** 애니메이션 지속 시간(ms) */
	durationMs?: number;
	/** 뷰포트 진입 임계값(0~1). 기본: 0.5 (요소의 50%) */
	threshold?: number;
	/** 접근성용 레이블(미지정 시 value 사용) */
	ariaLabel?: string;
	/** 표시할 소수 자릿수(미지정 시 value의 소수 자릿수 추론) */
	decimals?: number;
	className?: string;
};

/** easeOutCubic */
function easeOutCubic(x: number) {
	return 1 - (1 - x) ** 3;
}

export function AnimatedCounter({
	value,
	durationMs = 1200,
	threshold = 0.5,
	decimals,
	className,
}: AnimatedCounterProps) {
	const containerRef = useRef<HTMLSpanElement | null>(null);
	const [hasStarted, setHasStarted] = useState(false);
	const [displayValue, setDisplayValue] = useState(0);

	const prefersReducedMotion = useMemo(() => {
		if (typeof window === "undefined") return false;
		return (
			window.matchMedia?.("(prefers-reduced-motion: reduce)").matches ?? false
		);
	}, []);

	const resolvedFractionDigits = useMemo(() => {
		if (typeof decimals === "number" && decimals >= 0) return decimals;
		const s = String(value);
		const dot = s.indexOf(".");
		return dot >= 0 ? s.length - dot - 1 : 0;
	}, [decimals, value]);

	useEffect(() => {
		const el = containerRef.current;
		if (!el) return;

		if (prefersReducedMotion) {
			setDisplayValue(value);
			return;
		}

		const observer = new IntersectionObserver(
			(entries) => {
				for (const entry of entries) {
					if (entry.isIntersecting && !hasStarted) {
						setHasStarted(true);
					}
				}
			},
			{ threshold },
		);

		observer.observe(el);
		return () => observer.disconnect();
	}, [threshold, prefersReducedMotion, hasStarted, value]);

	useEffect(() => {
		if (!hasStarted) return;
		if (prefersReducedMotion) {
			setDisplayValue(value);
			return;
		}

		let rafId = 0;
		const startTs = performance.now();

		const tick = (now: number) => {
			const elapsed = now - startTs;
			const progress = Math.min(1, elapsed / durationMs);
			const eased = easeOutCubic(progress);
			const raw = eased * value;
			const next =
				resolvedFractionDigits > 0
					? Number(raw.toFixed(resolvedFractionDigits))
					: Math.round(raw);
			setDisplayValue(next);
			if (progress < 1) {
				rafId = requestAnimationFrame(tick);
			}
		};

		rafId = requestAnimationFrame(tick);
		return () => cancelAnimationFrame(rafId);
	}, [
		hasStarted,
		durationMs,
		value,
		prefersReducedMotion,
		resolvedFractionDigits,
	]);

	return (
		<span ref={containerRef} className={className}>
			{displayValue}
		</span>
	);
}
