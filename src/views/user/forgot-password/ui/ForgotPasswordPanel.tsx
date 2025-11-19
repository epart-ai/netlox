"use client";

import { useMemo, useState } from "react";

import { DIALOGS } from "@/shared/config";
import { FormInput } from "@/shared/ui/form";
import { TextLink } from "@/shared/ui/navigation";
import { Button } from "@/shared/ui/shadcn/button";
import {
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from "@/shared/ui/shadcn/card";

import { requestPasswordReset } from "../api/forgotPassword.api";
import { ForgotPasswordSuccess } from "./ForgotPasswordSuccess";

export function ForgotPasswordPanel() {
	const [email, setEmail] = useState("");
	const [loading, setLoading] = useState(false);
	const [error, setError] = useState<string | null>(null);
	const [isSuccess, setIsSuccess] = useState(false);

	const isSubmitDisabled = useMemo(() => loading || !email, [email, loading]);

	const handleSubmit = async () => {
		setError(null);

		if (!email) {
			setError("이메일을 입력하세요.");
			return;
		}

		try {
			setLoading(true);
			const redirectTo =
				typeof window !== "undefined"
					? `${window.location.origin}/user/reset-password`
					: undefined;

			await requestPasswordReset(email, { redirectTo });
			setIsSuccess(true);
		} catch (err) {
			const message =
				err instanceof Error
					? err.message
					: "비밀번호 재설정 메일 발송에 실패했습니다.";
			setError(message);
		} finally {
			setLoading(false);
		}
	};

	return (
		<CardContent>
			{isSuccess ? (
				<ForgotPasswordSuccess />
			) : (
				<>
					<CardHeader>
						<CardTitle>Reset your password</CardTitle>
						<CardDescription>
							Enter the email associated with your account, and we&apos;ll send
							a password reset link.
						</CardDescription>
					</CardHeader>
					<div className="space-y-4">
						<FormInput
							label="Business Email *"
							type="email"
							value={email}
							onChange={(event) => setEmail(event.target.value)}
							autoComplete="email"
							disabled={loading}
						/>

						{error && <p className="text-sm text-red-400">{error}</p>}
					</div>

					<Button
						disabled={isSubmitDisabled}
						className="w-full rounded-lg bg-blue-600 px-4 py-2 font-medium text-white transition hover:bg-blue-500 disabled:cursor-not-allowed disabled:opacity-60"
						onClick={handleSubmit}
						isLoading={loading}
					>
						Send Reset Link
					</Button>
				</>
			)}

			<div className="text-center">
				<TextLink
					href={{ query: { dialog: DIALOGS.LOGIN } }}
					replace
					scroll={false}
					className="font-medium text-blue-400 hover:text-blue-300"
					label="Back to Login"
					iconAlign="left"
					icon="show"
				/>
			</div>
		</CardContent>
	);
}
