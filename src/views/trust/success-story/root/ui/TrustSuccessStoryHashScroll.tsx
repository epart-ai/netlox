"use client";

import { useEffect } from "react";

const scrollToHash = () => {
	const hash = window.location.hash;
	if (!hash) {
		return;
	}

	const targetId = hash.replace(/^#/, "");
	if (!targetId) {
		return;
	}

	const targetElement = document.getElementById(targetId);
	if (!targetElement) {
		return;
	}

	targetElement.scrollIntoView({ behavior: "smooth", block: "start" });
};

export const TrustSuccessStoryHashScroll = () => {
	useEffect(() => {
		if (typeof window === "undefined") {
			return;
		}

		const handleScroll = () => {
			scrollToHash();
		};

		handleScroll();
		window.addEventListener("hashchange", handleScroll);

		return () => {
			window.removeEventListener("hashchange", handleScroll);
		};
	}, []);

	return null;
};
