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

import { type ChangePasswordFormValues, changePasswordSchema } from "../model";

export const ChangePasswordForm = () => {
	const router = useRouter();
	const supabase = useSupabaseClient();
	const [feedback, setFeedback] = useState<{
		type: "success" | "error";
		message: string;
	} | null>(null);

	const form = useForm<ChangePasswordFormValues>({
		mode: "onBlur",
		resolver: zodResolver(changePasswordSchema),
		defaultValues: {
			currentPassword: "",
			newPassword: "",
			confirmNewPassword: "",
		},
	});

	const {
		control,
		handleSubmit,
		formState: { isSubmitting },
	} = form;

	const onSubmit = async (values: ChangePasswordFormValues) => {
		setFeedback(null);

		try {
			// 현재 비밀번호 확인
			const { data: userData } = await supabase.auth.getUser();
			if (!userData.user?.email) {
				setFeedback({
					type: "error",
					message:
						"The current password you entered is incorrect. Please try again.",
				});
				return;
			}

			// 현재 비밀번호로 로그인
			const { error: signInError } = await supabase.auth.signInWithPassword({
				email: userData.user.email,
				password: values.currentPassword,
			});

			if (signInError) {
				setFeedback({
					type: "error",
					message:
						"The current password you entered is incorrect. Please try again.",
				});
				return;
			}

			// 새 비밀번호로 업데이트
			const { error: updateError } = await supabase.auth.updateUser({
				password: values.newPassword,
			});

			if (updateError) {
				setFeedback({
					type: "error",
					message:
						updateError.message ||
						"An error occurred while sending the link. Please try again.",
				});
				return;
			}

			setFeedback({
				type: "success",
				message: "Your password has been successfully changed.",
			});

			// 완료 후 폼 초기화
			form.reset();

			// 2초 후 프로필 페이지로 이동
			setTimeout(() => {
				router.push("/user/profile");
			}, 2000);
		} catch (error) {
			const message =
				error instanceof Error
					? error.message
					: "An error occurred while sending the link. Please try again";
			setFeedback({
				type: "error",
				message,
			});
		}
	};

	return (
		<Form {...form}>
			<form onSubmit={handleSubmit(onSubmit)}>
				<CardWrapper>
					<CardHeader>
						<CardTitle>Change Password</CardTitle>
						<CardDescription>
							Please enter your current password and set a new one.
						</CardDescription>
					</CardHeader>

					<CardContent>
						<FormField
							name="currentPassword"
							control={control}
							render={({ field }) => (
								<FormItem>
									<FormLabel>Current Password</FormLabel>
									<FormControl>
										<Input
											{...field}
											type="password"
											disabled={isSubmitting}
											placeholder=""
										/>
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>

						<FormField
							name="newPassword"
							control={control}
							render={({ field }) => (
								<FormItem>
									<FormLabel>New Password</FormLabel>
									<FormControl>
										<Input
											{...field}
											type="password"
											disabled={isSubmitting}
											placeholder=""
										/>
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>

						<FormField
							name="confirmNewPassword"
							control={control}
							render={({ field }) => (
								<FormItem>
									<FormLabel>Confirm New Password</FormLabel>
									<FormControl>
										<Input
											{...field}
											type="password"
											disabled={isSubmitting}
											placeholder=""
										/>
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>

						{feedback && (
							<p
								className={`mt-4 text-sm ${
									feedback.type === "success"
										? "text-green-600 dark:text-green-400"
										: "text-red-600 dark:text-red-400"
								}`}
							>
								{feedback.message}
							</p>
						)}
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
							disabled={isSubmitting}
							isLoading={isSubmitting}
						>
							Change Password
						</Button>
					</ButtonBox>
				</CardWrapper>
			</form>
		</Form>
	);
};

