"use client";

import {
	type Key,
	type ReactNode,
	isValidElement,
	useEffect,
	useMemo,
	useState,
} from "react";

import { cn } from "@/shared/lib/utils";
import {
	Carousel,
	type CarouselApi,
	CarouselContent,
	CarouselItem,
	CarouselNext,
	type CarouselOptions,
	CarouselPrevious,
} from "@/shared/ui/shadcn/carousel";

interface Props {
	data: ReactNode[];
	enablePagination?: boolean;
	enableNavigation?: boolean;
	opts?: CarouselOptions;
}

export const DataCarousel = ({
	data,
	enablePagination = true,
	enableNavigation = true,
	opts,
}: Props) => {
	const [api, setApi] = useState<CarouselApi>();
	const [current, setCurrent] = useState(1);
	const paginationKeys = useMemo(
		() => Array.from({ length: data.length }, (_, i) => `dot-${i}`),
		[data.length],
	);
	useEffect(() => {
		if (!api) {
			return;
		}
		setCurrent(api.selectedScrollSnap() + 1);
		api.on("select", () => {
			setCurrent(api.selectedScrollSnap() + 1);
		});
	}, [api]);
	return (
		<div>
			<Carousel
				setApi={setApi}
				className=""
				opts={{
					align: "start",
					loop: true,
					...opts,
				}}
			>
				<CarouselContent className="">
					{data.map((item) => {
						const itemKey =
							(isValidElement(item) ? (item.key as Key | null) : null) ??
							undefined;
						return (
							<CarouselItem key={itemKey} className="">
								{item}
							</CarouselItem>
						);
					})}
				</CarouselContent>
				{enableNavigation && (
					<>
						<CarouselPrevious /> <CarouselNext />
					</>
				)}
			</Carousel>
			{enablePagination && (
				<div className="mt-4 flex justify-center gap-1.5 lg:gap-2">
					{paginationKeys.map((key, index) => {
						return (
							<span
								key={key}
								className={cn(
									"h-1.5 w-1.5 rounded-full lg:h-2.5 lg:w-2.5",
									current === index + 1
										? "w-3.5 bg-blue-40 lg:w-6"
										: "bg-white/50",
								)}
							/>
						);
					})}
				</div>
			)}
		</div>
	);
};
