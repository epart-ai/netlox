"use client";

import { usePathname, useRouter } from "next/navigation";
import { useForm } from "react-hook-form";

import { zodResolver } from "@hookform/resolvers/zod";

import { DIALOGS, ROUTES } from "@/shared/config";
import { useActionStatus } from "@/shared/lib/useActionStatus";
import { useCloseRouteDialog } from "@/shared/lib/useCloseRouteDialog";
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
} from "@/shared/ui/shadcn/form";
import { Input } from "@/shared/ui/shadcn/input";

import { useLoginMutation } from "../model/login.mutation";
import {
	type LoginFormValues,
	loginFormDefaultValues,
	loginFormSchema,
	toLoginPayload,
} from "../model/login.schema";

export function LoginForm() {
	const router = useRouter();
	const pathname = usePathname();
	const { reset, fail } = useActionStatus();
	const closeDialog = useCloseRouteDialog();

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
		onSuccess: () => {
			reset();
			// 회원가입 페이지에서 로그인 성공 시 홈으로 리다이렉트
			if (pathname === ROUTES.USER_SIGNUP) {
				router.push(ROUTES.ROOT);
			} else {
				closeDialog();
			}
		},
		onError: (err: Error) => {
			fail(err, "An error occurred. Please try again.");
		},
	});

	const isLoading = isSubmitting || isPending;
	const onValid = (values: LoginFormValues) => {
		reset();
		loginMutate(toLoginPayload(values));
	};
	const onInvalid = () => {
		const { email, password } = form.getValues();
		if (!email?.trim() || !password?.trim()) {
			fail(new Error("Please enter your email address and password."));
		}
	};

	return (
		<Form {...form}>
			<form onSubmit={handleSubmit(onValid, onInvalid)}>
				<CardWrapper>
					<CardHeader>
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
								</FormItem>
							)}
						/>
					</CardContent>

					<Button
						type="submit"
						disabled={isLoading}
						isLoading={isLoading}
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
