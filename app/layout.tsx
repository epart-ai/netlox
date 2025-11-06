import type { Metadata } from "next";
import localFont from "next/font/local";

import "@fontsource-variable/outfit";

import "@/app/globals.css";
import { Footer } from "@/widgets/footer";
import { Header } from "@/widgets/header";

import { AppProviders } from "./providers";

const geistSans = localFont({
	src: "../public/fonts/GeistVF.woff",
	variable: "--font-geist-sans",
	weight: "100 900",
});
const geistMono = localFont({
	src: "../public/fonts/GeistMonoVF.woff",
	variable: "--font-geist-mono",
	weight: "100 900",
});

export const metadata: Metadata = {
	title: "Netlox",
	description: "Next.js 14 App with modern stack",
};

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html lang="ko">
			<body
				className={`${geistSans.variable} ${geistMono.variable} bg-default antialiased`}
			>
				<AppProviders>
					<Header />
					{children}
					<Footer />
				</AppProviders>
			</body>
		</html>
	);
}
