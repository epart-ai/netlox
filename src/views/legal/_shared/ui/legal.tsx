import * as React from "react";

import { cn } from "@/shared/lib/utils";

const LegalContainer = React.forwardRef<
	HTMLDivElement,
	React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
	<div
		ref={ref}
		className={cn(
			"legal-container space-y-10 py-20 lg:space-y-20 lg:py-[160px]",
			className,
		)}
		{...props}
	/>
));
LegalContainer.displayName = "LegalContainer";

const LegalArticle = React.forwardRef<
	HTMLDivElement,
	React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
	<div
		ref={ref}
		className={cn(
			"legal-article space-y-3 md:space-y-4 lg:space-y-5 [&_b]:font-semibold",
			className,
		)}
		{...props}
	/>
));
LegalArticle.displayName = "LegalArticle";

const LegalArticleTitle = React.forwardRef<
	HTMLHeadingElement,
	React.HTMLAttributes<HTMLHeadingElement>
>(({ className, ...props }, ref) => (
	<h3
		ref={ref}
		className={cn(
			"legal-section-title lg:title-32 title-24 md:title-28",
			className,
		)}
		{...props}
	/>
));
LegalArticleTitle.displayName = "LegalArticleTitle";

const LegalCardParagraph = React.forwardRef<
	HTMLParagraphElement,
	React.HTMLAttributes<HTMLParagraphElement>
>(({ className, children, ...props }, ref) => (
	<p
		ref={ref}
		className={cn(
			"legal-card-paragraph paragraph-14 space-y-2 md:paragraph-16 lg:paragraph-18 md:space-y-3 [&>span]:block",
			className,
		)}
		{...props}
	>
		{children}
	</p>
));
LegalCardParagraph.displayName = "LegalCardParagraph";

const LegalCardContent = React.forwardRef<
	HTMLDivElement,
	React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
	<div
		ref={ref}
		className={cn(
			"legal-card-content space-y-3 md:space-y-4 lg:space-y-5",
			className,
		)}
		{...props}
	/>
));
LegalCardContent.displayName = "LegalCardContent";

export {
	LegalArticle,
	LegalArticleTitle,
	LegalCardContent,
	LegalCardParagraph,
	LegalContainer,
};
