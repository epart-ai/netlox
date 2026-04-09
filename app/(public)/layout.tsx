import type { Metadata } from "next";
import localFont from "next/font/local";
import Script from "next/script";
import { Suspense } from "react";

import "@fontsource-variable/outfit";

import "@/app/globals.css";
import { CookieAgree } from "@/features/cookie-agree";
import { QueryAlertMessageListener } from "@/features/query-alert-message";
import { Footer } from "@/widgets/footer";
import { Header } from "@/widgets/header";

import { AppProviders } from "../providers";

const pretendardBold = localFont({
	src: "../../node_modules/@fontsource/pretendard/files/pretendard-latin-700-normal.woff2",
	variable: "--font-pretendard-bold",
	weight: "700",
	display: "swap",
});

export const metadata: Metadata = {
	title: "Netlox",
	description: "Next.js 14 App with modern stack",
};

export default async function RootLayout({
	children,
	dialog,
}: Readonly<{
	children: React.ReactNode;
	dialog: React.ReactNode;
}>) {
	return (
		<html lang="ko" suppressHydrationWarning>
			<head>
				<Script
					id="gtm-script"
					strategy="afterInteractive"
					dangerouslySetInnerHTML={{
						__html: `
              (function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
              new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
              j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
              'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
              })(window,document,'script','dataLayer','GTM-WTMCMRT7');
            `,
					}}
				/>
			</head>
			<body
				suppressHydrationWarning
				className={`${pretendardBold.variable} bg-blue-100 leading-[normal] text-white antialiased`}
			>
				<noscript>
					<iframe
						src="https://www.googletagmanager.com/ns.html?id=GTM-WTMCMRT7"
						height="0"
						width="0"
						style={{ display: "none", visibility: "hidden" }}
					/>
				</noscript>
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
