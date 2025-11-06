import * as React from "react";

import { Slot } from "@radix-ui/react-slot";
import { type VariantProps, cva } from "class-variance-authority";

import { cn } from "@/shared/lib/utils";

const buttonVariants = cva(
	"inline-flex items-center relative justify-center gap-2 whitespace-nowrap rounded-lg text-title focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0 hover:after:content-[''] hover:after:absolute hover:after:inset-0 hover:after:w-full hover:after:h-full hover:after:rounded-lg hover:after:pointer-events-none hover:shadow-none hover:after:bg-[#00000026]",
	{
		variants: {
			variant: {
				primary: "bg-accent !text-title",
				secondary:
					"border border-border bg-[linear-gradient(to_bottom,_#ffffff40,_#ffffff0d)] !text-title",
				outline: "border border-border !text-title",
				text: "!text-paragraph hover:text-title",
			},
			size: {
				sm: "h-9 px-4 subTitle-14",
				md: "h-10 px-5 subTitle-16",
				lg: "h-11 px-6 subTitle-18",
			},
			sm: {
				true: "h-9 px-4 subTitle-14",
				false: "",
			},
			md: {
				true: "md:h-10 md:px-5 md:subTitle-16 ",
				false: "",
			},
			lg: {
				true: "lg:h-11 lg:px-6 lg:subTitle-18",
				false: "",
			},
		},
		defaultVariants: {
			variant: "primary",
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
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
	(
		{ className, variant, size, sm, md, lg, asChild = false, ...props },
		ref,
	) => {
		const Comp = asChild ? Slot : "button";
		return (
			<Comp
				className={cn(buttonVariants({ variant, size, sm, md, lg, className }))}
				ref={ref}
				{...props}
			/>
		);
	},
);
Button.displayName = "Button";

export { Button, buttonVariants };
