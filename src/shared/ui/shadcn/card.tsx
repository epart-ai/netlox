import * as React from "react";

import { type VariantProps, cva } from "class-variance-authority";

import { Separator } from "@/shared/ui/shadcn/separator";

import { cn } from "../../lib/utils";

const cardListVariants = cva(
	"grid gap-5 md:grid-cols-2 lg:grid-cols-3 lg:gap-10 ",
	{
		variants: {
			colors: {
				blue: "[&_.iconBox]:bg-blue-40/ 25",
				green: "[&_.iconBox]:bg-green-40/15",
				purple: "[&_.iconBox]:bg-purple-10/15",
				orange: "[&_.iconBox]:bg-orange-10/15",
			},
			enableHover: {
				true: "[&_.card:hover]:-translate-y-2",
				false: "",
			},
		},
		compoundVariants: [
			{
				colors: "blue",
				enableHover: true,
				class:
					"[&_.card:hover]:border-blue-40 [&_.card:hover]:shadow-[0_0_40px_0_rgb(var(--color-blue-60-rgb)/0.25)] [&_.card:hover_.iconBox]:bg-blue-60",
			},
			{
				colors: "green",
				enableHover: true,
				class:
					"[&_.card:hover]:border-green-40 [&_.card:hover]:shadow-[0_0_40px_0_rgb(var(--color-green-40-rgb)/0.25)] [&_.card:hover_.iconBox]:bg-green-40",
			},
			{
				colors: "purple",
				enableHover: true,
				class:
					"[&_.card:hover]:border-purple-40 [&_.card:hover]:shadow-[0_0_40px_0_rgb(var(--color-purple-40-rgb)/0.25)] [&_.card:hover_.iconBox]:bg-purple-40",
			},
			{
				colors: "orange",
				enableHover: true,
				class:
					"[&_.card:hover]:border-orange-40 [&_.card:hover]:shadow-[0_0_40px_0_rgb(var(--color-orange-40-rgb)/0.25)] [&_.card:hover_.iconBox]:bg-orange-40",
			},
		],
	},
);

const CardList = React.forwardRef<
	HTMLDivElement,
	React.HTMLAttributes<HTMLDivElement> & VariantProps<typeof cardListVariants>
>(({ className, colors, enableHover, ...props }, ref) => (
	<div
		ref={ref}
		className={cn(cardListVariants({ colors, enableHover }), className)}
		{...props}
	/>
));
CardList.displayName = "CardList";

const cardVariants = cva(
	"card relative p-4 md:p-6 lg:p-8 overflow-hidden transition-all duration-300 [&_.iconBox]:transition-colors [&_.iconBox]:duration-300",
	{
		variants: {
			variant: {
				default: "bg-blue-100 border border-white/25 rounded-lg lg:rounded-2xl",
				glass: "glass-surface ",
			},
		},
		defaultVariants: {
			variant: "default",
		},
	},
);

const Card = React.forwardRef<
	HTMLDivElement,
	React.HTMLAttributes<HTMLDivElement> & VariantProps<typeof cardVariants>
>(({ className, variant, ...props }, ref) => (
	<div
		ref={ref}
		className={cn(cardVariants({ variant }), className)}
		{...props}
	/>
));
Card.displayName = "Card";

const CardWrapper = React.forwardRef<
	HTMLDivElement,
	React.HTMLAttributes<HTMLDivElement> & VariantProps<typeof cardVariants>
>(({ className, ...props }, ref) => (
	<div
		ref={ref}
		className={cn("space-y-4 md:space-y-6 lg:space-y-8", className)}
		{...props}
	/>
));
CardWrapper.displayName = "CardWrapper";

const CardHeader = React.forwardRef<
	HTMLDivElement,
	React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
	<div
		ref={ref}
		className={cn("space-y-2 text-center md:space-y-3 lg:space-y-4", className)}
		{...props}
	/>
));
CardHeader.displayName = "CardHeader";

const CardTitle = React.forwardRef<
	HTMLDivElement,
	React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
	<div
		ref={ref}
		className={cn("title-16 tracking-tight md:title-18 lg:title-24", className)}
		{...props}
	/>
));
CardTitle.displayName = "CardTitle";

const CardContent = React.forwardRef<
	HTMLDivElement,
	React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
	<div
		ref={ref}
		className={cn("space-y-2 md:space-y-3 lg:space-y-4", className)}
		{...props}
	/>
));
CardContent.displayName = "CardContent";

const CardDescription = React.forwardRef<
	HTMLDivElement,
	React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
	<div
		ref={ref}
		className={cn("paragraph-12 md:paragraph-14 lg:paragraph-16", className)}
		{...props}
	/>
));
CardDescription.displayName = "CardDescription";
const CardFooter = React.forwardRef<
	HTMLDivElement,
	React.HTMLAttributes<HTMLDivElement> & {
		separator?: boolean;
	}
>(({ className, children, separator, ...props }, ref) => (
	<div className="pt-1">
		{separator && <Separator className="mb-3 md:mb-4 lg:mb-5" />}
		<div
			ref={ref}
			className={cn("paragraph-12 !text-white/50 md:paragraph-14", className)}
			{...props}
		>
			{children}
		</div>
	</div>
));

CardFooter.displayName = "CardFooter";

export {
	Card,
	CardContent,
	CardDescription,
	CardFooter,
	CardHeader,
	CardList,
	CardTitle,
	CardWrapper,
};
