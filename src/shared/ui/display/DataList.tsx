import type { ReactNode } from "react";

import { cn } from "@/shared/lib/utils";
import { IconCheck } from "@/shared/ui/icon";

interface Props {
	variant?: "default" | "blue";
	data: (string | ReactNode)[];
	className?: string;
}

export const DataList = ({ data, className }: Props) => {
	return (
		<ul className={cn("flex flex-col gap-1.5 md:gap-2", className)}>
			{data.map((item, index) => (
				<li key={index} className="flex gap-1.5">
					<IconCheck className="shrink-0 translate-y-0.5" />
					<p>{item}</p>
				</li>
			))}
		</ul>
	);
};
