"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";

import { zodResolver } from "@hookform/resolvers/zod";

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
	const [isSubmitting, setIsSubmitting] = useState(false);

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
		formState: { errors },
	} = form;

	const onSubmit = async (values: WithdrawAccountFormValues) => {
		// 비밀번호 입력 확인
		if (!values.confirmPassword) {
			alert("Please fill in all required fields.");
			return;
		}

		setIsSubmitting(true);

		try {
			// 현재 사용자 이메일 가져오기
			const { data: userData, error: userError } =
				await supabase.auth.getUser();

			if (userError || !userData.user?.email) {
				alert("An error occurred while sending the link. Please try again.");
				setIsSubmitting(false);
				return;
			}

			// 비밀번호 확인
			const { error: signInError } = await supabase.auth.signInWithPassword({
				email: userData.user.email,
				password: values.confirmPassword,
			});

			if (signInError) {
				alert(
					"The password you entered is incorrect. Please check and try again.",
				);
				setIsSubmitting(false);
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
				alert(errorMessage);
				setIsSubmitting(false);
				return;
			}

			// 완료 메시지
			alert("Account withdrawal complete. Thank you for using NetLOX");

			// 로그아웃 처리 및 홈으로 이동
			await supabase.auth.signOut();
			router.push("/");
		} catch (error) {
			alert("An error occurred while sending the link. Please try again.");
			setIsSubmitting(false);
		}
	};

	return (
		<Form {...form}>
			<form onSubmit={handleSubmit(onSubmit)}>
				<CardWrapper>
					<CardHeader>
						<CardTitle>Withdraw Account</CardTitle>
						<CardDescription>
							Do you want to proceed with account withdrawal?
						</CardDescription>
						<CardDescription>
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
									<FormLabel>Confirm Password</FormLabel>
									<FormControl>
										<Input
											{...field}
											type="password"
											disabled={isSubmitting}
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
							variant="outline"
							asChild
							disabled={isSubmitting}
						>
							<Link href="/user/profile">Cancel</Link>
						</Button>
						<Button
							type="submit"
							variant="outline"
							className="border-destructive text-destructive hover:text-destructive"
							disabled={isSubmitting}
							isLoading={isSubmitting}
						>
							Withdraw Account
						</Button>
					</ButtonBox>
				</CardWrapper>
			</form>
		</Form>
	);
};

