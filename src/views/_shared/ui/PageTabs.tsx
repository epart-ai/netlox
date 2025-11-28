"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

import { cn } from "@/shared/lib/utils";
import {
	beforeBackgroundImage,
	contentPadding,
	pageBackground,
} from "@/shared/styles/snippets";
import { Tabs, TabsList, TabsTrigger } from "@/shared/ui/shadcn/tabs";

interface Props {
	tabs: {
		label: string;
		value: string;
		href: string;
	}[];
	children: React.ReactNode;
}

export const PageTabs = ({ tabs, children }: Props) => {
	const pathname = usePathname();
	const defaultTab =
		tabs.find((tab) => tab.href === pathname)?.value ?? tabs[0].value;

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
			<div
				className={cn(contentPadding, beforeBackgroundImage, pageBackground)}
			>
				<div className="wrapper">{children}</div>
			</div>
		</Tabs>
	);
};
