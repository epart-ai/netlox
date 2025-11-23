import { type VariantProps, cva } from "class-variance-authority";
import { Loader2Icon } from "lucide-react";

import { cn } from "../../lib/utils";

const spinnerVariants = cva("m-auto animate-spin", {
	variants: {
		size: {
			xs: "size-4",
			sm: "size-6",
			md: "size-8",
			lg: "size-10",
		},
	},
	defaultVariants: {
		size: "xs",
	},
});

function Spinner({
	className,
	size,
	...props
}: React.ComponentProps<"svg"> & VariantProps<typeof spinnerVariants>) {
	return (
		<Loader2Icon
			role="status"
			aria-label="Loading"
			className={cn(spinnerVariants({ size }), className)}
			{...props}
		/>
	);
}

export { Spinner };
