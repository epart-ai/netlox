"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";

import { zodResolver } from "@hookform/resolvers/zod";

import { FormCheckbox, FormInput } from "@/shared/ui/form";
import { TextLink } from "@/shared/ui/navigation";
import { Button } from "@/shared/ui/shadcn/button";
import { CardContent, CardHeader, CardTitle } from "@/shared/ui/shadcn/card";

import {
	type ContactFormValues,
	contactFormSchema,
} from "../model/contact-form-schema";

type FormStatus =
	| { type: "idle" }
	| { type: "success"; message: string }
	| { type: "error"; message: string };

export function BusinessContactForm() {
	const [status, setStatus] = useState<FormStatus>({ type: "idle" });

	const {
		register,
		handleSubmit,
		reset,
		formState: { errors, isSubmitting },
	} = useForm<ContactFormValues>({
		mode: "onBlur",
		resolver: zodResolver(contactFormSchema),
		defaultValues: {
			fullName: "",
			businessEmail: "",
			companyName: "",
			phoneNumber: "",
			role: "",
			help: "",
			primaryUseCase: "",
			question: "",
			howToKnowUs: "",
		},
	});

	const onSubmit = async (values: ContactFormValues) => {
		setStatus({ type: "idle" });

		try {
			const response = await fetch("/api/contact", {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify(values),
			});

			let result: { success?: boolean; error?: string } | null = null;

			try {
				result = (await response.json()) as {
					success?: boolean;
					error?: string;
				};
			} catch {
				result = null;
			}

			if (!response.ok || !result?.success) {
				const message =
					result?.error ??
					"문의 접수에 실패했습니다. 잠시 후 다시 시도해 주세요.";
				setStatus({ type: "error", message });
				return;
			}

			reset();
			setStatus({
				type: "success",
				message: "접수가 완료되었습니다. 빠른 시일 내에 연락드리겠습니다.",
			});
		} catch (error) {
			console.error("Contact form submit error", error);
			setStatus({
				type: "error",
				message:
					"문의 접수 중 오류가 발생했습니다. 잠시 후 다시 시도해 주세요.",
			});
		}
	};

	return (
		<CardContent>
			<CardHeader>
				<CardTitle>Get in Touch</CardTitle>
			</CardHeader>
			<div className="space-y-4">
				<div className="grid grid-cols-2 gap-4">
					<FormInput
						label="Full name *"
						required
						error={errors.fullName?.message}
						{...register("fullName")}
						autoComplete="name"
					/>
					<FormInput
						label="Business Email *"
						required
						error={errors.businessEmail?.message}
						{...register("businessEmail")}
						autoComplete="email"
					/>
					<FormInput
						label="Company Name *"
						required
						error={errors.companyName?.message}
						{...register("companyName")}
						autoComplete="organization"
					/>
					<FormInput
						type="tel"
						label="Phone Number"
						required
						error={errors.phoneNumber?.message}
						{...register("phoneNumber")}
						autoComplete="tel"
					/>
				</div>
				{/* TODO: FormSelect 로 변경 */}
				<FormInput
					label="Role *"
					required
					error={errors.role?.message}
					{...register("role")}
					autoComplete="organization-title"
				/>
				{/* TODO: FormSelect 로 변경 */}
				<FormInput
					label="What can we help you with? *"
					required
					error={errors.help?.message}
					{...register("help")}
				/>
				{/* TODO: FormSelect 로 변경 */}
				<FormInput
					label="Primary Use Case *"
					required
					error={errors.primaryUseCase?.message}
					{...register("primaryUseCase")}
				/>
				{/* TODO: FormTextarea 로 변경 */}
				<FormInput
					label="Additional requirements or questions"
					required
					error={errors.question?.message}
					{...register("question")}
					autoComplete="organization-title"
				/>
				{/* TODO: FormSelect 로 변경 */}
				<FormInput
					label="How to know us"
					error={errors.howToKnowUs?.message}
					{...register("howToKnowUs")}
				/>
			</div>

			{status.type === "success" ? (
				<p className="rounded-lg border border-green-500/40 bg-green-500/10 px-4 py-3 text-sm text-green-300">
					{status.message}
				</p>
			) : null}
			{status.type === "error" ? (
				<p className="rounded-lg border border-red-500/40 bg-red-500/10 px-4 py-3 text-sm text-red-300">
					{status.message}
				</p>
			) : null}

			<FormCheckbox
				label={
					<>
						I agree to our <TextLink href={"#"} label="Terms and Conditions" />{" "}
						and <TextLink href={"#"} label="Privacy Policy" />
					</>
				}
				name="terms"
				size="sm"
			/>

			<Button
				variant="primary"
				className="w-full"
				type="submit"
				disabled={isSubmitting}
				isLoading={isSubmitting}
				onClick={handleSubmit(onSubmit)}
			>
				Submit Request
			</Button>
		</CardContent>
	);
}
