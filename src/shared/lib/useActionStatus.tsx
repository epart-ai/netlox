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

	const succeed = (message?: string, callback?: () => void) => {
		alert(message);
		if (callback) {
			callback();
		}
	};

	const fail = (
		error?: unknown,
		fallbackMessage = "An error occurred. Please try again.",
		callback?: () => void,
	) => {
		let message = fallbackMessage;
		if (error instanceof Error && error.message) {
			message = error.message;
		} else if (typeof error === "string" && error.trim()) {
			message = error;
		}
		alert(message);
		if (callback) {
			callback();
		}
	};

	return { status, reset, succeed, fail };
}
