import * as React from "react";

import { type VariantProps, cva } from "class-variance-authority";

import { Separator } from "@/shared/ui/shadcn/separator";

import { cn } from "../../lib/utils";

const cardListVariants = cva(
	"grid gap-5 lg:gap-10 [&_.card:hover]:-translate-y-2",
	{
		variants: {
			colors: {
				blue: "[&_.icon-box]:bg-blue-40/25 [&_.card:hover]:border-blue-40 [&_.card:hover]:shadow-[0_0_40px_0_rgb(var(--color-blue-60-rgb)/0.25)] [&_.card:hover_.icon-box]:bg-blue-60",
				green:
					"[&_.icon-box]:bg-green-40/15 [&_.card:hover]:border-green-40 [&_.card:hover]:shadow-[0_0_40px_0_rgb(var(--color-green-40-rgb)/0.25)] [&_.card:hover_.icon-box]:bg-green-40",
				purple:
					"[&_.icon-box]:bg-purple-10/15 [&_.card:hover]:border-purple-40 [&_.card:hover]:shadow-[0_0_40px_0_rgb(var(--color-purple-40-rgb)/0.25)] [&_.card:hover_.icon-box]:bg-purple-40",
				orange:
					"[&_.icon-box]:bg-orange-10/15 [&_.card:hover]:border-orange-40 [&_.card:hover]:shadow-[0_0_40px_0_rgb(var(--color-orange-40-rgb)/0.25)] [&_.card:hover_.icon-box]:bg-orange-40",
			},
			orientation: {
				horizontal: "md:grid-cols-2 lg:grid-cols-3",
				vertical: "",
			},
		},
		defaultVariants: {
			orientation: "horizontal",
		},
	},
);

export type CardListProps = React.HTMLAttributes<HTMLDivElement> &
	VariantProps<typeof cardListVariants>;

const CardList = React.forwardRef<HTMLDivElement, CardListProps>(
	({ className, colors, orientation, ...props }, ref) => (
		<div
			ref={ref}
			className={cn(cardListVariants({ colors, orientation }), className)}
			{...props}
		/>
	),
);
CardList.displayName = "CardList";

const cardVariants = cva(
	"card relative overflow-hidden p-4 md:p-6 lg:p-8 duration-300 [&_.icon-box]:transition-colors [&_.icon-box]:duration-300",
	{
		variants: {
			variant: {
				default: "bg-blue-80 border border-white/25 rounded-lg lg:rounded-2xl",
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
		className={cn(
			"card-wrapper space-y-4 md:space-y-6 lg:space-y-8",
			className,
		)}
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
		className={cn(
			"card-header space-y-2 text-center md:space-y-3 lg:space-y-4",
			className,
		)}
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
		className={cn(
			"card-title title-18 tracking-tight md:title-20 lg:title-24",
			className,
		)}
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
		className={cn(
			"card-content space-y-2 md:space-y-3 lg:space-y-4",
			className,
		)}
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
		className={cn(
			"card-description paragraph-12 md:paragraph-14 lg:paragraph-16",
			className,
		)}
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
	<div ref={ref} className={cn("card-footer pt-1", className)} {...props}>
		{separator && <Separator className="mb-3 md:mb-4 lg:mb-5" />}
		{children}
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
