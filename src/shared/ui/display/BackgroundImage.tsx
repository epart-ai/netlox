import { type VariantProps, cva } from "class-variance-authority";

import { cn } from "@/shared/lib/utils";

const backgroundImageVariants = cva(
	"min-h-screen inset-0 -z-[1] h-full w-full bg-cover bg-center absolute-center",
	{
		variants: {
			opacity: {
				"0": "opacity-0",
				"35": "opacity-35",
				"50": "opacity-50",
				"100": "opacity-100",
			},
		},
		defaultVariants: {
			opacity: "100",
		},
	},
);
interface Props extends VariantProps<typeof backgroundImageVariants> {
	className?: string;
	src: string;
}

export const BackgroundImage = ({ className, src, opacity }: Props) => {
	return (
		<div
			aria-hidden="true"
			className={cn(backgroundImageVariants({ opacity }), className)}
			style={{ backgroundImage: `url(${src})` }}
		></div>
	);
};
