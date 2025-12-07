"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";

import { zodResolver } from "@hookform/resolvers/zod";

import { useActionStatus } from "@/shared/lib/useActionStatus";
import { useSupabaseClient } from "@/shared/supabase";
import { Button, ButtonBox } from "@/shared/ui/shadcn/button";
import {
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
	CardWrapper,
} from "@/shared/ui/shadcn/card";
import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from "@/shared/ui/shadcn/form";
import { Input } from "@/shared/ui/shadcn/input";

import {
	type WithdrawAccountFormValues,
	withdrawAccountSchema,
} from "../model";

export const WithdrawAccountForm = () => {
	const router = useRouter();
	const supabase = useSupabaseClient();

	const { reset, fail, succeed } = useActionStatus();
	const [isPending, setIsPending] = useState(false);

	const form = useForm<WithdrawAccountFormValues>({
		mode: "onBlur",
		resolver: zodResolver(withdrawAccountSchema),
		defaultValues: {
			confirmPassword: "",
		},
	});

	const {
		control,
		handleSubmit,
		formState: { isSubmitting, isValid, errors },
		watch,
	} = form;

	const isLoading = isSubmitting || isPending;

	const confirmPassword = watch("confirmPassword");

	const isFormValid =
		!!confirmPassword?.trim() && isValid && Object.keys(errors).length === 0;

	const onValid = async (values: WithdrawAccountFormValues) => {
		reset();
		setIsPending(true);

		try {
			// 현재 사용자 이메일 가져오기
			const { data: userData, error: userError } =
				await supabase.auth.getUser();

			if (userError || !userData.user?.email) {
				fail(
					new Error(
						"An error occurred while sending the link. Please try again.",
					),
				);
				setIsPending(false);
				return;
			}

			// 비밀번호 확인
			const { error: signInError } = await supabase.auth.signInWithPassword({
				email: userData.user.email,
				password: values.confirmPassword,
			});

			if (signInError) {
				fail(
					new Error(
						"The password you entered is incorrect. Please check and try again.",
					),
				);
				setIsPending(false);
				return;
			}

			// 사용자 삭제 API 호출
			const response = await fetch("/api/user/withdraw", {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
			});

			if (!response.ok) {
				const result = await response.json();
				const errorMessage =
					result.error ||
					"An error occurred while sending the link. Please try again.";
				fail(new Error(errorMessage));
				setIsPending(false);
				return;
			}

			// 완료 메시지 및 로그아웃 처리
			succeed("Account withdrawal complete. Thank you for using NetLOX", () => {
				supabase.auth.signOut().then(() => {
					router.push("/");
				});
			});
			setIsPending(false);
		} catch (error) {
			fail(
				error,
				"An error occurred while sending the link. Please try again.",
			);
			setIsPending(false);
		}
	};

	const onInvalid = () => {
		const { confirmPassword } = form.getValues();
		if (!confirmPassword?.trim()) {
			fail(new Error("Please fill in all required fields."));
		}
	};

	return (
		<Form {...form}>
			<form onSubmit={handleSubmit(onValid, onInvalid)}>
				<CardWrapper>
					<CardHeader>
						<CardTitle>
							Do you want to proceed <br />
							with account withdrawal?
						</CardTitle>
						<CardDescription className="!text-alert">
							All account information will be permanently deleted and cannot be
							recovered upon withdrawal. Please enter your password to continue.
						</CardDescription>
					</CardHeader>

					<CardContent>
						<FormField
							name="confirmPassword"
							control={control}
							render={({ field }) => (
								<FormItem>
									<FormLabel>Confirm Password *</FormLabel>
									<FormControl>
										<Input
											{...field}
											type="password"
											disabled={isLoading}
											placeholder="Enter your password to confirm"
										/>
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>
					</CardContent>

					<ButtonBox>
						<Button
							type="button"
							variant="secondary"
							disabled={isLoading}
							onClick={() => router.back()}
							className="flex-1"
						>
							Cancel
						</Button>
						<Button
							type="submit"
							variant="primary"
							disabled={!isFormValid}
							isLoading={isLoading}
							className="flex-1"
						>
							Withdraw Account
						</Button>
					</ButtonBox>
				</CardWrapper>
			</form>
		</Form>
	);
};
