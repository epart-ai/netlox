"use client";

import { useSearchParams } from "next/navigation";

import { RouteDialog } from "@/shared/ui/overlays";
import { ForgotPasswordForm } from "@/views/user/forgot-password/ui";
import { LoginForm } from "@/views/user/login/ui";

export default function DialogSlotDefault() {
	const searchParams = useSearchParams();
	const dialog = searchParams?.get("dialog");

	if (!dialog) return null;

	switch (dialog) {
		case "login":
			return (
				<RouteDialog>
					<LoginForm />
				</RouteDialog>
			);
		case "forgot-password":
			return (
				<RouteDialog>
					<ForgotPasswordForm />
				</RouteDialog>
			);
		default:
			return null;
	}
}
