"use client";

import { useCallback, useEffect, useState } from "react";

import { createClient } from "@/shared/supabase/client";

export const dynamic = "force-dynamic";

type EmailSettings = {
	smtp_host: string | null;
	smtp_port: string | null;
	smtp_user: string | null;
	smtp_pass: string | null;
	contact_recipient_email: string | null;
	contact_from_email: string | null;
	smtp_secure: string | null;
};

type TestResult = {
	success: boolean;
	message?: string;
	messageId?: string;
	error?: string;
	debug?: Record<string, unknown>;
};

export default function AdminSettingsPage() {
	const [loading, setLoading] = useState(true);
	const [saving, setSaving] = useState(false);
	const [error, setError] = useState("");
	const [success, setSuccess] = useState(false);

	const [settings, setSettings] = useState<EmailSettings>({
		smtp_host: null,
		smtp_port: null,
		smtp_user: null,
		smtp_pass: null,
		contact_recipient_email: null,
		contact_from_email: null,
		smtp_secure: null,
	});

	// 테스트 이메일 관련 상태
	const [testEmail, setTestEmail] = useState("");
	const [testing, setTesting] = useState(false);
	const [testResult, setTestResult] = useState<TestResult | null>(null);
	const [showDebug, setShowDebug] = useState(false);

	const authHeader = useCallback(async (): Promise<Record<string, string>> => {
		const supabase = createClient();
		const {
			data: { session },
		} = await supabase.auth.getSession();
		return session?.access_token
			? { Authorization: `Bearer ${session.access_token}` }
			: {};
	}, []);

	const loadSettings = useCallback(async () => {
		try {
			setLoading(true);
			setError("");
			const headers = await authHeader();
			const response = await fetch("/api/admin/email-settings", { headers });
			const result = await response.json();

			if (!response.ok) {
				throw new Error(result.error || "설정을 불러오지 못했습니다.");
			}

			if (result.settings) {
				setSettings(result.settings);
			}
		} catch (err) {
			const message =
				err instanceof Error ? err.message : "설정을 불러오지 못했습니다.";
			setError(message);
		} finally {
			setLoading(false);
		}
	}, [authHeader]);

	useEffect(() => {
		loadSettings();
	}, [loadSettings]);

	const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
		event.preventDefault();
		setSaving(true);
		setError("");
		setSuccess(false);

		try {
			const headers = {
				"Content-Type": "application/json",
				...(await authHeader()),
			};

			const response = await fetch("/api/admin/email-settings", {
				method: "PUT",
				headers,
				body: JSON.stringify(settings),
			});

			const result = await response.json();

			if (!response.ok) {
				throw new Error(result.error || "설정 저장에 실패했습니다.");
			}

			setSuccess(true);
			setTimeout(() => setSuccess(false), 3000);
		} catch (err) {
			const message =
				err instanceof Error ? err.message : "설정 저장에 실패했습니다.";
			setError(message);
		} finally {
			setSaving(false);
		}
	};

	const handleTestEmail = async () => {
		if (!testEmail.trim()) {
			setTestResult({
				success: false,
				error: "테스트 이메일 주소를 입력하세요.",
			});
			return;
		}

		setTesting(true);
		setTestResult(null);
		setShowDebug(false);

		try {
			const headers = {
				"Content-Type": "application/json",
				...(await authHeader()),
			};

			const response = await fetch("/api/admin/email-settings/test", {
				method: "POST",
				headers,
				body: JSON.stringify({
					to: testEmail.trim(),
					subject: "이메일 설정 테스트",
				}),
			});

			const result = await response.json();

			if (!response.ok) {
				setTestResult({
					success: false,
					error: result.error || "테스트 이메일 발송에 실패했습니다.",
					debug: result.debug,
				});
			} else {
				setTestResult({
					success: true,
					message: result.message,
					messageId: result.messageId,
					debug: result.debug,
				});
			}
		} catch (err) {
			const message =
				err instanceof Error
					? err.message
					: "테스트 이메일 발송 중 오류가 발생했습니다.";
			setTestResult({
				success: false,
				error: message,
			});
		} finally {
			setTesting(false);
		}
	};

	return (
		<div className="mx-auto max-w-4xl px-6 py-8">
			<div className="rounded-lg border border-slate-800 bg-slate-900 p-6 shadow">
				<h1 className="mb-6 text-2xl font-bold text-white">이메일 설정</h1>

				{loading ? (
					<p className="text-slate-300">불러오는 중...</p>
				) : (
					<form onSubmit={handleSubmit} className="space-y-6">
						{error && (
							<div className="rounded border border-red-700 bg-red-900/30 p-4 text-red-300">
								{error}
							</div>
						)}

						{success && (
							<div className="rounded border border-green-700 bg-green-900/30 p-4 text-green-300">
								설정이 저장되었습니다.
							</div>
						)}

						<div className="space-y-4">
							<div>
								<label
									htmlFor="smtp_host"
									className="mb-2 block text-sm font-medium text-slate-200"
								>
									SMTP Host
								</label>
								<input
									id="smtp_host"
									type="text"
									value={settings.smtp_host || ""}
									onChange={(e) =>
										setSettings({ ...settings, smtp_host: e.target.value })
									}
									placeholder="smtp.gmail.com"
									className="w-full rounded border border-slate-700 bg-slate-800 px-3 py-2 text-slate-100 placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
								/>
							</div>

							<div>
								<label
									htmlFor="smtp_port"
									className="mb-2 block text-sm font-medium text-slate-200"
								>
									SMTP Port
								</label>
								<input
									id="smtp_port"
									type="text"
									value={settings.smtp_port || ""}
									onChange={(e) =>
										setSettings({ ...settings, smtp_port: e.target.value })
									}
									placeholder="465 또는 587"
									className="w-full rounded border border-slate-700 bg-slate-800 px-3 py-2 text-slate-100 placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
								/>
							</div>

							<div>
								<label
									htmlFor="smtp_user"
									className="mb-2 block text-sm font-medium text-slate-200"
								>
									SMTP User
								</label>
								<input
									id="smtp_user"
									type="text"
									value={settings.smtp_user || ""}
									onChange={(e) =>
										setSettings({ ...settings, smtp_user: e.target.value })
									}
									placeholder="your-email@gmail.com"
									className="w-full rounded border border-slate-700 bg-slate-800 px-3 py-2 text-slate-100 placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
								/>
							</div>

							<div>
								<label
									htmlFor="smtp_pass"
									className="mb-2 block text-sm font-medium text-slate-200"
								>
									SMTP Password
								</label>
								<input
									id="smtp_pass"
									type="password"
									value={settings.smtp_pass || ""}
									onChange={(e) =>
										setSettings({ ...settings, smtp_pass: e.target.value })
									}
									placeholder="앱 비밀번호 또는 일반 비밀번호"
									className="w-full rounded border border-slate-700 bg-slate-800 px-3 py-2 text-slate-100 placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
								/>
								<p className="mt-1 text-xs text-slate-400">
									비밀번호는 저장 시 암호화되지 않습니다. 안전하게 관리하세요.
								</p>
							</div>

							<div>
								<label
									htmlFor="contact_recipient_email"
									className="mb-2 block text-sm font-medium text-slate-200"
								>
									수신 이메일 (Recipient Email)
								</label>
								<input
									id="contact_recipient_email"
									type="text"
									value={settings.contact_recipient_email || ""}
									onChange={(e) =>
										setSettings({
											...settings,
											contact_recipient_email: e.target.value,
										})
									}
									placeholder="recipient@example.com 또는 email1@example.com,email2@example.com"
									className="w-full rounded border border-slate-700 bg-slate-800 px-3 py-2 text-slate-100 placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
								/>
								<p className="mt-1 text-xs text-slate-400">
									여러 이메일 주소는 쉼표로 구분하세요.
								</p>
							</div>

							<div>
								<label
									htmlFor="contact_from_email"
									className="mb-2 block text-sm font-medium text-slate-200"
								>
									발신자 이메일 (From Email)
								</label>
								<input
									id="contact_from_email"
									type="email"
									value={settings.contact_from_email || ""}
									onChange={(e) =>
										setSettings({
											...settings,
											contact_from_email: e.target.value,
										})
									}
									placeholder="from@example.com (선택사항, 미설정 시 SMTP User 사용)"
									className="w-full rounded border border-slate-700 bg-slate-800 px-3 py-2 text-slate-100 placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
								/>
							</div>

							<div>
								<label
									htmlFor="smtp_secure"
									className="mb-2 block text-sm font-medium text-slate-200"
								>
									SMTP Secure
								</label>
								<select
									id="smtp_secure"
									value={settings.smtp_secure || ""}
									onChange={(e) =>
										setSettings({ ...settings, smtp_secure: e.target.value })
									}
									className="w-full rounded border border-slate-700 bg-slate-800 px-3 py-2 text-slate-100 focus:outline-none focus:ring-2 focus:ring-blue-500"
								>
									<option value="">자동 (포트 465이면 true)</option>
									<option value="true">true (SSL 강제)</option>
									<option value="false">false (SSL 비활성화)</option>
								</select>
							</div>
						</div>

						<div className="flex justify-end gap-3 border-t border-slate-800 pt-4">
							<button
								type="button"
								onClick={loadSettings}
								disabled={loading || saving}
								className="rounded border border-slate-700 px-4 py-2 text-slate-300 hover:bg-slate-800 disabled:cursor-not-allowed disabled:opacity-50"
							>
								취소
							</button>
							<button
								type="submit"
								disabled={loading || saving}
								className="rounded bg-blue-600 px-4 py-2 text-white hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-50"
							>
								{saving ? "저장 중..." : "저장"}
							</button>
						</div>
					</form>
				)}

				{/* 테스트 이메일 발송 섹션 */}
				{!loading && (
					<div className="mt-8 rounded-lg border border-slate-800 bg-slate-900 p-6">
						<h2 className="mb-4 text-xl font-bold text-white">
							이메일 발송 테스트
						</h2>
						<p className="mb-4 text-sm text-slate-400">
							설정한 SMTP 정보로 테스트 이메일을 발송하여 연결 및 설정을 확인할
							수 있습니다.
						</p>

						<div className="space-y-4">
							<div>
								<label
									htmlFor="test_email"
									className="mb-2 block text-sm font-medium text-slate-200"
								>
									테스트 수신 이메일 주소
								</label>
								<div className="flex gap-2">
									<input
										id="test_email"
										type="email"
										value={testEmail}
										onChange={(e) => setTestEmail(e.target.value)}
										placeholder="test@example.com"
										className="flex-1 rounded border border-slate-700 bg-slate-800 px-3 py-2 text-slate-100 placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
									/>
									{settings.contact_recipient_email && (
										<button
											type="button"
											onClick={() => {
												const firstEmail = settings.contact_recipient_email
													?.split(",")[0]
													.trim();
												if (firstEmail) {
													setTestEmail(firstEmail);
												}
											}}
											className="rounded border border-slate-600 px-4 py-2 text-sm text-slate-300 hover:bg-slate-800"
											title="수신 이메일 주소 사용"
										>
											수신 이메일 사용
										</button>
									)}
									<button
										type="button"
										onClick={handleTestEmail}
										disabled={testing || !testEmail.trim()}
										className="rounded bg-purple-600 px-6 py-2 text-white hover:bg-purple-700 disabled:cursor-not-allowed disabled:opacity-50"
									>
										{testing ? "발송 중..." : "테스트 발송"}
									</button>
								</div>
							</div>

							{/* 테스트 결과 표시 */}
							{testResult && (
								<div
									className={`rounded border p-4 ${
										testResult.success
											? "border-green-700 bg-green-900/30"
											: "border-red-700 bg-red-900/30"
									}`}
								>
									<div
										className={`mb-2 font-semibold ${
											testResult.success ? "text-green-300" : "text-red-300"
										}`}
									>
										{testResult.success ? "✓ 성공" : "✗ 실패"}
									</div>
									{testResult.success ? (
										<div className="space-y-2 text-sm text-green-200">
											<p>{testResult.message}</p>
											{testResult.messageId && (
												<p className="text-xs text-green-400">
													Message ID: {testResult.messageId}
												</p>
											)}
										</div>
									) : (
										<div className="space-y-2 text-sm text-red-200">
											<p>{testResult.error}</p>
										</div>
									)}

									{/* 디버깅 정보 */}
									{testResult.debug && (
										<div className="mt-4">
											<button
												type="button"
												onClick={() => setShowDebug(!showDebug)}
												className="mb-2 text-xs text-slate-400 hover:text-slate-300"
											>
												{showDebug
													? "▼ 디버깅 정보 숨기기"
													: "▶ 디버깅 정보 보기"}
											</button>
											{showDebug && (
												<pre className="max-h-96 overflow-auto rounded border border-slate-700 bg-slate-950 p-3 text-xs text-slate-300">
													{JSON.stringify(testResult.debug, null, 2)}
												</pre>
											)}
										</div>
									)}
								</div>
							)}
						</div>
					</div>
				)}
			</div>
		</div>
	);
}
