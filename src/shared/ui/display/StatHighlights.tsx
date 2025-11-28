import { Fragment, type ReactNode } from "react";

import { cn } from "@/shared/lib/utils";
import { AnimatedCounter } from "@/shared/ui/display/AnimatedCounter";
import { Separator } from "@/shared/ui/shadcn/separator";

type StatItem = {
	highlight: {
		value: number;
		prefix?: string;
		unit: string;
	};
	title?: ReactNode;
	description?: ReactNode;
};

interface Props {
	items: StatItem[];
	className?: string;
	showSeparators?: boolean;
}

export const StatHighlights = ({
	items,
	className,
	showSeparators = true,
}: Props) => {
	return (
		<div
			className={cn("flex flex-col gap-6 md:flex-row lg:gap-12.5", className)}
		>
			{items.map((item, index) => (
				<Fragment key={`${index}-${String(item.title)}`}>
					{showSeparators && index !== 0 && (
						<Separator
							opacity="25"
							orientation="vertical"
							className={"hidden h-auto md:my-[40px] md:block"}
						/>
					)}
					<div>
						<p className="title-44 text-blue-40 lg:title-60">
							{item.highlight.prefix}
							<AnimatedCounter value={item.highlight.value} />
							{item.highlight.unit}
						</p>
						{item.title && (
							<strong className="title-20 mt-6 block lg:title-24 lg:mt-9">
								{item.title}
							</strong>
						)}
						{item.description && (
							<p className="paragraph-14 mt-2 lg:paragraph-16 lg:mt-3.5">
								{item.description}
							</p>
						)}
					</div>
				</Fragment>
			))}
		</div>
	);
};
