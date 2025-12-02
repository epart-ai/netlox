import type { Metadata } from "next";
import { Suspense } from "react";

import "@fontsource-variable/outfit";

import "@/app/globals.css";
import { CookieAgree } from "@/features/cookie-agree";
import { QueryAlertMessageListener } from "@/features/query-alert-message";
import { Footer } from "@/widgets/footer";
import { Header } from "@/widgets/header";

import { AppProviders } from "../providers";

export const metadata: Metadata = {
	title: "Netlox",
	description: "Next.js 14 App with modern stack",
};

export default function RootLayout({
	children,
	dialog,
}: Readonly<{
	children: React.ReactNode;
	dialog: React.ReactNode;
}>) {
	return (
		<html lang="ko" suppressHydrationWarning>
			<body
				suppressHydrationWarning
				className={`bg-blue-100 leading-[normal] text-white antialiased`}
			>
				<AppProviders>
					<Header />
					<main className="min-h-screen">{children}</main>
					<Footer />
					<CookieAgree />
					<Suspense fallback={null}>
						<QueryAlertMessageListener />
					</Suspense>
					<Suspense fallback={null}>{dialog}</Suspense>
				</AppProviders>
			</body>
		</html>
	);
}
