"use client";

import { useForm } from "react-hook-form";

import { zodResolver } from "@hookform/resolvers/zod";

import { DIALOGS } from "@/shared/config";
import { useActionStatus } from "@/shared/lib/useActionStatus";
import { gridTwoCol } from "@/shared/styles/snippets";
import { IconCheck } from "@/shared/ui/icon";
import { TextLink } from "@/shared/ui/navigation";
import { Button } from "@/shared/ui/shadcn/button";
import {
	CardContent,
	CardHeader,
	CardTitle,
	CardWrapper,
} from "@/shared/ui/shadcn/card";
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
	const { reset, fail, succeed, StatusBanner } = useActionStatus();

	const form = useForm<SignUpFormValues>({
		mode: "onBlur",
		resolver: zodResolver(signUpFormSchema),
		defaultValues: signUpFormDefaultValues,
	});

	const {
		control,
		handleSubmit,
		setError,
		formState: { isSubmitting },
	} = form;

	const { mutate: signUpMutate, isPending } = useSignUpWithProfileMutation({
		onSuccess: (data: SignUpWithProfileData) => {
			if (!data.user) {
				fail("회원 가입이 정상적으로 완료되지 않았습니다.");
				return;
			}

			succeed(
				"Almost there! Check your email. We've sent a verification link to your email. Please click the link in the email to complete your registration.",
			);
		},
		onError: (err: Error) => {
			// Note: 이메일 중복 시
			if (err.message.includes("email already exists")) {
				setError("email", {
					message: "An account with this email already exists.",
				});
				return;
			}
			fail(err, "회원 가입에 실패했습니다.");
		},
	});

	const isLoading = isSubmitting || isPending;
	const isTermsChecked = form.watch("terms");
	const passwordValue = form.watch("password");
	const isPasswordValid =
		(typeof passwordValue === "string" &&
			passwordValue.length >= 8 &&
			/\d/.test(passwordValue)) ||
		false;

	const onSubmit = (values: SignUpFormValues) => {
		reset();

		signUpMutate(values);
	};

	return (
		<Form {...form}>
			<form onSubmit={handleSubmit(onSubmit)}>
				<CardWrapper>
					<CardHeader>
						<CardTitle>Create your account</CardTitle>
					</CardHeader>

					<CardContent>
						<div className={gridTwoCol}>
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
										<Input {...field} type="password" disabled={isLoading} />
									</FormControl>
									<FormDescription>
										{isPasswordValid && <IconCheck />}
										Must be at least 8 characters and include a number.
									</FormDescription>
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
										<Input {...field} type="password" disabled={isLoading} />
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
					</CardContent>
					<p className="paragraph-14 text-center">
						A verification link will be sent to your email.
					</p>

					<StatusBanner />

					<Button
						variant="primary"
						className="w-full"
						type="submit"
						disabled={isLoading || !isTermsChecked}
						isLoading={isLoading}
					>
						Create Account
					</Button>
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
				</CardWrapper>
			</form>
		</Form>
	);
};
