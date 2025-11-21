import { z } from "zod";

import type { UserProfile } from "./profile.type";

// 서버 전송용 페이로드 스키마 (선택 필드, 빈 문자열은 허용)
export const profileFormSchema = z.object({
	fullname: z.string().optional(),
	companyname: z.string().optional(),
	etc1: z.string().optional(),
	etc2: z.string().optional(),
	etc3: z.string().optional(),
	etc4: z.string().optional(),
	etc5: z.string().optional(),
});

export type ProfileFormValues = z.infer<typeof profileFormSchema>;

export const profileFormDefaultValues: ProfileFormValues = {
	fullname: "",
	companyname: "",
	etc1: "",
	etc2: "",
	etc3: "",
	etc4: "",
	etc5: "",
};

export const toProfileFormValues = (
	profile: UserProfile | null,
): ProfileFormValues => ({
	fullname: profile?.fullname ?? "",
	companyname: profile?.companyname ?? "",
	etc1: profile?.etc1 ?? "",
	etc2: profile?.etc2 ?? "",
	etc3: profile?.etc3 ?? "",
	etc4: profile?.etc4 ?? "",
	etc5: profile?.etc5 ?? "",
});

// "" -> undefined 변환로직으로 API에서 null 업서트 처리 일관화
export const toProfilePayload = (
	values: ProfileFormValues,
): ProfileFormValues => ({
	fullname: values.fullname?.trim() ? values.fullname : undefined,
	companyname: values.companyname?.trim() ? values.companyname : undefined,
	etc1: values.etc1?.trim() ? values.etc1 : undefined,
	etc2: values.etc2?.trim() ? values.etc2 : undefined,
	etc3: values.etc3?.trim() ? values.etc3 : undefined,
	etc4: values.etc4?.trim() ? values.etc4 : undefined,
	etc5: values.etc5?.trim() ? values.etc5 : undefined,
});
