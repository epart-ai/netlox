"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";

import { zodResolver } from "@hookform/resolvers/zod";

import { DIALOGS, ROUTES } from "@/shared/config";
import { errorTextSm } from "@/shared/styles/snippets";
import { TextLink } from "@/shared/ui/navigation";
import { Button } from "@/shared/ui/shadcn/button";
import {
	CardContent,
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

import { type LoginData, useLoginMutation } from "../model/login.mutation";
import {
	type LoginFormValues,
	loginFormDefaultValues,
	loginFormSchema,
	toLoginPayload,
} from "../model/login.schema";

export function LoginForm() {
	const [error, setError] = useState<string | null>(null);

	const form = useForm<LoginFormValues>({
		mode: "onBlur",
		resolver: zodResolver(loginFormSchema),
		defaultValues: loginFormDefaultValues,
	});

	const {
		control,
		handleSubmit,
		formState: { isSubmitting },
	} = form;

	const { mutate: loginMutate, isPending } = useLoginMutation({
		onSuccess: (_data: LoginData) => {
			console.log("🚀 ~ LoginForm ~ _data:", _data);
			// 성공 후 라우팅/상태 갱신이 필요하면 여기서 처리
		},
		onError: (err: Error) => {
			const message =
				err instanceof Error ? err.message : "로그인에 실패했습니다.";
			setError(message);
		},
	});

	const isLoading = isSubmitting || isPending;
	const onSubmit = (values: LoginFormValues) => {
		setError(null);
		loginMutate(toLoginPayload(values));
	};

	return (
		<Form {...form}>
			<form onSubmit={handleSubmit(onSubmit)}>
				<CardWrapper>
					<CardHeader className="text-center">
						<CardTitle>Log in to your account</CardTitle>
					</CardHeader>
					<CardContent>
						<FormField
							name="email"
							control={control}
							render={({ field }) => (
								<FormItem>
									<FormLabel>Business Email *</FormLabel>
									<FormControl>
										<Input {...field} disabled={isLoading} />
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>
						<FormField
							name="password"
							control={control}
							render={({ field }) => (
								<FormItem>
									<FormLabel className="flex justify-between gap-2">
										Password *
										<TextLink
											href={{ query: { dialog: DIALOGS.FORGOT_PASSWORD } }}
											label="Forgot password?"
										/>
									</FormLabel>
									<FormControl>
										<Input {...field} type="password" disabled={isLoading} />
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>
					</CardContent>

					{error && <p className={errorTextSm}>{error}</p>}

					<Button
						type="submit"
						disabled={isLoading}
						isLoading={isLoading}
						variant="primary"
						className="w-full"
					>
						Log In
					</Button>
					<div className="text-center">
						<p className="paragraph-14 space-x-2">
							<span>Don’t have an account?</span>
							<TextLink href={ROUTES.USER_SIGNUP} label="Sign Up" replace />
						</p>
					</div>
				</CardWrapper>
			</form>
		</Form>
	);
}
