"use client";

import { useRouter } from "next/navigation";
import { useMemo } from "react";
import { useForm } from "react-hook-form";

import { zodResolver } from "@hookform/resolvers/zod";

import { ROUTES } from "@/shared/config";
import { useActionStatus } from "@/shared/lib/useActionStatus";
import { TextLink } from "@/shared/ui/navigation";
import { Button } from "@/shared/ui/shadcn/button";
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
import { Spinner } from "@/shared/ui/shadcn/spinner";

import { useResetPasswordMutation } from "../model/reset-password.mutation";
import { useCurrentSessionQuery } from "../model/reset-password.query";
import {
	type ResetPasswordFormValues,
	resetPasswordFormDefaultValues,
	resetPasswordFormSchema,
} from "../model/reset-password.schema";

export const ResetPasswordForm = () => {
	const router = useRouter();
	const { reset, fail, succeed, StatusBanner, status } = useActionStatus();

	const form = useForm<ResetPasswordFormValues>({
		mode: "onChange",
		resolver: zodResolver(resetPasswordFormSchema),
		defaultValues: resetPasswordFormDefaultValues,
	});

	const {
		control,
		handleSubmit,
		formState: { isSubmitting },
	} = form;

	const {
		data: session,
		isLoading: isSessionLoading,
		error: sessionError,
	} = useCurrentSessionQuery();

	const { mutate: resetMutate, isPending } = useResetPasswordMutation({
		onSuccess: () => {
			reset();
			succeed("Your password has been successfully updated. Please log in.");
			setTimeout(() => {
				// 로그인 페이지로 이동 (또는 로그인 모달을 띄우려면 쿼리 파라미터 사용)
				router.push(ROUTES.USER_LOGIN);
			}, 1500);
		},
		onError: (err: Error) => {
			console.error(err);
			fail(err, "An error occurred. Please try again.");
		},
	});

	const isLoading = isSubmitting || isPending;
	const isSubmitDisabled = useMemo(
		() => !form.formState.isValid || isLoading,
		[form.formState.isValid, isLoading],
	);

	if (isSessionLoading) {
		return <Spinner />;
	}

	if (sessionError) {
		return (
			<CardWrapper className="text-center">
				<CardHeader>
					<CardTitle>비밀번호 재설정을 진행할 수 없습니다.</CardTitle>
				</CardHeader>
				<CardDescription>
					{sessionError.message ?? "세션 확인 중 오류가 발생했습니다."}
				</CardDescription>
				<div className="text-center">
					<TextLink href="/user/forgot-password" label="다시 시도하기" />
				</div>
			</CardWrapper>
		);
	}

	if (!session?.user) {
		return (
			<CardWrapper className="text-center">
				<CardHeader>
					<CardTitle>
						유효한 비밀번호 재설정 링크가 확인되지 않았습니다.
					</CardTitle>
				</CardHeader>
				<CardDescription>
					비밀번호 재설정 이메일의 링크를 클릭하여 다시 이 페이지에 접근해
					주세요.
				</CardDescription>
				<div className="text-center">
					<TextLink
						href="/user/forgot-password"
						label="재설정 메일 다시 보내기"
					/>
				</div>
			</CardWrapper>
		);
	}

	if (status.type === "success") {
		return (
			<CardWrapper>
				<CardHeader>
					<CardTitle>
						Your password has been successfully updated. Please log in.
					</CardTitle>
				</CardHeader>
			</CardWrapper>
		);
	}

	return (
		<Form {...form}>
			<form
				onSubmit={handleSubmit(({ password }) => {
					reset();
					resetMutate({ password });
				})}
			>
				<CardWrapper>
					<CardHeader>
						<CardTitle>Set a new password</CardTitle>
					</CardHeader>
					<CardContent>
						<FormField
							name="password"
							control={control}
							render={({ field }) => (
								<FormItem>
									<FormLabel>New password *</FormLabel>
									<FormControl>
										<Input {...field} type="password" disabled={isLoading} />
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>
						<FormField
							name="confirmPassword"
							control={control}
							render={({ field }) => (
								<FormItem>
									<FormLabel>Confirm new password *</FormLabel>
									<FormControl>
										<Input {...field} type="password" disabled={isLoading} />
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>
					</CardContent>

					<StatusBanner />

					<Button
						disabled={isSubmitDisabled}
						isLoading={isLoading}
						variant="primary"
						className="w-full"
						type="submit"
					>
						Update Password
					</Button>
				</CardWrapper>
			</form>
		</Form>
	);
};
