import { cn } from "@/shared/lib/utils";
import { gradientBackgroundBlack } from "@/shared/styles/snippets";

export default function UserLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<div
			className={cn(
				"flex min-h-screen flex-col justify-center pb-15 pt-30 lg:py-[7.4074074074074066vh]",
				gradientBackgroundBlack,
			)}
		>
			<div className="wrapper">{children}</div>
		</div>
	);
}
