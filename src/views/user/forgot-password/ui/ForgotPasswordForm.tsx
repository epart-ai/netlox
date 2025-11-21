"use client";

import { useMemo, useState } from "react";
import { useForm } from "react-hook-form";

import { zodResolver } from "@hookform/resolvers/zod";

import { DIALOGS } from "@/shared/config";
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

import {
	type ForgotPasswordData,
	useForgotPasswordMutation,
} from "../model/forgot-password.mutation";
import {
	type ForgotPasswordFormValues,
	forgotPasswordFormDefaultValues,
	forgotPasswordFormSchema,
	toForgotPasswordPayload,
} from "../model/forgot-password.schema";
import { ForgotPasswordSuccess } from "./ForgotPasswordSuccess";

export function ForgotPasswordForm() {
	const [error, setError] = useState<string | null>(null);
	const [isSuccess, setIsSuccess] = useState(false);

	const form = useForm<ForgotPasswordFormValues>({
		mode: "onBlur",
		resolver: zodResolver(forgotPasswordFormSchema),
		defaultValues: forgotPasswordFormDefaultValues,
	});

	const {
		control,
		handleSubmit,
		formState: { isSubmitting },
	} = form;

	const { mutate: forgotMutate, isPending } = useForgotPasswordMutation({
		onSuccess: (_data: ForgotPasswordData) => {
			console.log("🚀 ~ ForgotPasswordForm ~ _data:", _data);
			setIsSuccess(true);
		},
		onError: (err: Error) => {
			const message =
				err instanceof Error
					? err.message
					: "비밀번호 재설정 메일 발송에 실패했습니다.";
			setError(message);
		},
	});

	const isLoading = isSubmitting || isPending;
	const isSubmitDisabled = useMemo(() => isLoading, [isLoading]);

	const onSubmit = (values: ForgotPasswordFormValues) => {
		setError(null);

		const redirectTo =
			typeof window !== "undefined"
				? `${window.location.origin}/user/reset-password`
				: undefined;
		const payload = toForgotPasswordPayload(values);
		forgotMutate({ ...payload, redirectTo });
	};

	return (
		<CardContent>
			{isSuccess ? (
				<ForgotPasswordSuccess />
			) : (
				<>
					<CardHeader className="text-center">
						<CardTitle>Reset your password</CardTitle>
						<CardDescription>
							Enter the email associated with your account, and we&apos;ll send
							a password reset link.
						</CardDescription>
					</CardHeader>
					<Form {...form}>
						<form
							onSubmit={handleSubmit(onSubmit)}
							className={cn("", cardContentSpace)}
						>
							<div className="space-y-4">
								<FormField
									name="email"
									control={control}
									render={({ field }) => (
										<FormItem>
											<FormLabel>Business Email *</FormLabel>
											<FormControl>
												<Input
													{...field}
													type="email"
													autoComplete="email"
													disabled={isLoading}
												/>
											</FormControl>
											<FormMessage />
										</FormItem>
									)}
								/>
							</div>
							{error && <p className="text-sm text-red-400">{error}</p>}
							<Button
								type="submit"
								disabled={isSubmitDisabled}
								variant="primary"
								className="w-full"
								isLoading={isLoading}
							>
								Send Reset Link
							</Button>
						</form>
					</Form>
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
