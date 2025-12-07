"use client";

import { useSearchParams } from "next/navigation";

import { RouteDialog } from "@/shared/ui/overlays";
import { ForgotPasswordForm } from "@/views/user/forgot-password/root/ui";
import { LoginForm } from "@/views/user/login/root/ui";
import { ChangePasswordForm } from "@/views/user/profile/password/ui";
import { ProfileForm } from "@/views/user/profile/root/ui";
import { WithdrawAccountForm } from "@/views/user/profile/withdraw/ui";

const dialogComponents = {
	login: <LoginForm />,
	"forgot-password": <ForgotPasswordForm />,
	"user-profile": <ProfileForm />,
	"user-profile-password": <ChangePasswordForm />,
	"user-profile-withdraw": <WithdrawAccountForm />,
} as const;

export default function DialogSlotDefault() {
	const searchParams = useSearchParams();
	const dialog = searchParams?.get("dialog") as keyof typeof dialogComponents;

	if (!dialog) return null;

	return <RouteDialog>{dialogComponents[dialog]}</RouteDialog>;
}
