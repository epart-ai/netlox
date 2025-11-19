"use client";

import { useSearchParams } from "next/navigation";

import { RouteDialog } from "@/shared/ui/overlays";
import { ForgotPasswordPanel } from "@/views/user/forgot-password/ui";
import { LoginPanel } from "@/views/user/login/ui";

export default function DialogSlotDefault() {
	const searchParams = useSearchParams();
	const dialog = searchParams?.get("dialog");

	if (!dialog) return null;

	switch (dialog) {
		case "login":
			return (
				<RouteDialog>
					<LoginPanel />
				</RouteDialog>
			);
		case "forgot-password":
			return (
				<RouteDialog>
					<ForgotPasswordPanel />
				</RouteDialog>
			);
		default:
			return null;
	}
}
