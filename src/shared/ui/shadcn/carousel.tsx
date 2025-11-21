"use client";

import * as React from "react";

import useEmblaCarousel, {
	type UseEmblaCarouselType,
} from "embla-carousel-react";

import { cn } from "../../lib/utils";

type CarouselApi = UseEmblaCarouselType[1];
type UseCarouselParameters = Parameters<typeof useEmblaCarousel>;
export type CarouselOptions = UseCarouselParameters[0];
type CarouselPlugin = UseCarouselParameters[1];

type CarouselProps = {
	opts?: CarouselOptions;
	plugins?: CarouselPlugin;
	orientation?: "horizontal" | "vertical";
	setApi?: (api: CarouselApi) => void;
};

type CarouselContextProps = {
	carouselRef: ReturnType<typeof useEmblaCarousel>[0];
	api: ReturnType<typeof useEmblaCarousel>[1];
	scrollPrev: () => void;
	scrollNext: () => void;
	canScrollPrev: boolean;
	canScrollNext: boolean;
} & CarouselProps;

const CarouselContext = React.createContext<CarouselContextProps | null>(null);

function useCarousel() {
	const context = React.useContext(CarouselContext);

	if (!context) {
		throw new Error("useCarousel must be used within a <Carousel />");
	}

	return context;
}

const Carousel = React.forwardRef<
	HTMLDivElement,
	React.HTMLAttributes<HTMLDivElement> & CarouselProps
>(
	(
		{
			orientation = "horizontal",
			opts,
			setApi,
			plugins,
			className,
			children,
			...props
		},
		ref,
	) => {
		const [carouselRef, api] = useEmblaCarousel(
			{
				...opts,
				axis: orientation === "horizontal" ? "x" : "y",
			},
			plugins,
		);
		const [canScrollPrev, setCanScrollPrev] = React.useState(false);
		const [canScrollNext, setCanScrollNext] = React.useState(false);

		const onSelect = React.useCallback((api: CarouselApi) => {
			if (!api) {
				return;
			}

			setCanScrollPrev(api.canScrollPrev());
			setCanScrollNext(api.canScrollNext());
		}, []);

		const scrollPrev = React.useCallback(() => {
			api?.scrollPrev();
		}, [api]);

		const scrollNext = React.useCallback(() => {
			api?.scrollNext();
		}, [api]);

		const handleKeyDown = React.useCallback(
			(event: React.KeyboardEvent<HTMLDivElement>) => {
				if (event.key === "ArrowLeft") {
					event.preventDefault();
					scrollPrev();
				} else if (event.key === "ArrowRight") {
					event.preventDefault();
					scrollNext();
				}
			},
			[scrollPrev, scrollNext],
		);

		React.useEffect(() => {
			if (!api || !setApi) {
				return;
			}

			setApi(api);
		}, [api, setApi]);

		React.useEffect(() => {
			if (!api) {
				return;
			}

			onSelect(api);
			api.on("reInit", onSelect);
			api.on("select", onSelect);

			return () => {
				api?.off("select", onSelect);
			};
		}, [api, onSelect]);

		return (
			<CarouselContext.Provider
				value={{
					carouselRef,
					api: api,
					opts,
					orientation:
						orientation || (opts?.axis === "y" ? "vertical" : "horizontal"),
					scrollPrev,
					scrollNext,
					canScrollPrev,
					canScrollNext,
				}}
			>
				<section
					ref={ref}
					onKeyDownCapture={handleKeyDown}
					className={cn("relative", className)}
					aria-label="Carousel"
					{...props}
				>
					{children}
				</section>
			</CarouselContext.Provider>
		);
	},
);
Carousel.displayName = "Carousel";

const CarouselContent = React.forwardRef<
	HTMLDivElement,
	React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => {
	const { carouselRef, orientation } = useCarousel();

	return (
		<div ref={carouselRef} className="overflow-hidden">
			<div
				ref={ref}
				className={cn(
					"flex",
					orientation === "horizontal" ? "-ml-4" : "-mt-4 flex-col",
					className,
				)}
				{...props}
			/>
		</div>
	);
});
CarouselContent.displayName = "CarouselContent";

const CarouselItem = React.forwardRef<
	HTMLDivElement,
	React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => {
	const { orientation } = useCarousel();

	return (
		<section
			ref={ref}
			className={cn(
				"min-w-0 shrink-0 grow-0 basis-full",
				orientation === "horizontal" ? "pl-4" : "pt-4",
				className,
			)}
			{...props}
		/>
	);
});
CarouselItem.displayName = "CarouselItem";

const CarouselPrevious = React.forwardRef<
	HTMLButtonElement,
	React.ButtonHTMLAttributes<HTMLButtonElement>
>(({ className, ...props }, ref) => {
	const { orientation, scrollPrev, canScrollPrev } = useCarousel();

	return (
		<button
			ref={ref}
			type="button"
			className={cn(
				"absolute h-8 w-8 px-3 lg:h-9 lg:w-9",
				orientation === "horizontal"
					? "left-0 top-1/2 -translate-y-1/2"
					: "left-1/2 top-0 -translate-x-1/2 rotate-90",
				className,
			)}
			disabled={!canScrollPrev}
			onClick={scrollPrev}
			{...props}
		>
			<svg
				xmlns="http://www.w3.org/2000/svg"
				viewBox="0 0 14 23"
				fill="none"
				aria-label="Previous slide icon"
				aria-hidden="true"
				focusable="false"
			>
				<path
					d="M0.673158 13.0116L9.87154 22.1364C10.3203 22.5816 10.9107 22.8024 11.4949 22.8024C12.0792 22.8024 12.6695 22.5828 13.1183 22.1364C14.0159 21.246 14.0159 19.8072 13.1183 18.9156L5.54332 11.4012L13.1183 3.8868C14.0159 2.9964 14.0159 1.5576 13.1183 0.666C12.6695 0.2208 12.0792 0 11.4949 0C10.9107 0 10.3203 0.2196 9.87154 0.666L0.673158 9.7908C-0.224423 10.6812 -0.224423 12.12 0.673158 13.0116Z"
					fill="white"
				/>
			</svg>
			<span className="sr-only">Previous slide</span>
		</button>
	);
});
CarouselPrevious.displayName = "CarouselPrevious";

const CarouselNext = React.forwardRef<
	HTMLButtonElement,
	React.ButtonHTMLAttributes<HTMLButtonElement>
>(({ className, ...props }, ref) => {
	const { orientation, scrollNext, canScrollNext } = useCarousel();

	return (
		<button
			ref={ref}
			type="button"
			className={cn(
				"absolute h-8 w-8 px-3 lg:h-9 lg:w-9",
				orientation === "horizontal"
					? "right-0 top-1/2 -translate-y-1/2"
					: "bottom-0 left-1/2 -translate-x-1/2 rotate-90",
				className,
			)}
			disabled={!canScrollNext}
			onClick={scrollNext}
			{...props}
		>
			<svg
				xmlns="http://www.w3.org/2000/svg"
				viewBox="0 0 15 24"
				aria-label="Next slide icon"
				aria-hidden="true"
				focusable="false"
			>
				<g opacity="0.75" clipPath="url(#clip0_25_91)">
					<path
						d="M13.662 13.4904L4.46366 22.6152C4.01487 23.0604 3.42455 23.2812 2.84027 23.2812C2.256 23.2812 1.66568 23.0616 1.21689 22.6152C0.319306 21.7248 0.319306 20.286 1.21689 19.3944L8.79189 11.88L1.21689 4.36556C0.319306 3.47516 0.319306 2.03636 1.21689 1.14476C1.66568 0.69956 2.256 0.47876 2.84027 0.47876C3.42455 0.47876 4.01487 0.69836 4.46366 1.14476L13.662 10.2696C14.5596 11.16 14.5596 12.5988 13.662 13.4904Z"
						fill="white"
					/>
				</g>
				<defs>
					<clipPath id="clip0_25_91">
						<rect width="15" height="24" fill="white" />
					</clipPath>
				</defs>
			</svg>
			<span className="sr-only">Next slide</span>
		</button>
	);
});
CarouselNext.displayName = "CarouselNext";

export {
	Carousel,
	CarouselContent,
	CarouselItem,
	CarouselNext,
	CarouselPrevious,
	type CarouselApi,
};
