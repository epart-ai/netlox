"use client";

import { useRouter } from "next/navigation";
import { useEffect, useMemo, useRef } from "react";
import { useForm } from "react-hook-form";

import { zodResolver } from "@hookform/resolvers/zod";

import { DIALOGS, ROUTES } from "@/shared/config";
import { useActionStatus } from "@/shared/lib/useActionStatus";
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
	const { reset, fail, succeed } = useActionStatus();

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

	const { data: session, isLoading: isSessionLoading } =
		useCurrentSessionQuery();

	const { mutate: resetMutate, isPending } = useResetPasswordMutation({
		onSuccess: () => {
			succeed(
				"Your password has been successfully updated. Please log in.",
				() => router.push(`${ROUTES.ROOT}?dialog=${DIALOGS.LOGIN}`),
			);
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

	const invalidShownRef = useRef(false);

	useEffect(() => {
		if (!isSessionLoading && !session?.user && !invalidShownRef.current) {
			invalidShownRef.current = true;
			fail(
				"This verification link is expired or invalid. Please try again from the beginning",
				"",
				() => router.back(),
			);
		}
	}, [isSessionLoading, session?.user, fail, router]);

	if (isSessionLoading) {
		return <Spinner />;
	}

	if (!session?.user) {
		return null;
	}

	const onSubmit = (values: ResetPasswordFormValues) => {
		console.info("🚀 ~ onSubmit ~ values:", values);
		reset();

		resetMutate(values);
	};

	return (
		<Form {...form}>
			<form onSubmit={handleSubmit(onSubmit)}>
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

					<Button
						disabled={isSubmitDisabled}
						isLoading={isLoading}
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
