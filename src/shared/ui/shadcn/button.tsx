import * as React from "react";

import { Slot } from "@radix-ui/react-slot";
import { type VariantProps, cva } from "class-variance-authority";

import { cn } from "../../lib/utils";
import { Spinner } from "./spinner";

const buttonVariants = cva(
	"inline-flex items-center relative justify-center gap-2 whitespace-nowrap rounded-lg !text-white focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:shrink-0 transition-colors duration-300",
	{
		variants: {
			variant: {
				primary: "",
				secondary:
					"border border-white/25 to-white/5 from-white/25 bg-gradient-to-b backdrop-blur-[6px] hover:border-white",
				outline: "border border-white/25",
				text: "!text-white/75 hover:text-white",
				white: "bg-white !text-blue-60 hover:bg-blue-40 hover:!text-white",
				icon: "!p-1 rounded-full !h-auto ",
			},
			colors: {
				blue: "",
				green: "",
				purple: "",
				orange: "",
			},
			size: {
				sm: "h-9 px-4 title-14",
				md: "h-10 px-5 title-16",
				lg: "h-12 px-6 title-18",
			},
			sm: {
				true: "h-9 px-4 title-14",
				false: "",
			},
			md: {
				true: "md:h-10 md:px-5 md:title-16 ",
				false: "",
			},
			lg: {
				true: "lg:h-12 lg:px-6 lg:title-18",
				false: "",
			},
		},
		compoundVariants: [
			{
				colors: "blue",
				variant: "primary",
				class: "bg-blue-40 hover:bg-blue-60",
			},
			{
				colors: "green",
				variant: "primary",
				class: "bg-green-40 hover:bg-green-60",
			},
			{
				colors: "purple",
				variant: "primary",
				class: "bg-purple-40 hover:bg-purple-60",
			},
			{
				colors: "orange",
				variant: "primary",
				class: "bg-orange-40 hover:bg-orange-60",
			},
		],
		defaultVariants: {
			variant: "primary",
			colors: "blue",
			sm: true,
			md: true,
			lg: true,
		},
	},
);

export interface ButtonProps
	extends React.ButtonHTMLAttributes<HTMLButtonElement>,
		VariantProps<typeof buttonVariants> {
	asChild?: boolean;
	isLoading?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
	(
		{
			className,
			colors,
			variant,
			size,
			sm,
			md,
			lg,
			asChild = false,
			isLoading = false,
			...props
		},
		ref,
	) => {
		const Comp = asChild ? Slot : "button";
		return (
			<Comp
				className={cn(
					buttonVariants({ variant, size, sm, md, lg, colors, className }),
				)}
				ref={ref}
				{...props}
			>
				{isLoading ? <Spinner /> : props.children}
			</Comp>
		);
	},
);
Button.displayName = "Button";

const buttonBoxVariants = cva("flex flex-col items-center justify-center", {
	variants: {
		orientation: {
			horizontal: "gap-3 md:flex-row",
			vertical: "gap-4",
		},
	},
	defaultVariants: {
		orientation: "horizontal",
	},
});

interface ButtonBoxProps
	extends React.HTMLAttributes<HTMLDivElement>,
		VariantProps<typeof buttonBoxVariants> {
	asChild?: boolean;
}

const ButtonBox = React.forwardRef<HTMLDivElement, ButtonBoxProps>(
	({ className, orientation, asChild = false, ...props }, ref) => {
		const Comp = asChild ? Slot : "div";
		return (
			<Comp
				className={cn(buttonBoxVariants({ orientation }), className)}
				ref={ref}
				{...props}
			/>
		);
	},
);
ButtonBox.displayName = "ButtonBox";

export { Button, ButtonBox, buttonVariants };
