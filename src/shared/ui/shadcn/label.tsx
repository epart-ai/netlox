"use client";

import * as React from "react";

import * as LabelPrimitive from "@radix-ui/react-label";
import { type VariantProps, cva } from "class-variance-authority";

import { cn } from "@/shared/lib/utils";

const labelVariants = cva(
	"font-medium peer-disabled:cursor-not-allowed peer-disabled:opacity-70",
	{
		variants: {
			size: {
				sm: "paragraph-14",
				md: "paragraph-16",
				lg: "paragraph-18",
			},
		},
		defaultVariants: {
			size: "md",
		},
	},
);

const Label = React.forwardRef<
	React.ElementRef<typeof LabelPrimitive.Root>,
	React.ComponentPropsWithoutRef<typeof LabelPrimitive.Root> &
		VariantProps<typeof labelVariants>
>(({ className, size, ...props }, ref) => (
	<LabelPrimitive.Root
		ref={ref}
		className={cn(labelVariants({ size }), className)}
		{...props}
	/>
));
Label.displayName = LabelPrimitive.Root.displayName;

export { Label };
