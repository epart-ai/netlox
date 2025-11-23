"use client";

import { useSearchParams } from "next/navigation";

import { RouteDialog } from "@/shared/ui/overlays";
import { ForgotPasswordForm } from "@/views/user/forgot-password/root/ui";
import { LoginForm } from "@/views/user/login/root/ui";

const dialogComponents = {
	login: <LoginForm />,
	"forgot-password": <ForgotPasswordForm />,
} as const;

export default function DialogSlotDefault() {
	const searchParams = useSearchParams();
	const dialog = searchParams?.get("dialog") as keyof typeof dialogComponents;

	if (!dialog) return null;

	return <RouteDialog>{dialogComponents[dialog]}</RouteDialog>;
}
