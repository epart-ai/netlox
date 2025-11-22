import nodemailer from "nodemailer";
import "server-only";

import { getEmailSettings } from "@/shared/config/email-settings";
import { serverEnv } from "@/shared/config/env/server";

import type { ContactFormValues } from "../model/contact-form-schema";

type MailEnvConfig = {
	host: string;
	port: number;
	user: string;
	pass: string;
	to: string | string[];
	from: string;
	secure: boolean;
};

async function getMailConfig(): Promise<MailEnvConfig> {
	// 1. DB 설정을 먼저 확인
	const dbSettings = await getEmailSettings();

	if (dbSettings) {
		const {
			smtp_host,
			smtp_port,
			smtp_user,
			smtp_pass,
			contact_recipient_email,
			contact_from_email,
			smtp_secure,
		} = dbSettings;

		if (
			smtp_host &&
			smtp_port &&
			smtp_user &&
			smtp_pass &&
			contact_recipient_email
		) {
			const port = Number.parseInt(smtp_port, 10);

			if (Number.isNaN(port)) {
				throw new Error("SMTP_PORT가 올바른 숫자가 아닙니다.");
			}

			const secure = smtp_secure ? smtp_secure === "true" : port === 465;

			// 쉼표로 구분된 이메일 주소들을 배열로 변환
			const recipientEmails = contact_recipient_email
				.split(",")
				.map((email) => email.trim())
				.filter(Boolean);

			return {
				host: smtp_host,
				port,
				user: smtp_user,
				pass: smtp_pass,
				to: recipientEmails.length === 1 ? recipientEmails[0] : recipientEmails,
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
		CONTACT_RECIPIENT_EMAIL,
		CONTACT_FROM_EMAIL,
		SMTP_SECURE,
	} = serverEnv;

	if (
		!SMTP_HOST ||
		!SMTP_PORT ||
		!SMTP_USER ||
		!SMTP_PASS ||
		!CONTACT_RECIPIENT_EMAIL ||
		CONTACT_RECIPIENT_EMAIL.length === 0
	) {
		throw new Error(
			"메일 발송 설정이 없습니다. 관리자 페이지에서 이메일 설정을 확인하세요.",
		);
	}

	const port = Number.parseInt(SMTP_PORT, 10);

	if (Number.isNaN(port)) {
		throw new Error("SMTP_PORT 환경변수가 올바른 숫자가 아닙니다.");
	}

	const secure = SMTP_SECURE ? SMTP_SECURE === "true" : port === 465;

	return {
		host: SMTP_HOST,
		port,
		user: SMTP_USER,
		pass: SMTP_PASS,
		// nodemailer는 배열을 지원하므로 배열을 그대로 전달
		// 단일 이메일인 경우 배열의 첫 번째 요소만 사용
		to:
			CONTACT_RECIPIENT_EMAIL.length === 1
				? CONTACT_RECIPIENT_EMAIL[0]
				: CONTACT_RECIPIENT_EMAIL,
		from: CONTACT_FROM_EMAIL || SMTP_USER,
		secure,
	};
}

async function createTransport() {
	const config = await getMailConfig();

	const transporter = nodemailer.createTransport({
		host: config.host,
		port: config.port,
		secure: config.secure,
		auth: {
			user: config.user,
			pass: config.pass,
		},
	});

	return { transporter, config };
}

function escapeHtml(value: string): string {
	return value
		.replaceAll(/&/g, "&amp;")
		.replaceAll(/</g, "&lt;")
		.replaceAll(/>/g, "&gt;")
		.replaceAll(/"/g, "&quot;")
		.replaceAll(/'/g, "&#39;");
}

function buildMailContent(values: ContactFormValues) {
	const subject = `[Contact] ${values.fullName} / ${values.companyName}`;

	const sanitized = {
		fullName: escapeHtml(values.fullName),
		businessEmail: escapeHtml(values.businessEmail),
		companyName: escapeHtml(values.companyName),
		phoneNumber: escapeHtml(values.phoneNumber),
		role: escapeHtml(values.role),
		primaryUseCase: escapeHtml(values.primaryUseCase),
		howToKnowUs: escapeHtml(values.howToKnowUs),
		help: escapeHtml(values.help),
	};

	const text = [
		`Full name: ${values.fullName}`,
		`Business Email: ${values.businessEmail}`,
		`Company Name: ${values.companyName}`,
		`Phone Number: ${values.phoneNumber}`,
		`Role: ${values.role}`,
		`Primary Use Case: ${values.primaryUseCase}`,
		`How to know us: ${values.howToKnowUs}`,
		`What can we help you:`,
		values.help,
	].join("\n");

	const html = `
		<h2 style="font-size:16px;font-weight:600;margin:0 0 16px 0;">새로운 문의가 접수되었습니다.</h2>
		<table style="width:100%;border-collapse:collapse;font-size:14px;">
			<tbody>
				<tr>
					<td style="padding:8px 12px;background:#0f172a;color:#cbd5f5;width:180px;">Full name</td>
					<td style="padding:8px 12px;background:#111827;color:#f1f5f9;">${sanitized.fullName}</td>
				</tr>
				<tr>
					<td style="padding:8px 12px;background:#0f172a;color:#cbd5f5;">Business Email</td>
					<td style="padding:8px 12px;background:#111827;color:#f1f5f9;">${sanitized.businessEmail}</td>
				</tr>
				<tr>
					<td style="padding:8px 12px;background:#0f172a;color:#cbd5f5;">Company Name</td>
					<td style="padding:8px 12px;background:#111827;color:#f1f5f9;">${sanitized.companyName}</td>
				</tr>
				<tr>
					<td style="padding:8px 12px;background:#0f172a;color:#cbd5f5;">Phone Number</td>
					<td style="padding:8px 12px;background:#111827;color:#f1f5f9;">${sanitized.phoneNumber}</td>
				</tr>
				<tr>
					<td style="padding:8px 12px;background:#0f172a;color:#cbd5f5;">Role</td>
					<td style="padding:8px 12px;background:#111827;color:#f1f5f9;">${sanitized.role}</td>
				</tr>
				<tr>
					<td style="padding:8px 12px;background:#0f172a;color:#cbd5f5;">Primary Use Case</td>
					<td style="padding:8px 12px;background:#111827;color:#f1f5f9;white-space:pre-line;">${sanitized.primaryUseCase}</td>
				</tr>
				<tr>
					<td style="padding:8px 12px;background:#0f172a;color:#cbd5f5;">How to know us</td>
					<td style="padding:8px 12px;background:#111827;color:#f1f5f9;white-space:pre-line;">${sanitized.howToKnowUs}</td>
				</tr>
				<tr>
					<td style="padding:8px 12px;background:#0f172a;color:#cbd5f5;">What can we help you</td>
					<td style="padding:8px 12px;background:#111827;color:#f1f5f9;white-space:pre-line;">${sanitized.help}</td>
				</tr>
			</tbody>
		</table>
	`;

	return { subject, text, html };
}

export async function sendContactEmail(values: ContactFormValues) {
	const { transporter, config } = await createTransport();
	const { subject, text, html } = buildMailContent(values);

	await transporter.sendMail({
		from: config.from,
		to: config.to,
		replyTo: values.businessEmail,
		subject,
		text,
		html,
	});
}
