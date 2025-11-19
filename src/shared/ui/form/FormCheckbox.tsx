import type { ReactNode } from "react";

import { type VariantProps, cva } from "class-variance-authority";

import { Checkbox, Label } from "@/shared/ui/shadcn";

const formCheckboxVariants = cva("flex items-center ", {
	variants: {
		size: {
			sm: "gap-2",
			md: "gap-3",
			lg: "gap-4",
		},
	},
	defaultVariants: {
		size: "sm",
	},
});

interface Props
	extends React.ComponentProps<typeof Checkbox>,
		VariantProps<typeof formCheckboxVariants> {
	label: ReactNode;
	labelSlot?: ReactNode;
	helperText?: string;
}

export const FormCheckbox = ({
	label,
	labelSlot,
	helperText,
	name,
	size,
	...props
}: Props) => {
	return (
		<div className={formCheckboxVariants({ size })}>
			<Checkbox {...props} id={name} name={name} />
			<Label htmlFor={name} size={size}>
				{label}
				{labelSlot}
			</Label>
			{helperText && <p className="paragraph-14 text-blue-20">{helperText}</p>}
		</div>
	);
};
