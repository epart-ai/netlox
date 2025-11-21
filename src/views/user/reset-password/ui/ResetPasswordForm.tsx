"use client";

import { useRouter } from "next/navigation";
import { useMemo, useState } from "react";
import { useForm } from "react-hook-form";

import { zodResolver } from "@hookform/resolvers/zod";

import { cn } from "@/shared/lib/utils";
import { cardContentSpace } from "@/shared/styles/snippets";
import { TextLink } from "@/shared/ui/navigation";
import { Button } from "@/shared/ui/shadcn/button";
import {
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
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
	const [feedback, setFeedback] = useState<string | null>(null);

	const form = useForm<ResetPasswordFormValues>({
		mode: "onBlur",
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
			setFeedback(
				"비밀번호가 변경되었습니다. 잠시 후 로그인 페이지로 이동합니다.",
			);
			setTimeout(() => {
				router.push("/user/login");
			}, 1500);
		},
		onError: (err: Error) => {
			const message =
				err instanceof Error ? err.message : "비밀번호 변경에 실패했습니다.";
			setFeedback(message);
		},
	});

	const isLoading = isSubmitting || isPending;
	const isSubmitDisabled = useMemo(() => isLoading, [isLoading]);

	if (isSessionLoading) {
		return <Spinner />;
	}

	if (sessionError) {
		return (
			<CardContent>
				<CardHeader>
					<CardTitle>비밀번호 재설정을 진행할 수 없습니다.</CardTitle>
					<CardDescription>
						{sessionError.message ?? "세션 확인 중 오류가 발생했습니다."}
					</CardDescription>
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

	if (!session?.user) {
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
			<Form {...form}>
				<form
					onSubmit={handleSubmit(({ password }) => {
						setFeedback(null);
						resetMutate({ password });
					})}
					className={cn("", cardContentSpace)}
				>
					<div className="space-y-4">
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
					</div>

					{feedback && <p className="text-sm text-emerald-400">{feedback}</p>}

					<Button
						disabled={isSubmitDisabled}
						isLoading={isLoading}
						variant="primary"
						className="w-full"
						type="submit"
					>
						Update Password
					</Button>
				</form>
			</Form>
		</CardContent>
	);
};
