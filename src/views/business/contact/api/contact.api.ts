export type ContactApiResult = { success?: boolean; error?: string };

export async function sendContactInquiry(
	payload: Record<string, unknown>,
): Promise<void> {
	const response = await fetch("/api/contact", {
		method: "POST",
		headers: {
			"Content-Type": "application/json",
		},
		body: JSON.stringify(payload),
	});

	let result: ContactApiResult | null = null;
	try {
		result = (await response.json()) as ContactApiResult;
	} catch {
		result = null;
	}

	if (!response.ok || !result?.success) {
		throw new Error(result?.error ?? "문의 접수에 실패했습니다.");
	}
}
