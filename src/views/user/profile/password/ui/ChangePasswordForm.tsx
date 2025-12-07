"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";

import { zodResolver } from "@hookform/resolvers/zod";

import { isValidPassword } from "@/shared/lib/password";
import { useActionStatus } from "@/shared/lib/useActionStatus";
import { useSupabaseClient } from "@/shared/supabase";
import { IconCheck } from "@/shared/ui/icon";
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
	FormDescription,
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

	const { reset, fail, succeed } = useActionStatus();
	const [isPending, setIsPending] = useState(false);

	const form = useForm<ChangePasswordFormValues>({
		mode: "onChange",
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
		formState: { isSubmitting, isValid, errors },
		watch,
	} = form;

	const isLoading = isSubmitting || isPending;

	// 모든 필드 값 감시
	const currentPassword = watch("currentPassword");
	const newPassword = watch("newPassword");
	const confirmNewPassword = watch("confirmNewPassword");
	const isPasswordValid = isValidPassword(newPassword);

	const isFormValid =
		!!currentPassword?.trim() &&
		!!newPassword?.trim() &&
		!!confirmNewPassword?.trim() &&
		isValid &&
		Object.keys(errors).length === 0;

	const onValid = async (values: ChangePasswordFormValues) => {
		reset();
		setIsPending(true);

		try {
			// 현재 비밀번호 확인
			const { data: userData } = await supabase.auth.getUser();
			if (!userData.user?.email) {
				fail(
					new Error(
						"The current password you entered is incorrect. Please try again.",
					),
				);
				setIsPending(false);
				return;
			}

			// 현재 비밀번호로 로그인
			const { error: signInError } = await supabase.auth.signInWithPassword({
				email: userData.user.email,
				password: values.currentPassword,
			});

			if (signInError) {
				fail(
					new Error(
						"The current password you entered is incorrect. Please try again.",
					),
				);
				setIsPending(false);
				return;
			}

			// 새 비밀번호로 업데이트
			const { error: updateError } = await supabase.auth.updateUser({
				password: values.newPassword,
			});

			if (updateError) {
				fail(
					updateError,
					"An error occurred while sending the link. Please try again.",
				);
				setIsPending(false);
				return;
			}

			// 완료 후 폼 초기화 및 성공 메시지
			form.reset();
			succeed("Your password has been successfully changed.", () => {
				// 2초 후 프로필 페이지로 이동
				setTimeout(() => {
					router.back();
				}, 2000);
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
		const { currentPassword, newPassword, confirmNewPassword } =
			form.getValues();
		if (
			!currentPassword?.trim() ||
			!newPassword?.trim() ||
			!confirmNewPassword?.trim()
		) {
			fail(new Error("Please fill in all required fields."));
		}
	};

	return (
		<Form {...form}>
			<form onSubmit={handleSubmit(onValid, onInvalid)}>
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
									<FormLabel>Current Password *</FormLabel>
									<FormControl>
										<Input
											{...field}
											type="password"
											disabled={isLoading}
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
									<FormLabel>New Password *</FormLabel>
									<FormControl>
										<Input
											{...field}
											type="password"
											disabled={isLoading}
											placeholder=""
										/>
									</FormControl>
									<FormDescription>
										{isPasswordValid && <IconCheck />}
										Must be at least 8 characters and include a number.
									</FormDescription>
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
											disabled={isLoading}
											placeholder=""
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
							Change Password
						</Button>
					</ButtonBox>
				</CardWrapper>
			</form>
		</Form>
	);
};
