import Link from "next/link";

import { Tabs, TabsList, TabsTrigger } from "@/shared/ui/shadcn/tabs";

import { BackgroundImage } from "./BackgroundImage";

interface Props {
	tabs: {
		label: string;
		value: string;
		href: string;
	}[];
	image: string;
	children: React.ReactNode;
}

export const SubPageTabs = ({ tabs, image, children }: Props) => {
	return (
		<Tabs defaultValue={tabs[0].value} className="">
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
				<BackgroundImage className="mix-blend-overlay" src={image} />
				<div className="wrapper">{children}</div>
			</div>
		</Tabs>
	);
};
