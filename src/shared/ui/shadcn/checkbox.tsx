"use client";

import * as React from "react";

import * as CheckboxPrimitive from "@radix-ui/react-checkbox";
import { type VariantProps, cva } from "class-variance-authority";

import { cn } from "@/shared/lib/utils";

const checkboxVariants = cva(
	"border-primary focus-visible:ring-ring peer grid shrink-0 place-content-center rounded-md border border-white/50 shadow focus-visible:outline-none focus-visible:ring-1 disabled:cursor-not-allowed disabled:opacity-50 data-[state=checked]:border-none data-[state=checked]:bg-blue-60 [&_svg]:size-2",
	{
		variants: {
			size: {
				sm: "h-3.5 w-3.5",
				md: "h-4 w-4",
				lg: "h-5 w-5",
			},
		},
		defaultVariants: {
			size: "sm",
		},
	},
);

const Checkbox = React.forwardRef<
	React.ElementRef<typeof CheckboxPrimitive.Root>,
	React.ComponentPropsWithoutRef<typeof CheckboxPrimitive.Root> &
		VariantProps<typeof checkboxVariants>
>(({ className, size, ...props }, ref) => (
	<CheckboxPrimitive.Root
		ref={ref}
		className={cn(checkboxVariants({ size }), className)}
		{...props}
	>
		<CheckboxPrimitive.Indicator
			className={cn("grid place-content-center text-current")}
		>
			<svg
				xmlns="http://www.w3.org/2000/svg"
				width="8"
				height="8"
				viewBox="0 0 8 8"
				fill="none"
			>
				<path
					d="M7.79995 1.97004C7.79995 2.17164 7.72115 2.36124 7.57875 2.50404L3.51795 6.56484C3.37515 6.70724 3.18595 6.78604 2.98435 6.78604C2.78275 6.78604 2.59315 6.70724 2.45035 6.56484L0.420751 4.53404C0.278351 4.39164 0.199951 4.20244 0.199951 4.00044C0.199951 3.79844 0.278351 3.60924 0.420751 3.46684C0.562751 3.32444 0.752351 3.24604 0.954351 3.24604C1.15635 3.24604 1.34555 3.32444 1.48795 3.46684L2.98475 4.96364L6.51195 1.43604C6.65395 1.29364 6.84355 1.21484 7.04555 1.21484C7.24755 1.21484 7.43595 1.29364 7.57875 1.43604C7.64995 1.50724 7.70555 1.59004 7.74315 1.68124C7.78075 1.77164 7.80035 1.86924 7.80035 1.96964L7.79995 1.97004Z"
					fill="white"
				/>
			</svg>
		</CheckboxPrimitive.Indicator>
	</CheckboxPrimitive.Root>
));
Checkbox.displayName = CheckboxPrimitive.Root.displayName;

export { Checkbox };
