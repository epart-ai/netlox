import Image from "next/image";

import { type VariantProps, cva } from "class-variance-authority";

import { cn } from "@/shared/lib/utils";

const iconCheckVariants = cva("flex items-center justify-center rounded-full", {
	variants: {
		size: {
			"12": "size-3 p-0.5",
			"80": "size-20 p-4.5",
		},
		color: {
			blue: "bg-blue-40",
			blue50: "bg-blue-40/50",
		},
	},
	defaultVariants: {
		size: "12",
		color: "blue",
	},
});

interface Props extends VariantProps<typeof iconCheckVariants> {
	className?: string;
}

export const IconCheck = ({ size, color, className }: Props) => {
	return (
		<span className={cn(iconCheckVariants({ size, color }), className)}>
			<Image
				src="/images/common/icon_check_white.svg"
				alt="Check Icon"
				width={8}
				height={8}
				className="size-full"
			/>
		</span>
	);
};
