"use client";

import { useState } from "react";

import { DIALOGS, ROUTES } from "@/shared/config";
import { FormInput } from "@/shared/ui/form";
import { TextLink } from "@/shared/ui/navigation";
import { Button } from "@/shared/ui/shadcn";
import { CardContent, CardHeader, CardTitle } from "@/shared/ui/shadcn/card";

import { signInWithEmail } from "../api/login.api";

export function LoginPanel() {
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [loading, setLoading] = useState(false);
	const [error, setError] = useState<string | null>(null);

	const handleSubmit = async () => {
		setError(null);

		if (!email || !password) {
			setError("이메일과 비밀번호를 모두 입력하세요.");
			return;
		}

		try {
			setLoading(true);
			await signInWithEmail({ email, password });
		} catch (err) {
			const message =
				err instanceof Error ? err.message : "로그인에 실패했습니다.";
			setError(message);
		} finally {
			setLoading(false);
		}
	};

	return (
		<CardContent>
			<CardHeader>
				<CardTitle>Log in to your account</CardTitle>
			</CardHeader>
			<form onSubmit={handleSubmit} className="space-y-4">
				<FormInput
					label="Business Email *"
					type="email"
					value={email}
					onChange={(event) => setEmail(event.target.value)}
					autoComplete="email"
					disabled={loading}
				/>
				<FormInput
					label="Password *"
					labelSlot={
						<TextLink
							href={{ query: { dialog: DIALOGS.FORGOT_PASSWORD } }}
							label="Forgot password?"
							replace
							scroll={false}
						/>
					}
					type="password"
					value={password}
					onChange={(event) => setPassword(event.target.value)}
					autoComplete="current-password"
					disabled={loading}
				/>

				{error && <p className="text-sm text-red-400">{error}</p>}
			</form>
			<Button
				type="submit"
				disabled={loading}
				isLoading={loading}
				variant="primary"
				className="w-full"
				onClick={handleSubmit}
			>
				Log In
			</Button>
			<div className="text-center">
				<p className="paragraph-14 space-x-2">
					<span>Don’t have an account?</span>
					<TextLink href={ROUTES.USER_SIGNUP} label="Sign Up" replace />
				</p>
			</div>
		</CardContent>
	);
}
