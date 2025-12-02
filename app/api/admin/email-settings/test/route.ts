import nodemailer from "nodemailer";
import { NextResponse } from "next/server";
import "server-only";

import { getEmailSettings } from "@/shared/config/email-settings";
import { serverEnv } from "@/shared/config/env/server";

import { ensureAdminFromBearer } from "../../_lib/auth";

type TestEmailRequest = {
	to: string;
	subject?: string;
};

async function getMailConfig() {
	// 1. DB 설정을 먼저 확인
	const dbSettings = await getEmailSettings();

	if (dbSettings) {
		const {
			smtp_host,
			smtp_port,
			smtp_user,
			smtp_pass,
			contact_from_email,
			smtp_secure,
		} = dbSettings;

		if (smtp_host && smtp_port && smtp_user && smtp_pass) {
			const port = Number.parseInt(smtp_port, 10);

			if (Number.isNaN(port)) {
				throw new Error("SMTP_PORT가 올바른 숫자가 아닙니다.");
			}

			const secure: boolean =
				smtp_secure === "true"
					? true
					: smtp_secure === "false"
						? false
						: port === 465;

			return {
				host: smtp_host,
				port,
				user: smtp_user,
				pass: smtp_pass,
				from: contact_from_email || smtp_user,
				secure,
			};
		}
	}

	// 2. DB 설정이 없으면 환경변수를 fallback으로 사용
	const {
		SMTP_HOST,
		SMTP_PORT,
		SMTP_USER,
		SMTP_PASS,
		CONTACT_FROM_EMAIL,
		SMTP_SECURE,
	} = serverEnv;

	if (!SMTP_HOST || !SMTP_PORT || !SMTP_USER || !SMTP_PASS) {
		throw new Error(
			"메일 발송 설정이 없습니다. 먼저 SMTP 설정을 입력하세요.",
		);
	}

	const port = Number.parseInt(SMTP_PORT, 10);

	if (Number.isNaN(port)) {
		throw new Error("SMTP_PORT 환경변수가 올바른 숫자가 아닙니다.");
	}

	const secure: boolean =
		SMTP_SECURE === "true" ? true : SMTP_SECURE === "false" ? false : port === 465;

	return {
		host: SMTP_HOST,
		port,
		user: SMTP_USER,
		pass: SMTP_PASS,
		from: CONTACT_FROM_EMAIL || SMTP_USER,
		secure,
	};
}

export async function POST(request: Request) {
	const auth = await ensureAdminFromBearer(request);
	if (!auth.ok) {
		return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
	}

	try {
		const body: TestEmailRequest = await request.json();
		const { to, subject = "테스트 이메일" } = body;

		if (!to || !to.trim()) {
			return NextResponse.json(
				{ error: "수신 이메일 주소가 필요합니다." },
				{ status: 400 },
			);
		}

		// 이메일 형식 검증
		const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
		if (!emailRegex.test(to.trim())) {
			return NextResponse.json(
				{ error: "올바른 이메일 주소 형식이 아닙니다." },
				{ status: 400 },
			);
		}

		// SMTP 설정 가져오기
		const config = await getMailConfig();

		// secure는 항상 boolean이어야 합니다
		const secureValue: boolean = typeof config.secure === "boolean" ? config.secure : false;

		// Transporter 생성 및 연결 테스트
		const transporter = nodemailer.createTransport({
			host: config.host,
			port: config.port,
			secure: secureValue,
			auth: {
				user: config.user,
				pass: config.pass,
			},
		});

		// 연결 검증
		const verifyResult = await transporter.verify();
		if (!verifyResult) {
			throw new Error("SMTP 서버 연결 검증 실패");
		}

		// 테스트 이메일 발송
		const testContent = {
			subject,
			text: `이것은 테스트 이메일입니다.\n\n발송 시간: ${new Date().toLocaleString("ko-KR")}\nSMTP 설정:\n- Host: ${config.host}\n- Port: ${config.port}\n- Secure: ${config.secure}\n- From: ${config.from}`,
			html: `
				<div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
					<h2 style="color: #333;">테스트 이메일</h2>
					<p>이것은 테스트 이메일입니다.</p>
					<div style="background: #f5f5f5; padding: 15px; border-radius: 5px; margin-top: 20px;">
						<h3 style="margin-top: 0;">발송 정보</h3>
						<p><strong>발송 시간:</strong> ${new Date().toLocaleString("ko-KR")}</p>
						<h4>SMTP 설정:</h4>
						<ul>
							<li><strong>Host:</strong> ${config.host}</li>
							<li><strong>Port:</strong> ${config.port}</li>
							<li><strong>Secure:</strong> ${config.secure ? "Yes" : "No"}</li>
							<li><strong>From:</strong> ${config.from}</li>
							<li><strong>To:</strong> ${to}</li>
						</ul>
					</div>
				</div>
			`,
		};

		const info = await transporter.sendMail({
			from: config.from,
			to: to.trim(),
			subject: testContent.subject,
			text: testContent.text,
			html: testContent.html,
		});

		return NextResponse.json({
			success: true,
			message: "테스트 이메일이 성공적으로 발송되었습니다.",
			messageId: info.messageId,
			debug: {
				config: {
					host: config.host,
					port: config.port,
					secure: config.secure,
					from: config.from,
					user: config.user,
				},
				sentTo: to.trim(),
				sentAt: new Date().toISOString(),
			},
		});
	} catch (error) {
		const errorMessage =
			error instanceof Error ? error.message : "알 수 없는 오류가 발생했습니다.";
		const errorStack = error instanceof Error ? error.stack : undefined;

		// nodemailer 에러 상세 정보 추출
		let errorDetails: Record<string, unknown> = {};
		if (error instanceof Error && "response" in error) {
			errorDetails.response = (error as { response?: string }).response;
		}
		if (error instanceof Error && "responseCode" in error) {
			errorDetails.responseCode = (error as { responseCode?: number }).responseCode;
		}

		return NextResponse.json(
			{
				success: false,
				error: errorMessage,
				debug: {
					errorMessage,
					errorStack,
					...errorDetails,
				},
			},
			{ status: 500 },
		);
	}
}

