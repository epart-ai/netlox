"use client";

import { useRouter } from "next/navigation";
import { useEffect, useMemo, useState } from "react";

import { FormInput } from "@/shared/ui/form";
import { TextLink } from "@/shared/ui/navigation";
import { Button } from "@/shared/ui/shadcn";
import {
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from "@/shared/ui/shadcn/card";
import { Spinner } from "@/shared/ui/shadcn/spinner";

import { getCurrentSession, updatePassword } from "../api/resetPassword.api";

type ViewState =
	| { status: "loading" }
	| { status: "ready" }
	| { status: "no-session" }
	| { status: "error"; message: string };

export const ResetPasswordForm = () => {
	const router = useRouter();
	const [state, setState] = useState<ViewState>({ status: "loading" });
	const [password, setPassword] = useState("");
	const [confirmPassword, setConfirmPassword] = useState("");
	const [loading, setLoading] = useState(false);
	const [feedback, setFeedback] = useState<string | null>(null);

	useEffect(() => {
		let mounted = true;

		const ensureSession = async () => {
			try {
				const session = await getCurrentSession();
				if (!mounted) return;
				if (session?.user) {
					setState({ status: "ready" });
				} else {
					setState({ status: "no-session" });
				}
			} catch (err) {
				if (!mounted) return;
				const message =
					err instanceof Error
						? err.message
						: "세션 확인 중 오류가 발생했습니다.";
				setState({ status: "error", message });
			}
		};

		ensureSession();

		return () => {
			mounted = false;
		};
	}, []);

	const isSubmitDisabled = useMemo(() => {
		return loading || password.length < 6 || password !== confirmPassword;
	}, [confirmPassword, loading, password]);

	const handleSubmit = async () => {
		setFeedback(null);

		if (password !== confirmPassword) {
			setFeedback("비밀번호와 비밀번호 확인이 일치하지 않습니다.");
			return;
		}

		try {
			setLoading(true);
			await updatePassword(password);
			setFeedback(
				"비밀번호가 변경되었습니다. 잠시 후 로그인 페이지로 이동합니다.",
			);
			setTimeout(() => {
				router.push("/user/login");
			}, 1500);
		} catch (err) {
			const message =
				err instanceof Error ? err.message : "비밀번호 변경에 실패했습니다.";
			setFeedback(message);
		} finally {
			setLoading(false);
		}
	};

	if (state.status === "loading") {
		return <Spinner />;
	}

	if (state.status === "error") {
		return (
			<CardContent>
				<CardHeader>
					<CardTitle>비밀번호 재설정을 진행할 수 없습니다.</CardTitle>
					<CardDescription>{state.message}</CardDescription>
				</CardHeader>
				<div className="text-center">
					<TextLink
						href="/user/forgot-password"
						icon="hide"
						label="다시 시도하기"
					/>
				</div>
			</CardContent>
		);
	}

	if (state.status === "no-session") {
		return (
			<CardContent>
				<CardHeader>
					<CardTitle>
						유효한 비밀번호 재설정 링크가 확인되지 않았습니다.
					</CardTitle>
					<CardDescription>
						비밀번호 재설정 이메일의 링크를 클릭하여 다시 이 페이지에 접근해
						주세요.
					</CardDescription>
				</CardHeader>
				<div className="text-center">
					<TextLink
						href="/user/forgot-password"
						icon="hide"
						label="재설정 메일 다시 보내기"
					/>
				</div>
			</CardContent>
		);
	}

	return (
		<CardContent>
			<CardHeader>
				<CardTitle>Set a new password</CardTitle>
			</CardHeader>
			<div className="space-y-4">
				<FormInput
					label="New password *"
					type="password"
					value={password}
					onChange={(event) => setPassword(event.target.value)}
					helperText="Must be at least 8 characters and include a number."
					disabled={loading}
				/>
				<FormInput
					label="Confirm new password *"
					type="password"
					value={confirmPassword}
					onChange={(event) => setConfirmPassword(event.target.value)}
					disabled={loading}
				/>
			</div>
			{feedback && <p className="text-sm text-emerald-400">{feedback}</p>}
			<Button
				disabled={isSubmitDisabled}
				isLoading={loading}
				variant="primary"
				className="w-full"
				onClick={handleSubmit}
			>
				Update Password
			</Button>
		</CardContent>
	);
};
