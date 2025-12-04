"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

import { ROUTES } from "@/shared/config";
import { useSupabaseClient } from "@/shared/supabase";
import { IconCheck } from "@/shared/ui/icon";
import { Button } from "@/shared/ui/shadcn/button";
import {
	CardDescription,
	CardHeader,
	CardTitle,
	CardWrapper,
} from "@/shared/ui/shadcn/card";
import { Spinner } from "@/shared/ui/shadcn/spinner";

export const VerifyEmailPanel = () => {
	const router = useRouter();
	const supabase = useSupabaseClient();
	const [status, setStatus] = useState<
		"verifying" | "success" | "error" | "expired"
	>("verifying");

	useEffect(() => {
		const verifyEmail = async () => {
			try {
				// Supabase가 URL의 hash fragment에서 토큰을 자동으로 처리합니다
				// 세션을 확인하여 인증 완료 여부를 확인
				const {
					data: { session },
					error: sessionError,
				} = await supabase.auth.getSession();

				if (sessionError) {
					console.error("Session error:", sessionError);
					setStatus("error");
					return;
				}

				if (session?.user) {
					// 이메일 인증 완료 확인
					if (session.user.email_confirmed_at) {
						setStatus("success");
						// 인증 완료 후 회원가입 완료 페이지로 리다이렉트
						setTimeout(() => {
							router.push(ROUTES.USER_SIGNUP_SUCCESS);
						}, 2000);
					} else {
						// 세션은 있지만 아직 이메일이 확인되지 않음
						setStatus("verifying");
						// 잠시 후 다시 확인
						setTimeout(async () => {
							const {
								data: { session: retrySession },
							} = await supabase.auth.getSession();
							if (retrySession?.user?.email_confirmed_at) {
								setStatus("success");
								setTimeout(() => {
									router.push(ROUTES.USER_SIGNUP_SUCCESS);
								}, 2000);
							} else {
								setStatus("expired");
							}
						}, 2000);
					}
				} else {
					// 세션이 없으면 URL의 hash fragment를 확인
					// Supabase는 hash fragment를 자동으로 처리하므로 잠시 대기
					setTimeout(async () => {
						const {
							data: { session: retrySession },
						} = await supabase.auth.getSession();
						if (retrySession?.user?.email_confirmed_at) {
							setStatus("success");
							setTimeout(() => {
								router.push(ROUTES.USER_SIGNUP_SUCCESS);
							}, 2000);
						} else {
							setStatus("expired");
						}
					}, 2000);
				}
			} catch (error) {
				console.error("Email verification error:", error);
				setStatus("error");
			}
		};

		verifyEmail();
	}, [router, supabase]);

	if (status === "verifying") {
		return (
			<CardWrapper>
				<Spinner className="mx-auto" />
				<CardHeader>
					<CardTitle>Verifying your email...</CardTitle>
					<CardDescription>
						Please wait while we verify your email address.
					</CardDescription>
				</CardHeader>
			</CardWrapper>
		);
	}

	if (status === "error" || status === "expired") {
		return (
			<CardWrapper>
				<CardHeader>
					<CardTitle>Verification Failed</CardTitle>
					<CardDescription>
						This verification link is expired or invalid. Please try again from
						the beginning.
					</CardDescription>
				</CardHeader>
				<Button asChild className="w-full">
					<a href={ROUTES.USER_SIGNUP}>Go to Sign Up</a>
				</Button>
			</CardWrapper>
		);
	}

	return (
		<CardWrapper>
			<IconCheck size="80" color="blue50" className="mx-auto" />
			<CardHeader>
				<CardTitle>Email verified!</CardTitle>
				<CardDescription>
					Your account has been successfully verified. Redirecting to the
					completion page...
				</CardDescription>
			</CardHeader>
		</CardWrapper>
	);
};
