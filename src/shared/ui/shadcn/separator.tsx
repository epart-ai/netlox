"use client";

import * as React from "react";

import * as SeparatorPrimitive from "@radix-ui/react-separator";
import { type VariantProps, cva } from "class-variance-authority";

import { cn } from "@/shared/lib/utils";

const separatorVariants = cva("bg-white", {
	variants: {
		opacity: {
			"10": "opacity-10",
			"25": "opacity-25",
			"50": "opacity-50",
		},
		orientation: {
			horizontal: "h-[1px] w-full",
			vertical: "h-full w-[1px]",
		},
	},
	defaultVariants: {
		opacity: "10",
	},
});

type SeparatorVariantProps = Omit<
	VariantProps<typeof separatorVariants>,
	"orientation"
>;

interface SeparatorProps
	extends React.ComponentPropsWithoutRef<typeof SeparatorPrimitive.Root>,
		SeparatorVariantProps {}

const Separator = React.forwardRef<
	React.ElementRef<typeof SeparatorPrimitive.Root>,
	SeparatorProps
>(
	(
		{
			className,
			orientation = "horizontal",
			opacity,
			decorative = true,
			...props
		},
		ref,
	) => (
		<SeparatorPrimitive.Root
			ref={ref}
			decorative={decorative}
			orientation={orientation}
			className={cn(separatorVariants({ orientation, opacity }), className)}
			{...props}
		/>
	),
);
Separator.displayName = SeparatorPrimitive.Root.displayName;

export { Separator };
