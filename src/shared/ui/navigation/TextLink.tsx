import Link, { type LinkProps } from "next/link";
import type React from "react";

import { type VariantProps, cva } from "class-variance-authority";

import { cn } from "@/shared/lib/utils";

const linkVariant = cva("inline-flex w-fit items-center gap-2 md:gap-3", {
	variants: {
		colors: {
			blue: "text-blue-20 [&_path]:fill-blue-20",
			green: "text-green-60 [&_path]:fill-green-60",
			purple: "text-purple-60 [&_path]:fill-purple-60",
			orange: "text-orange-60 [&_path]:fill-orange-60",
		},
		size: {
			sm: "paragraph-14",
			md: "paragraph-16",
			lg: "paragraph-18",
		},
		iconAlign: {
			left: "flex-row-reverse [&_svg]:rotate-180",
			right: "",
		},
		icon: {
			show: "",
			hide: "[&_svg]:hidden",
		},
	},
	defaultVariants: {
		colors: "blue",
		size: "sm",
		iconAlign: "right",
		icon: "hide",
	},
});

type AnchorLikeProps = Omit<
	React.AnchorHTMLAttributes<HTMLAnchorElement>,
	keyof LinkProps<string>
>;

interface Props
	extends VariantProps<typeof linkVariant>,
		LinkProps<string>,
		AnchorLikeProps {
	label: string;
	className?: string;
}

export const TextLink = ({
	href,
	label,
	colors,
	iconAlign,
	icon,
	className,
	...props
}: Props) => {
	return (
		<Link
			{...props}
			href={href}
			className={cn(linkVariant({ colors, iconAlign, icon }), className)}
		>
			{label}
			<svg
				xmlns="http://www.w3.org/2000/svg"
				viewBox="0 0 124 200"
				width={5}
				height={8}
				aria-hidden="true"
				focusable="false"
			>
				<path d="M112.94,112.42l-76.04,76.04c-3.71,3.71-8.59,5.55-13.42,5.55s-9.71-1.83-13.42-5.55c-7.42-7.42-7.42-19.41,0-26.84l62.62-62.62L10.06,36.38c-7.42-7.42-7.42-19.41,0-26.84,3.71-3.71,8.59-5.55,13.42-5.55s9.71,1.83,13.42,5.55l76.04,76.04c7.42,7.42,7.42,19.41,0,26.84Z" />
			</svg>
		</Link>
	);
};
