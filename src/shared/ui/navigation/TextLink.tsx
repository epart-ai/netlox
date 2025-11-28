import Link, { type LinkProps } from "next/link";
import type React from "react";

import { type VariantProps, cva } from "class-variance-authority";

import { cn } from "@/shared/lib/utils";

const linkVariant = cva(
	"inline-flex w-fit items-center gap-2 md:gap-3 transition-colors duration-300",
	{
		variants: {
			colors: {
				white75: "text-white/75 hover:text-white",
				blue: "text-blue-20 [&_path]:fill-blue-20",
				green: "text-green-40 [&_path]:fill-green-40",
				purple: "text-purple-40 [&_path]:fill-purple-40",
				orange: "text-orange-40 [&_path]:fill-orange-40",
			},
			size: {
				sm: "paragraph-14",
				md: "paragraph-16",
				lg: "paragraph-18",
			},
		},

		defaultVariants: {
			colors: "blue",
			size: "sm",
		},
	},
);

type AnchorLikeProps = Omit<
	React.AnchorHTMLAttributes<HTMLAnchorElement>,
	keyof LinkProps<string>
>;

interface Props
	extends VariantProps<typeof linkVariant>,
		LinkProps<string>,
		AnchorLikeProps {
	label: string | React.ReactNode;
	leftIcon?: React.ReactNode;
	rightIcon?: React.ReactNode;
	iconVisible?: "left" | "right" | true | false;
	className?: string;
	underline?: boolean;
}

export const TextLink = ({
	href,
	label,
	colors,
	size,
	leftIcon,
	rightIcon,
	iconVisible = false,
	className,
	underline,
	...props
}: Props) => {
	// href가 undefined인 경우 방어 처리
	if (!href) {
		console.warn("TextLink: href prop is required but was undefined");
		return (
			<span
				className={cn(
					linkVariant({ colors, size }),
					underline && "underline underline-offset-2",
					className,
				)}
			>
				{label}
			</span>
		);
	}

	return (
		<Link
			{...props}
			href={href}
			className={cn(
				linkVariant({ colors, size }),
				underline && "underline underline-offset-2",
				className,
			)}
		>
			{iconVisible !== false &&
				iconVisible !== "right" &&
				(iconVisible === "left" || leftIcon || iconVisible) && (
					<span className="leftIcon">
						{leftIcon ? (
							leftIcon
						) : (
							<svg
								xmlns="http://www.w3.org/2000/svg"
								viewBox="0 0 124 200"
								width={5}
								height={8}
								aria-hidden="true"
								focusable="false"
								className="rotate-180"
							>
								<path d="M112.94,112.42l-76.04,76.04c-3.71,3.71-8.59,5.55-13.42,5.55s-9.71-1.83-13.42-5.55c-7.42-7.42-7.42-19.41,0-26.84l62.62-62.62L10.06,36.38c-7.42-7.42-7.42-19.41,0-26.84,3.71-3.71,8.59-5.55,13.42-5.55s9.71,1.83,13.42,5.55l76.04,76.04c7.42,7.42,7.42,19.41,0,26.84Z" />
							</svg>
						)}
					</span>
				)}
			{label}

			{iconVisible !== false &&
				iconVisible !== "left" &&
				(iconVisible === "right" || rightIcon || iconVisible) && (
					<span className="rightIcon">
						{rightIcon ? (
							rightIcon
						) : (
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
						)}
					</span>
				)}
		</Link>
	);
};
