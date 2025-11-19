import type { ReactNode } from "react";

import { Input, Label } from "@/shared/ui/shadcn";

interface Props extends React.ComponentProps<typeof Input> {
	label: string;
	labelSlot?: ReactNode;
	helperText?: string;
}

export const FormInput = ({
	label,
	labelSlot,
	helperText,
	name,
	type = "text",
	...props
}: Props) => {
	return (
		<div className="space-y-2">
			<div className="flex items-center gap-2">
				<Label htmlFor={name}>{label}</Label>
				<span className="ml-auto">{labelSlot}</span>
			</div>
			<Input {...props} id={name} name={name} type={type} />
			{helperText && <p className="paragraph-14 text-blue-20">{helperText}</p>}
		</div>
	);
};
