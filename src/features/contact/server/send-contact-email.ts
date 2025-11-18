import "server-only";

import nodemailer from "nodemailer";

import { serverEnv } from "@/shared/config/env/server";

import { type ContactFormValues } from "../model/contact-form-schema";

type MailEnvConfig = {
	host: string;
	port: number;
	user: string;
	pass: string;
	to: string;
	from: string;
	secure: boolean;
};

function getMailConfig(): MailEnvConfig {
	const {
		SMTP_HOST,
		SMTP_PORT,
		SMTP_USER,
		SMTP_PASS,
		CONTACT_RECIPIENT_EMAIL,
		CONTACT_FROM_EMAIL,
		SMTP_SECURE,
	} = serverEnv;

	if (!SMTP_HOST || !SMTP_PORT || !SMTP_USER || !SMTP_PASS || !CONTACT_RECIPIENT_EMAIL) {
		throw new Error("메일 발송 환경변수가 설정되지 않았습니다.");
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
		to: CONTACT_RECIPIENT_EMAIL,
		from: CONTACT_FROM_EMAIL || SMTP_USER,
		secure,
	};
}

function createTransport() {
	const config = getMailConfig();

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
	const { transporter, config } = createTransport();
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

