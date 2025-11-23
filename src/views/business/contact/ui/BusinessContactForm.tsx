"use client";

import { useForm } from "react-hook-form";

import { zodResolver } from "@hookform/resolvers/zod";

import { useActionStatus } from "@/shared/lib/useActionStatus";
import { gridTwoCol } from "@/shared/styles/snippets";
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
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from "@/shared/ui/shadcn/form";
import { Input } from "@/shared/ui/shadcn/input";
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@/shared/ui/shadcn/select";
import { Textarea } from "@/shared/ui/shadcn/textarea";

import {
	HELP_OPTIONS,
	HOW_TO_KNOW_US_OPTIONS,
	PRIMARY_USE_CASE_OPTIONS,
	ROLE_OPTIONS,
} from "../model/contact-form-options";
import {
	type ContactFormValues,
	contactFormDefaultValues,
	contactFormSchema,
} from "../model/contact-form-schema";
import { useContactFormMutation } from "../model/contact-form.mutation";

export function BusinessContactForm() {
	const { reset, succeed, fail, StatusBanner } = useActionStatus();

	const form = useForm<ContactFormValues>({
		mode: "onBlur",
		resolver: zodResolver(contactFormSchema),
		defaultValues: contactFormDefaultValues,
	});

	const {
		control,
		handleSubmit,
		reset: formReset,
		formState: { isSubmitting },
	} = form;

	const { mutate: submitContact, isPending } = useContactFormMutation({
		onSuccess: () => {
			formReset();
			succeed("Thank you for your request. We will be in touch shortly");
		},
		onError: (err: Error) => {
			fail(err, "An error occurred. Please try again.");
		},
	});

	const isLoading = isSubmitting || isPending;
	const isTermsChecked = form.watch("terms");
	const onSubmit = (values: ContactFormValues) => {
		reset();
		submitContact(values);
	};

	return (
		<Form {...form}>
			<form onSubmit={handleSubmit(onSubmit)}>
				<CardWrapper>
					<CardHeader>
						<CardTitle>Get in Touch</CardTitle>
					</CardHeader>

					<CardContent>
						<div className={gridTwoCol}>
							<FormField
								name="fullName"
								control={control}
								render={({ field }) => (
									<FormItem>
										<FormLabel>Full name *</FormLabel>
										<FormControl>
											<Input
												{...field}
												autoComplete="name"
												disabled={isLoading}
											/>
										</FormControl>
										<FormMessage />
									</FormItem>
								)}
							/>
							<FormField
								name="businessEmail"
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
							<FormField
								name="companyName"
								control={control}
								render={({ field }) => (
									<FormItem>
										<FormLabel>Company Name *</FormLabel>
										<FormControl>
											<Input
												{...field}
												autoComplete="organization"
												disabled={isLoading}
											/>
										</FormControl>
										<FormMessage />
									</FormItem>
								)}
							/>
							<FormField
								name="phoneNumber"
								control={control}
								render={({ field }) => (
									<FormItem>
										<FormLabel>Phone Number</FormLabel>
										<FormControl>
											<Input
												{...field}
												type="tel"
												autoComplete="tel"
												disabled={isLoading}
											/>
										</FormControl>
										<FormMessage />
									</FormItem>
								)}
							/>
						</div>

						<FormField
							name="role"
							control={control}
							render={({ field }) => (
								<FormItem>
									<FormLabel>Role *</FormLabel>
									<FormControl>
										<Select
											disabled={isLoading}
											value={field.value}
											onValueChange={field.onChange}
										>
											<SelectTrigger>
												<SelectValue />
											</SelectTrigger>
											<SelectContent>
												{ROLE_OPTIONS.map((option) => (
													<SelectItem key={option.value} value={option.value}>
														{option.label}
													</SelectItem>
												))}
											</SelectContent>
										</Select>
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>

						<FormField
							name="help"
							control={control}
							render={({ field }) => (
								<FormItem>
									<FormLabel>What can we help you with? *</FormLabel>
									<FormControl>
										<Select
											disabled={isLoading}
											value={field.value}
											onValueChange={field.onChange}
										>
											<SelectTrigger>
												<SelectValue />
											</SelectTrigger>
											<SelectContent>
												{HELP_OPTIONS.map((option) => (
													<SelectItem key={option.value} value={option.value}>
														{option.label}
													</SelectItem>
												))}
											</SelectContent>
										</Select>
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>

						<FormField
							name="primaryUseCase"
							control={control}
							render={({ field }) => (
								<FormItem>
									<FormLabel>Primary Use Case *</FormLabel>
									<FormControl>
										<Select
											disabled={isLoading}
											value={field.value}
											onValueChange={field.onChange}
										>
											<SelectTrigger>
												<SelectValue />
											</SelectTrigger>
											<SelectContent>
												{PRIMARY_USE_CASE_OPTIONS.map((option) => (
													<SelectItem key={option.value} value={option.value}>
														{option.label}
													</SelectItem>
												))}
											</SelectContent>
										</Select>
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>

						<FormField
							name="question"
							control={control}
							render={({ field }) => (
								<FormItem>
									<FormLabel>Additional requirements or questions</FormLabel>
									<FormControl>
										<Textarea {...field} rows={4} disabled={isLoading} />
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>

						<FormField
							name="howToKnowUs"
							control={control}
							render={({ field }) => (
								<FormItem>
									<FormLabel>How did you hear about us?</FormLabel>
									<FormControl>
										<Select
											disabled={isLoading}
											value={field.value}
											onValueChange={field.onChange}
										>
											<SelectTrigger>
												<SelectValue />
											</SelectTrigger>
											<SelectContent>
												{HOW_TO_KNOW_US_OPTIONS.map((option) => (
													<SelectItem key={option.value} value={option.value}>
														{option.label}
													</SelectItem>
												))}
											</SelectContent>
										</Select>
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>

						<FormField
							name="terms"
							control={control}
							render={({ field }) => (
								<FormItem className="pt-2">
									<div className="flex items-center gap-3">
										<FormControl>
											<Checkbox
												checked={!!field.value}
												onCheckedChange={(v) => field.onChange(!!v)}
											/>
										</FormControl>
										<FormLabel applyErrorStyle>
											I agree to our{" "}
											<TextLink href={"#"} label="Terms and Conditions" /> and{" "}
											<TextLink href={"#"} label="Privacy Policy" />
										</FormLabel>
									</div>
									<FormMessage />
								</FormItem>
							)}
						/>
					</CardContent>
					<StatusBanner />

					<Button
						variant="primary"
						className="w-full"
						type="submit"
						disabled={isLoading || !isTermsChecked}
						isLoading={isLoading}
					>
						Submit Request
					</Button>
				</CardWrapper>
			</form>
		</Form>
	);
}
