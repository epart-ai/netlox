import Image from "next/image";
import type { LinkProps } from "next/link";
import { type ReactNode, cloneElement, isValidElement } from "react";

import { type VariantProps, cva } from "class-variance-authority";

import { cn } from "@/shared/lib/utils";
import { TextLink } from "@/shared/ui/navigation";
import {
	Card,
	CardContent,
	CardDescription,
	CardFooter,
	CardList,
	type CardListProps,
	CardTitle,
	CardWrapper,
} from "@/shared/ui/shadcn/card";

const dataCardVariant = cva("", {
	variants: {
		colors: {
			blue: "[&_.icon-box]:bg-blue-40/25",
			green: "[&_.icon-box]:bg-green-40/15",
			purple: "[&_.icon-box]:bg-purple-40/15",
			orange: "[&_.icon-box]:bg-orange-40/15",
		},
	},
});

type Item = {
	title: string | ReactNode;
	description?: ReactNode;
	icon?: string | ReactNode;
	link?: LinkProps & {
		label: string;
	};
	disabledIconInvert?: boolean;
	footer?: ReactNode;
	children?: ReactNode;
};
interface Props
	extends VariantProps<typeof dataCardVariant>,
		Omit<CardListProps, "colors"> {
	data: Item[];
	className?: string;
}

export const DataCard = ({
	data,
	className,
	colors = "blue",
	...props
}: Props) => {
	return (
		<CardList
			colors={colors}
			className={cn(dataCardVariant({ colors }), className)}
			{...props}
		>
			{data.map((item, index) => (
				<Card key={index} variant="glass">
					<CardWrapper>
						{item.icon && (
							<div className="icon-box flex size-15 items-center justify-center rounded-2xl p-3.5 backdrop-blur-md transition-colors duration-300 md:size-20 md:p-5 lg:p-4.5">
								{typeof item.icon === "string" ? (
									<Image
										src={item.icon}
										alt=""
										width={44}
										height={44}
										className={cn(
											"iconImage size-full",
											!item.disabledIconInvert &&
												"[.card:hover_&]:brightness-0 [.card:hover_&]:invert [.card:hover_&]:filter",
										)}
										priority={true}
									/>
								) : isValidElement(item.icon) ? (
									cloneElement(item.icon as React.ReactElement, {
										className: cn(
											"iconImage",
											!item.disabledIconInvert &&
												"[.card:hover_&]:brightness-0 [.card:hover_&]:invert [.card:hover_&]:filter",
											item.icon.props?.className,
										),
									})
								) : (
									item.icon
								)}
							</div>
						)}
						<CardContent>
							<CardTitle>{item.title}</CardTitle>
							{item.description && (
								<CardDescription>{item.description}</CardDescription>
							)}

							{item.footer && <CardFooter separator>{item.footer}</CardFooter>}
						</CardContent>
						{item.link && (
							<TextLink
								{...item.link}
								label={item.link.label}
								colors={colors}
								className="mt-2"
								iconVisible="right"
							/>
						)}
						{item.children && item.children}
					</CardWrapper>
				</Card>
			))}
		</CardList>
	);
};
