import { useState } from "react";

export type ActionStatus =
	| { type: "idle" }
	| { type: "success"; message?: string }
	| { type: "error"; message?: string };

export function useActionStatus(
	initialStatus: ActionStatus = { type: "idle" },
) {
	const [status, setStatus] = useState<ActionStatus>(initialStatus);

	const reset = () => setStatus({ type: "idle" });

	const succeed = (message?: string) => setStatus({ type: "success", message });

	const fail = (
		error?: unknown,
		fallbackMessage = "An error occurred. Please try again.",
	) => {
		let message = fallbackMessage;
		if (error instanceof Error && error.message) {
			message = error.message;
		} else if (typeof error === "string" && error.trim()) {
			message = error;
		}
		setStatus({ type: "error", message });
	};

	const StatusBanner = () => {
		if (status.type === "success" && status.message) {
			return (
				<p className="rounded-lg border border-green-500/40 bg-green-500/10 px-4 py-3 text-sm text-green-300">
					{status.message}
				</p>
			);
		}
		if (status.type === "error" && status.message) {
			return (
				<p className="rounded-lg border border-red-500/40 bg-red-500/10 px-4 py-3 text-sm text-red-300">
					{status.message}
				</p>
			);
		}
		return null;
	};

	return { status, reset, succeed, fail, StatusBanner };
}
