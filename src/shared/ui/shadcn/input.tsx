import * as React from "react";

import { cn } from "../../lib/utils";

const Input = React.forwardRef<
	HTMLInputElement,
	React.ComponentProps<"input"> & { error?: boolean }
>(({ className, ...props }, ref) => {
	const ariaInvalid = props["aria-invalid"];

	return (
		<input
			{...props}
			className={cn(
				"file:text-foreground flex h-12 w-full rounded-lg bg-white/10 px-3 py-4 text-sm shadow-sm transition-colors duration-300 file:border-0 file:bg-transparent file:font-medium placeholder:text-white/50 hover:ring-1 hover:ring-white/25 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-blue-40 disabled:cursor-not-allowed disabled:bg-white/5",
				!!ariaInvalid && "ring-1 ring-alert",
				(props.disabled || props.readOnly) &&
					"text-white/50 hover:ring-0 focus-visible:ring-0",
				className,
			)}
			ref={ref}
		/>
	);
});
Input.displayName = "Input";

export { Input };
