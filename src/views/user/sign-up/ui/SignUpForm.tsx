"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";

import { zodResolver } from "@hookform/resolvers/zod";

import { DIALOGS, ROUTES } from "@/shared/config";
import { cn } from "@/shared/lib/utils";
import { cardContentSpace } from "@/shared/styles/snippets";
import { TextLink } from "@/shared/ui/navigation";
import { Button } from "@/shared/ui/shadcn/button";
import { CardContent, CardHeader, CardTitle } from "@/shared/ui/shadcn/card";
import { Checkbox } from "@/shared/ui/shadcn/checkbox";
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

import {
	type SignUpWithProfileData,
	useSignUpWithProfileMutation,
} from "../model/sign-up.mutation";
import {
	type SignUpFormValues,
	signUpFormDefaultValues,
	signUpFormSchema,
} from "../model/sign-up.schema";

export const SignUpForm = () => {
	const router = useRouter();
	const [error, setError] = useState<string | null>(null);

	const form = useForm<SignUpFormValues>({
		mode: "onBlur",
		resolver: zodResolver(signUpFormSchema),
		defaultValues: signUpFormDefaultValues,
	});

	const {
		control,
		handleSubmit,
		formState: { isSubmitting },
	} = form;

	const { mutate: signUpMutate, isPending } = useSignUpWithProfileMutation({
		onSuccess: (data: SignUpWithProfileData) => {
			if (!data.user) {
				setError("회원 가입이 정상적으로 완료되지 않았습니다.");
				return;
			}

			router.push(ROUTES.USER_SIGNUP_SUCCESS);
		},
		onError: (err: Error) => {
			const message =
				err instanceof Error ? err.message : "회원 가입에 실패했습니다.";
			setError(message);
		},
	});

	const isLoading = isSubmitting || isPending;

	const onSubmit = (values: SignUpFormValues) => {
		setError(null);

		signUpMutate(values);
	};

	return (
		<CardContent>
			<CardHeader>
				<CardTitle>Create your account</CardTitle>
			</CardHeader>

			<Form {...form}>
				<form
					onSubmit={handleSubmit(onSubmit)}
					className={cn("", cardContentSpace)}
				>
					<div className="space-y-4">
						<div className="grid grid-cols-2 gap-4">
							<FormField
								name="profile.fullname"
								control={control}
								render={({ field }) => (
									<FormItem>
										<FormLabel>Full Name *</FormLabel>
										<FormControl>
											<Input
												{...field}
												disabled={isLoading}
												placeholder="Full Name"
											/>
										</FormControl>
										<FormMessage />
									</FormItem>
								)}
							/>
							<FormField
								name="profile.companyname"
								control={control}
								render={({ field }) => (
									<FormItem>
										<FormLabel>Company Name *</FormLabel>
										<FormControl>
											<Input {...field} disabled={isLoading} />
										</FormControl>
										<FormMessage />
									</FormItem>
								)}
							/>
						</div>
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
									<FormLabel>Password *</FormLabel>
									<FormControl>
										<Input {...field} disabled={isLoading} />
									</FormControl>
									<FormDescription>
										Must be at least 8 characters and include a number.
									</FormDescription>
									<FormMessage />
								</FormItem>
							)}
						/>
						<FormField
							name="confirmPassword"
							control={control}
							render={({ field }) => (
								<FormItem>
									<FormLabel>Confirm password *</FormLabel>
									<FormControl>
										<Input {...field} disabled={isLoading} />
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>

						<FormField
							name="terms"
							control={control}
							render={({ field }) => (
								<FormItem>
									<div className="flex items-center gap-3">
										<FormControl>
											<Checkbox
												checked={!!field.value}
												onCheckedChange={(v) => field.onChange(!!v)}
											/>
										</FormControl>
										<FormLabel applyErrorStyle>
											I agree to our{" "}
											<TextLink
												href={"#"}
												label="Terms and Conditions"
												underline
											/>{" "}
											and{" "}
											<TextLink href={"#"} label="Privacy Policy" underline />
										</FormLabel>
									</div>
								</FormItem>
							)}
						/>
					</div>
					<p className="paragraph-14 text-center">
						A verification link will be sent to your email.
					</p>

					{error && <p className="text-sm text-red-400">{error}</p>}

					<Button
						variant="primary"
						className="w-full"
						type="submit"
						disabled={isLoading}
						isLoading={isLoading}
					>
						Create Account
					</Button>
				</form>
			</Form>

			<div className="text-center">
				<p className="paragraph-14 space-x-2">
					<span>Already have an account?</span>
					<TextLink
						href={{ query: { dialog: DIALOGS.LOGIN } }}
						label="Log In"
						scroll={false}
					/>
				</p>
			</div>
		</CardContent>
	);
};
