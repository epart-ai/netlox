import { NextResponse } from "next/server";

import { contactFormSchema } from "@/views/business/contact/model";
import { sendContactEmail } from "@/views/business/contact/server";

export const runtime = "nodejs";

export async function POST(request: Request) {
	try {
		const payload = await request.json();
		const parsed = contactFormSchema.safeParse(payload);

		if (!parsed.success) {
			const message =
				parsed.error.issues[0]?.message ?? "입력값을 확인해 주세요.";
			return NextResponse.json(
				{ success: false, error: message },
				{
					status: 400,
				},
			);
		}

		await sendContactEmail(parsed.data);

		return NextResponse.json({ success: true });
	} catch (error) {
		console.error("Failed to handle contact form submission", error);
		return NextResponse.json(
			{ success: false, error: "문의 접수 중 오류가 발생했습니다." },
			{
				status: 500,
			},
		);
	}
}
