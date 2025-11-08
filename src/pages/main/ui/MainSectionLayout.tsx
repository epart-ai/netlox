import { ReactNode } from "react";

import { cn } from "@/shared/lib/utils";

interface Props {
	children: React.ReactNode;
	className?: string;
	subTitle?: ReactNode;
	title?: ReactNode;
	description?: ReactNode;
	bgImage?: ReactNode;
}

export const MainSectionLayout = ({
	children,
	className,
	subTitle,
	title,
	description,
	bgImage,
}: Props) => {
	return (
		<div
			className={cn(
				"md:py-25 relative flex items-center justify-center py-15 lg:h-[100vh]",
				className,
			)}
		>
			{bgImage && bgImage}
			<div className="wrapper">
				<div className="mb-10 text-center lg:mb-20">
					{subTitle && (
						<strong className="subTitle-16 lg:subTitle-18">{subTitle}</strong>
					)}
					{title && (
						<h2 className="title-36 mt-1.5 lg:title-44 lg:mt-3">{title}</h2>
					)}
					{description && (
						<p className="paragraph-16 mt-4 lg:paragraph-18 lg:mt-8">
							{description}
						</p>
					)}
				</div>
				{children}
			</div>
		</div>
	);
};
