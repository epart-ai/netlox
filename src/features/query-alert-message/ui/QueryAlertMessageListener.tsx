"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useRef } from "react";

const ALERT_PARAM = "alert";
const IS_BACK = "isBack";

const normalizeAlert = (value: string) => value.replace(/\\n/g, "\n");

const isSameAlert = (prev: string | null, next: string | null) => prev === next;

export function QueryAlertMessageListener() {
	const router = useRouter();
	const searchParams = useSearchParams();
	const alertMessage = searchParams.get(ALERT_PARAM);
	const isBack = searchParams.get(IS_BACK);
	const previousAlertRef = useRef<string | null>(null);

	useEffect(() => {
		if (!alertMessage) {
			previousAlertRef.current = null;
			return;
		}

		if (isSameAlert(previousAlertRef.current, alertMessage)) {
			return;
		}

		previousAlertRef.current = alertMessage;
		alert(normalizeAlert(alertMessage));
		if (isBack) {
			router.back();
		}
	}, [alertMessage, isBack, router]);

	return null;
}
