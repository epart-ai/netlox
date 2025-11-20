import Link from "next/link";

import { ROUTES } from "@/shared/config/routes";
import { BackgroundImage } from "@/shared/ui/display";
import { Tabs, TabsList, TabsTrigger } from "@/shared/ui/shadcn/tabs";

export default function ProductsLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<>
			<section className="overflow-hidden">
				<div className="relative pt-header">
					<BackgroundImage opacity="50" src="/images/products/bg_hero.jpg" />
					<div className="wrapper flex h-[260px] flex-col items-center justify-center gap-4 text-center lg:h-[420px] lg:gap-6">
						<h2 className="title-36 lg:title-60">NetLOX Products</h2>
						<p className="paragraph-16 lg:paragraph-20">
							From open-source community editions to 24/7 supported <br />
							enterprise-grade deployments, NetLOX provides the right solution
							for your scale.
						</p>
					</div>
				</div>
			</section>
			<Tabs defaultValue="openSource" className="">
				<TabsList>
					<div className="wrapper">
						<TabsTrigger asChild value="openSource">
							<Link href={ROUTES.PRODUCTS_OPEN_SOURCE}>Open Source </Link>
						</TabsTrigger>
						<TabsTrigger asChild value="enterprise">
							<Link href={ROUTES.PRODUCTS_ENTERPRISE}>Enterprise</Link>
						</TabsTrigger>
						<TabsTrigger asChild value="premium">
							<Link href={ROUTES.PRODUCTS_PREMIUM}>Premium</Link>
						</TabsTrigger>
						<TabsTrigger asChild value="saas">
							<Link href={ROUTES.PRODUCTS_SAAS}>SaaS</Link>
						</TabsTrigger>
					</div>
				</TabsList>
				<div className="pt-[50px] lg:pt-[100px]">
					<BackgroundImage
						className="mix-blend-overlay"
						src="/images/common/bg_content.png"
					/>
					<div className="wrapper">{children}</div>
				</div>
			</Tabs>
		</>
	);
}
