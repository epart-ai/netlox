import Image from "next/image";
import type { ReactNode } from "react";

import { type VariantProps, cva } from "class-variance-authority";

import { cn } from "@/shared/lib/utils";
import { TextLink } from "@/shared/ui/navigation";
import {
	Card,
	CardContent,
	CardDescription,
	CardFooter,
	CardList,
	CardTitle,
} from "@/shared/ui/shadcn/card";

const dataCardVariant = cva("", {
	variants: {
		colors: {
			blue: "[&_.iconBox]:bg-blue-60/25",
			green: "[&_.iconBox]:bg-green-60/15",
			purple: "[&_.iconBox]:bg-purple-10/15",
			orange: "[&_.iconBox]:bg-orange-10/15",
		},
		enableHover: {
			true: "",
			false: "",
		},
	},
	compoundVariants: [
		{
			colors: "blue",
			enableHover: true,
			class:
				"[&_.cardItem:hover]:border-blue-60 [&_.cardItem:hover]:shadow-[0_0_40px_0_rgb(var(--color-blue-60-rgb)/0.25)] [&_.cardItem:hover_.iconBox]:bg-blue-60",
		},
		{
			colors: "green",
			enableHover: true,
			class:
				"[&_.cardItem:hover]:border-green-60 [&_.cardItem:hover]:shadow-[0_0_40px_0_rgb(var(--color-green-60-rgb)/0.25)] [&_.cardItem:hover_.iconBox]:bg-green-60",
		},
		{
			colors: "purple",
			enableHover: true,
			class:
				"[&_.cardItem:hover]:border-purple-60 [&_.cardItem:hover]:shadow-[0_0_40px_0_rgb(var(--color-purple-60-rgb)/0.25)] [&_.cardItem:hover_.iconBox]:bg-purple-60",
		},
		{
			colors: "orange",
			enableHover: true,
			class:
				"[&_.cardItem:hover]:border-orange-60 [&_.cardItem:hover]:shadow-[0_0_40px_0_rgb(var(--color-orange-60-rgb)/0.25)] [&_.cardItem:hover_.iconBox]:bg-orange-60",
		},
	],
});

type Item = {
	title: string;
	description: ReactNode;
	image?: string;
	link?: {
		label: string;
		url: string;
	};
	footer?: ReactNode;
};
interface Props extends VariantProps<typeof dataCardVariant> {
	data: Item[];
	className?: string;
	colors?: "blue" | "green" | "purple" | "orange";
	enableHover?: boolean;
}

export const DataCard = ({
	data,
	className,
	colors,
	enableHover = false,
}: Props) => {
	return (
		<CardList
			className={cn(dataCardVariant({ colors, enableHover }), className)}
		>
			{data.map((item) => (
				<Card key={item.title} className="cardItem">
					<CardContent>
						{item.image && (
							<div className="iconBox flex h-15 w-15 items-center justify-center rounded-2xl backdrop-blur-md md:h-20 md:w-20">
								<Image
									src={item.image}
									alt={item.title}
									width={44}
									height={44}
									className={cn(
										"iconImage h-8 w-8 md:h-10 md:w-10 lg:h-11 lg:w-11",
										enableHover &&
											"[.cardItem:hover_&]:brightness-0 [.cardItem:hover_&]:invert [.cardItem:hover_&]:filter",
									)}
									priority={true}
								/>
							</div>
						)}
						<div className="flex flex-col gap-2 md:gap-3 lg:gap-4">
							<CardTitle>{item.title}</CardTitle>
							<CardDescription>{item.description}</CardDescription>
						</div>
						{item.link && (
							<TextLink
								href={item.link.url}
								label={item.link.label}
								colors={colors}
								className="mt-2"
							/>
						)}
					</CardContent>
					{item.footer && <CardFooter>{item.footer}</CardFooter>}
				</Card>
			))}
		</CardList>
	);
};
