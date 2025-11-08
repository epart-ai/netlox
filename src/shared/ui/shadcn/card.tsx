import * as React from "react";

import { cn } from "@/shared/lib/utils";
import { Separator } from "@/shared/ui/shadcn/separator";

const CardList = React.forwardRef<
	HTMLDivElement,
	React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
	<div
		ref={ref}
		className={cn(
			"grid gap-5 md:grid-cols-2 lg:grid-cols-3 lg:gap-10",
			className,
		)}
		{...props}
	/>
));
CardList.displayName = "CardList";

const Card = React.forwardRef<
	HTMLDivElement,
	React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
	<div
		ref={ref}
		className={cn("glass-surface p-4 md:p-6 lg:p-8", className)}
		{...props}
	/>
));
Card.displayName = "Card";

const CardHeader = React.forwardRef<
	HTMLDivElement,
	React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
	<div ref={ref} className={cn("flex flex-col", className)} {...props} />
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
		className={cn("flex flex-col gap-4 md:gap-6 lg:gap-8", className)}
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
	React.HTMLAttributes<HTMLDivElement>
>(({ className, children, ...props }, ref) => (
	<>
		<Separator className="mt-5" />
		<div ref={ref} className={cn("pt-5", className)} {...props}>
			{children}
		</div>
	</>
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
};
