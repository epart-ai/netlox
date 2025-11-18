"use client";

import { useState, type InputHTMLAttributes, type ReactNode } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { Button } from "@/shared/ui/shadcn/button";
import { contactFormSchema, type ContactFormValues } from "../model/contact-form-schema";

type FormStatus =
	| { type: "idle" }
	| { type: "success"; message: string }
	| { type: "error"; message: string };

export function ContactForm() {
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
			help: "",
			primaryUseCase: "",
			role: "",
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
				result = (await response.json()) as { success?: boolean; error?: string };
			} catch {
				result = null;
			}

			if (!response.ok || !result?.success) {
				const message = result?.error ?? "문의 접수에 실패했습니다. 잠시 후 다시 시도해 주세요.";
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
				message: "문의 접수 중 오류가 발생했습니다. 잠시 후 다시 시도해 주세요.",
			});
		}
	};

	return (
		<form
			className="space-y-8 rounded-2xl border border-slate-800 bg-slate-900/60 p-8 shadow-2xl shadow-slate-950/60"
			onSubmit={handleSubmit(onSubmit)}
			noValidate
		>
			<div className="grid grid-cols-1 gap-6 md:grid-cols-2">
				<FormField
					label="Full name"
					required
					error={errors.fullName?.message}
					inputProps={{
						type: "text",
						autoComplete: "name",
						required: true,
						...register("fullName"),
					}}
				/>
				<FormField
					label="Business Email"
					required
					error={errors.businessEmail?.message}
					inputProps={{
						type: "email",
						autoComplete: "email",
						required: true,
						...register("businessEmail"),
					}}
				/>
				<FormField
					label="Company Name"
					required
					error={errors.companyName?.message}
					inputProps={{
						type: "text",
						autoComplete: "organization",
						required: true,
						...register("companyName"),
					}}
				/>
				<FormField
					label="Phone Number"
					required
					error={errors.phoneNumber?.message}
					inputProps={{
						type: "tel",
						autoComplete: "tel",
						required: true,
						...register("phoneNumber"),
					}}
				/>
				<FormField
					label="Role"
					required
					error={errors.role?.message}
					inputProps={{
						type: "text",
						autoComplete: "organization-title",
						required: true,
						...register("role"),
					}}
				/>
				<div className="md:col-span-2">
					<FormField
						label="Primary Use Case"
						required
						error={errors.primaryUseCase?.message}
						renderInput={({ id, ariaProps }) => (
							<textarea
								id={id}
								className="min-h-[120px] w-full rounded-lg border border-slate-800 bg-slate-950/60 px-4 py-3 text-base text-white placeholder:text-slate-500 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/40"
								placeholder="어떤 목적으로 서비스를 활용할 계획인지 알려주세요."
								required
								{...ariaProps}
								{...register("primaryUseCase")}
							/>
						)}
					/>
				</div>
				<div className="md:col-span-2">
					<FormField
						label="How to know us"
						required
						error={errors.howToKnowUs?.message}
						inputProps={{
							type: "text",
						required: true,
							...register("howToKnowUs"),
						}}
					/>
				</div>
				<div className="md:col-span-2">
					<FormField
						label="What can we help you"
						required
						error={errors.help?.message}
						renderInput={({ id, ariaProps }) => (
							<textarea
								id={id}
								className="min-h-[160px] w-full rounded-lg border border-slate-800 bg-slate-950/60 px-4 py-3 text-base text-white placeholder:text-slate-500 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/40"
								placeholder="필요하신 지원 사항을 구체적으로 작성해 주세요."
								required
								{...ariaProps}
								{...register("help")}
							/>
						)}
					/>
				</div>
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

			<div className="flex justify-end">
				<Button type="submit" disabled={isSubmitting}>
					{isSubmitting ? "전송 중..." : "문의 보내기"}
				</Button>
			</div>
		</form>
	);
}

type AriaFieldProps = {
	"aria-invalid"?: true;
	"aria-describedby"?: string;
};

type FormFieldProps = {
	label: string;
	required?: boolean;
	error?: string;
	inputProps?: InputHTMLAttributes<HTMLInputElement>;
	renderInput?: (props: { id: string; ariaProps: AriaFieldProps }) => ReactNode;
};

function FormField({ label, required, error, inputProps, renderInput }: FormFieldProps) {
	const id = inputProps?.id ?? `field-${label.replace(/\s+/g, "-").toLowerCase()}`;
	const errorId = error ? `${id}-error` : undefined;
	const ariaProps: AriaFieldProps = {
		"aria-invalid": error ? true : undefined,
		"aria-describedby": errorId,
	};

	return (
		<div className="flex flex-col gap-2">
			<label htmlFor={id} className="text-sm font-semibold text-slate-200">
				{label}
				{required ? <span className="ml-1 text-blue-400">*</span> : null}
			</label>
			{renderInput ? (
				renderInput({ id, ariaProps })
			) : (
				<input
					id={id}
					className="w-full rounded-lg border border-slate-800 bg-slate-950/60 px-4 py-3 text-base text-white placeholder:text-slate-500 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/40"
					{...ariaProps}
					{...inputProps}
				/>
			)}
			{error ? (
				<p id={errorId} className="text-xs text-red-400">
					{error}
				</p>
			) : null}
		</div>
	);
}

