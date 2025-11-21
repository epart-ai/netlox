import { z } from "zod";

import {
	HELP_VALUES,
	PRIMARY_USE_CASE_VALUES,
	ROLE_VALUES,
} from "./contact-form-options";
import { HOW_TO_KNOW_US_VALUES } from "./contact-form-options";

// API 전송용 페이로드 스키마
export const contactPayloadSchema = z.object({
	fullName: z.string().trim().min(1, "이름을 입력해 주세요."),
	businessEmail: z.string().trim().email("유효한 이메일 주소를 입력해 주세요."),
	companyName: z.string().trim().min(1, "회사명을 입력해 주세요."),
	phoneNumber: z.string().trim().min(1, "전화번호를 입력해 주세요."),
	role: z
		.enum(ROLE_VALUES)
		.refine((v) => v !== "", { message: "직책을 선택해 주세요." }),
	help: z
		.enum(HELP_VALUES)
		.refine((v) => v !== "", { message: "문의 항목을 선택해 주세요." }),
	primaryUseCase: z
		.enum(PRIMARY_USE_CASE_VALUES)
		.refine((v) => v !== "", { message: "주요 활용 계획을 선택해 주세요." }),
	question: z.string().trim().min(1, "질문을 입력해 주세요."),
	howToKnowUs: z.enum(HOW_TO_KNOW_US_VALUES),
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
