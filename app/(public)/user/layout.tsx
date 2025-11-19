export default function UserLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<main className="pb-[8.3333vw] pt-[12.5vw]">
			<div className="wrapper">{children}</div>
		</main>
	);
}
