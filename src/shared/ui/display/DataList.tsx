import type { ReactNode } from "react";

import { type VariantProps, cva } from "class-variance-authority";

import { cn } from "@/shared/lib/utils";
import { IconCheck } from "@/shared/ui/icon";

const dataListVariants = cva("flex flex-col gap-1.5 md:gap-2", {
	variants: {
		variant: {
			default: "",
			subtle: "paragraph-12 !text-white/50 md:paragraph-14",
		},
	},
});

interface Props extends VariantProps<typeof dataListVariants> {
	data: (string | ReactNode)[];
	className?: string;
}

export const DataList = ({ data, className, variant = "default" }: Props) => {
	return (
		<ul className={cn(dataListVariants({ variant }), className)}>
			{data.map((item, index) => (
				<li key={index} className="flex gap-1.5">
					<IconCheck className="shrink-0 translate-y-[25%]" />
					<p>{item}</p>
				</li>
			))}
		</ul>
	);
};
