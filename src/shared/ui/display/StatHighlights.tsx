import { Fragment, type ReactNode } from "react";

import { cn } from "@/shared/lib/utils";
import { Separator } from "@/shared/ui/shadcn/separator";

type StatItem = {
	highlight: ReactNode;
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
			className={cn(
				"flex flex-col items-stretch gap-6 md:flex-row lg:gap-12.5",
				className,
			)}
		>
			{items.map((item, index) => (
				<Fragment key={`${index}-${String(item.title)}`}>
					{showSeparators && index !== 0 && (
						<Separator
							opacity="25"
							orientation="vertical"
							className={"hidden h-auto md:my-[5%] md:block"}
						/>
					)}
					<div>
						<p className="title-44 text-blue-40 lg:title-60">
							{item.highlight}
						</p>
						{item.title && (
							<strong className="title-20 mt-6 lg:title-24 lg:mt-9">
								{item.title}
							</strong>
						)}
						{item.description && (
							<p className="paragraph-14 mt-3 lg:paragraph-16 lg:mt-4.5">
								{item.description}
							</p>
						)}
					</div>
				</Fragment>
			))}
		</div>
	);
};
