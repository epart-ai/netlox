import { Fragment, type ReactNode, isValidElement } from "react";

import { cn } from "@/shared/lib/utils";
import {
	headingEyebrow,
	headingSecondary,
	paragraphLead,
} from "@/shared/styles/snippets";

interface Props {
	theme?: "blue" | "green" | "purple" | "orange";
	eyebrow?: string;
	title: ReactNode;
	description?: ReactNode;
	align?: "left" | "center" | "right";
	className?: string;
}
export const PageHead = ({
	theme = "blue",
	eyebrow,
	title,
	description,
	align = "center",
	className,
}: Props) => {
	return (
		<div
			className={cn(
				align === "left" && "text-left",
				align === "center" && "text-center",
				align === "right" && "text-right",
				className,
			)}
		>
			{eyebrow ? (
				<strong className={cn(headingEyebrow, `text-${theme}-20`)}>
					{eyebrow}
				</strong>
			) : null}
			<h3 className={headingSecondary}>{title}</h3>
			{description ? (
				typeof description === "string" ||
				(isValidElement(description) && description.type === Fragment) ? (
					<p className={cn(paragraphLead, "[&_strong]:font-semibold")}>
						{description}
					</p>
				) : (
					<div className={cn(paragraphLead, "[&_strong]:font-semibold")}>
						{description}
					</div>
				)
			) : null}
		</div>
	);
};
