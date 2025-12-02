import { NextResponse } from "next/server";

import { contactPayloadSchema } from "@/views/business/contact/model";
import { sendContactEmail } from "@/views/business/contact/server";

export const runtime = "nodejs";

export async function POST(request: Request) {
	try {
		const payload = await request.json();
		const parsed = contactPayloadSchema.safeParse(payload);

		if (!parsed.success) {
			console.error("Contact form validation error:", parsed.error.issues);
			const message =
				parsed.error.issues[0]?.message ?? "입력값을 확인해 주세요.";
			return NextResponse.json(
				{
					success: false,
					error: message,
					details: parsed.error.issues.map((issue) => ({
						path: issue.path.map(String).join("."),
						message: issue.message,
					})),
				},
				{
					status: 400,
				},
			);
		}

		// ContactPayload를 ContactFormValues로 변환 (terms 필드 추가)
		const formValues = {
			...parsed.data,
			terms: true, // API에서는 이미 검증된 것으로 간주
		};

		await sendContactEmail(formValues);

		return NextResponse.json({ success: true });
	} catch (error) {
		console.error("Failed to handle contact form submission", error);
		const errorMessage = error instanceof Error ? error.message : String(error);
		return NextResponse.json(
			{
				success: false,
				error: "문의 접수 중 오류가 발생했습니다.",
				details: errorMessage,
			},
			{
				status: 500,
			},
		);
	}
}
