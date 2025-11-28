"use client";

import { useMemo } from "react";
import { useForm } from "react-hook-form";

import { zodResolver } from "@hookform/resolvers/zod";

import { DIALOGS } from "@/shared/config";
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
	const { reset, fail, succeed, status } = useActionStatus();

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
			succeed();
		},
		onError: (err: Error) => {
			fail(
				err,
				"An error occurred while sending t he link. Please tr y again.",
			);
		},
	});

	const isLoading = isSubmitting || isPending;
	const emailValue = form.watch("email");
	const isEmailEmpty = !emailValue?.trim();
	const isEmailFormatValid =
		!isEmailEmpty && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(emailValue);
	const isDisabledByEmail = isEmailEmpty || !isEmailFormatValid;
	const isSubmitDisabled = useMemo(
		() => isLoading || isDisabledByEmail,
		[isLoading, isDisabledByEmail],
	);

	const onSubmit = (values: ForgotPasswordFormValues) => {
		reset();

		const redirectTo =
			typeof window !== "undefined"
				? `${window.location.origin}/user/reset-password`
				: undefined;
		const payload = toForgotPasswordPayload(values);
		forgotMutate({ ...payload, redirectTo });
	};

	return (
		<Form {...form}>
			<form onSubmit={handleSubmit(onSubmit)}>
				<CardWrapper>
					{status.type === "success" ? (
						<ForgotPasswordSuccess />
					) : (
						<>
							<CardHeader>
								<CardTitle>Reset your password</CardTitle>
								<CardDescription>
									Enter the email associated with your account, and we&apos;ll
									send a password reset link.
								</CardDescription>
							</CardHeader>
							<CardContent>
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
										</FormItem>
									)}
								/>
							</CardContent>
							<Button
								type="submit"
								disabled={isSubmitDisabled}
								className="w-full"
								isLoading={isLoading}
							>
								Send Reset Link
							</Button>
						</>
					)}
					<div className="text-center">
						<TextLink
							href={{ query: { dialog: DIALOGS.LOGIN } }}
							replace
							scroll={false}
							className="font-medium text-blue-400 hover:text-blue-300"
							label="Back to Login"
							iconVisible="left"
						/>
					</div>
				</CardWrapper>
			</form>
		</Form>
	);
}
