import type { ReactNode } from "react";

import { cn } from "@/shared/lib/utils";
import { Reveal } from "@/shared/ui/display";
import { PageHead } from "@/views/_shared/ui";

interface Props {
	children: React.ReactNode;
	className?: string;
	eyebrow?: string;
	title?: ReactNode;
	description?: ReactNode;
	bgImage?: ReactNode;
}

export const RootSectionLayout = ({
	children,
	className,
	eyebrow,
	title,
	description,
	bgImage,
}: Props) => {
	return (
		<section
			className={cn(
				"relative flex items-center justify-center py-15 md:py-25 lg:h-[100vh] lg:py-0",
				className,
			)}
		>
			{bgImage && bgImage}
			<div className="wrapper">
				<Reveal delayMs={0}>
					<div className="mb-10 text-center lg:mb-20">
						<PageHead
							eyebrow={eyebrow}
							title={title}
							description={description}
							align="center"
							theme="blue"
						/>
					</div>
				</Reveal>
				{children}
			</div>
		</section>
	);
};
