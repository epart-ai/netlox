import { z } from "zod";

import {
	HELP_VALUES,
	HOW_TO_KNOW_US_VALUES,
	PRIMARY_USE_CASE_VALUES,
	ROLE_VALUES,
} from "./contact-form-options";

// API 전송용 페이로드 스키마
export const contactPayloadSchema = z.object({
	fullName: z.string().trim().min(1, "This field is required."),
	businessEmail: z.string().trim().min(1, "This field is required.").email(""),
	companyName: z.string().trim().min(1, "This field is required."),
	phoneNumber: z.string().trim().optional(),
	role: z
		.enum(ROLE_VALUES)
		.refine((v) => v !== "", { message: "This field is required." }),
	help: z
		.enum(HELP_VALUES)
		.refine((v) => v !== "", { message: "This field is required." }),
	primaryUseCase: z
		.enum(PRIMARY_USE_CASE_VALUES)
		.refine((v) => v !== "", { message: "This field is required." }),
	question: z.string().trim().optional(),
	howToKnowUs: z.enum(HOW_TO_KNOW_US_VALUES).optional(),
});

// 폼 전용 스키마
export const contactFormOnlySchema = z.object({
	terms: z.boolean().refine((value: boolean) => value, {
		message: "",
	}),
});

// RHF에서 사용할 최종 폼 스키마
export const contactFormSchema = contactPayloadSchema.merge(
	contactFormOnlySchema,
);

export type ContactPayload = z.infer<typeof contactPayloadSchema>;
export type ContactFormValues = z.infer<typeof contactFormSchema>;

export const contactFormDefaultValues: ContactFormValues = {
	fullName: "",
	businessEmail: "",
	companyName: "",
	phoneNumber: "",
	role: "",
	help: "",
	primaryUseCase: "",
	question: "",
	howToKnowUs: "",
	terms: false,
};

export const toContactPayload = (
	values: ContactFormValues,
): ContactPayload => ({
	fullName: values.fullName,
	businessEmail: values.businessEmail,
	companyName: values.companyName,
	phoneNumber: values.phoneNumber,
	role: values.role,
	help: values.help,
	primaryUseCase: values.primaryUseCase,
	question: values.question,
	howToKnowUs: values.howToKnowUs,
});
