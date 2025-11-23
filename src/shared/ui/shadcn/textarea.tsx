import * as React from "react";

import { cn } from "../../lib/utils";

const Textarea = React.forwardRef<
	HTMLTextAreaElement,
	React.ComponentProps<"textarea">
>(({ className, ...props }, ref) => {
	const ariaInvalid = props["aria-invalid"];
	return (
		<textarea
			className={cn(
				"flex min-h-[144px] w-full rounded-lg bg-white/10 px-3 py-4 text-sm shadow-sm transition-colors duration-300 placeholder:text-white/50 hover:ring-1 hover:ring-white/25 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-blue-40 disabled:cursor-not-allowed disabled:bg-white/5",
				!!ariaInvalid && "ring-1 ring-alert",
				className,
			)}
			ref={ref}
			{...props}
		/>
	);
});
Textarea.displayName = "Textarea";

export { Textarea };
