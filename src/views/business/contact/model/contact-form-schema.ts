import { z } from "zod";

import {
	HELP_VALUES,
	HOW_TO_KNOW_US_VALUES,
	PRIMARY_USE_CASE_VALUES,
	ROLE_VALUES,
	type HelpValue,
	type HowToKnowUsValue,
	type PrimaryUseCaseValue,
	type RoleValue,
} from "./contact-form-options";

// API 전송용 페이로드 스키마
const ROLE_ENUM = Object.keys(ROLE_VALUES) as [RoleValue, ...RoleValue[]];
const HELP_ENUM = Object.keys(HELP_VALUES) as [HelpValue, ...HelpValue[]];
const PRIMARY_USE_CASE_ENUM = Object.keys(
	PRIMARY_USE_CASE_VALUES,
) as [PrimaryUseCaseValue, ...PrimaryUseCaseValue[]];
const HOW_TO_KNOW_US_ENUM = Object.keys(
	HOW_TO_KNOW_US_VALUES,
) as [HowToKnowUsValue, ...HowToKnowUsValue[]];

export const contactPayloadSchema = z.object({
	fullName: z.string().trim().min(1, "This field is required."),
	businessEmail: z.string().trim().min(1, "This field is required.").email(""),
	companyName: z.string().trim().min(1, "This field is required."),
	phoneNumber: z.string().trim().optional(),
	role: z
		.union([z.literal(""), z.enum(ROLE_ENUM)])
		.refine((v) => v !== "", { message: "This field is required." }),
	help: z
		.union([z.literal(""), z.enum(HELP_ENUM)])
		.refine((v) => v !== "", { message: "This field is required." }),
	primaryUseCase: z
		.union([z.literal(""), z.enum(PRIMARY_USE_CASE_ENUM)])
		.refine((v) => v !== "", { message: "This field is required." }),
	question: z.string().trim().optional(),
	// 선택 사항: 빈 문자열 허용
	howToKnowUs: z.union([z.literal(""), z.enum(HOW_TO_KNOW_US_ENUM)]),
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
