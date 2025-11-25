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
	CardWrapper,
} from "@/shared/ui/shadcn/card";

const dataCardVariant = cva("", {
	variants: {
		colors: {
			blue: "",
			green: "",
			purple: "",
			orange: "",
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
			class: "[&_.iconBox]:bg-blue-40/ 25",
		},
		{
			colors: "green",
			enableHover: true,
			class: "[&_.iconBox]:bg-green-40/15",
		},
		{
			colors: "purple",
			enableHover: true,
			class: "[&_.iconBox]:bg-purple-40/15",
		},
		{
			colors: "orange",
			enableHover: true,
			class: "[&_.iconBox]:bg-orange-40/15",
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
}

export const DataCard = ({
	data,
	className,
	colors,
	enableHover = false,
}: Props) => {
	return (
		<CardList
			colors={colors}
			enableHover={enableHover}
			className={cn(dataCardVariant({ colors, enableHover }), className)}
		>
			{data.map((item) => (
				<Card key={item.title} variant="glass">
					<CardWrapper>
						{item.image && (
							<div className="iconBox flex size-15 items-center justify-center rounded-2xl p-3.5 backdrop-blur-md transition-colors duration-300 md:size-20 md:p-5 lg:p-4.5">
								<Image
									src={item.image}
									alt={item.title}
									width={44}
									height={44}
									className={cn(
										"iconImage size-full",
										enableHover &&
											"[.card:hover_&]:brightness-0 [.card:hover_&]:invert [.card:hover_&]:filter",
									)}
									priority={true}
								/>
							</div>
						)}
						<CardContent>
							<CardTitle>{item.title}</CardTitle>
							<CardDescription>{item.description}</CardDescription>

							{item.footer && <CardFooter separator>{item.footer}</CardFooter>}
						</CardContent>
						{item.link && (
							<TextLink
								href={item.link.url}
								label={item.link.label}
								colors={colors}
								className="mt-2"
								iconVisible="right"
							/>
						)}
					</CardWrapper>
				</Card>
			))}
		</CardList>
	);
};
