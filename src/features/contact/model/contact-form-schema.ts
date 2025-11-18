import { z } from "zod";

export const contactFormSchema = z.object({
	fullName: z.string().trim().min(1, "이름을 입력해 주세요."),
	businessEmail: z.string().trim().email("유효한 이메일 주소를 입력해 주세요."),
	companyName: z.string().trim().min(1, "회사명을 입력해 주세요."),
	phoneNumber: z.string().trim().min(1, "전화번호를 입력해 주세요."),
	help: z.string().trim().min(1, "도움이 필요한 내용을 입력해 주세요."),
	primaryUseCase: z.string().trim().min(1, "주요 활용 계획을 입력해 주세요."),
	role: z.string().trim().min(1, "직책을 입력해 주세요."),
	howToKnowUs: z.string().trim().min(1, "알게 된 경로를 입력해 주세요."),
});

export type ContactFormValues = z.infer<typeof contactFormSchema>;

