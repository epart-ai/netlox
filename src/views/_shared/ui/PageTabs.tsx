"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

import { BackgroundImage } from "@/shared/ui/display/BackgroundImage";
import { Tabs, TabsList, TabsTrigger } from "@/shared/ui/shadcn/tabs";

interface Props {
	tabs: {
		label: string;
		value: string;
		href: string;
	}[];
	image: string;
	children: React.ReactNode;
}

export const PageTabs = ({ tabs, image, children }: Props) => {
	const pathname = usePathname();
	console.log("🚀 ~ PageTabs ~ pathname:", pathname);
	const defaultTab =
		tabs.find((tab) => tab.href === pathname)?.value ?? tabs[0].value;
	console.log("🚀 ~ PageTabs ~ defaultTab:", defaultTab);

	return (
		<Tabs value={defaultTab} className="">
			<TabsList>
				<div className="wrapper">
					{tabs.map((tab) => (
						<TabsTrigger key={tab.value} asChild value={tab.value}>
							<Link href={tab.href}>{tab.label}</Link>
						</TabsTrigger>
					))}
				</div>
			</TabsList>
			<div className="pt-[50px] lg:pt-[100px]">
				<BackgroundImage className="top-[87%] mix-blend-overlay" src={image} />
				<div className="wrapper">{children}</div>
			</div>
		</Tabs>
	);
};
