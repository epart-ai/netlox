"use client";

import Image from "next/image";
import { useEffect } from "react";

import { useCloseRouteDialog } from "@/shared/lib/useCloseRouteDialog";
import { cn } from "@/shared/lib/utils";
import { Button } from "@/shared/ui/shadcn/button";
import { Card } from "@/shared/ui/shadcn/card";

interface Props {
	children: React.ReactNode;
	className?: string;
}

export const RouteDialog = ({ children, className }: Props) => {
	const closeDialog = useCloseRouteDialog();

	useEffect(() => {
		const onKeyDown = (event: KeyboardEvent) => {
			if (event.key === "Escape") {
				event.preventDefault();
				closeDialog();
			}
		};
		window.addEventListener("keydown", onKeyDown);
		return () => window.removeEventListener("keydown", onKeyDown);
	}, [closeDialog]);

	const handleBackdropClick = () => {
		closeDialog();
	};
	return (
		<div
			className={cn("fixed inset-0 z-[100] size-full bg-black/60", className)}
			role="dialog"
			aria-modal="true"
		>
			<button
				type="button"
				className="absolute inset-0 h-full w-full cursor-default"
				aria-label="Close modal"
				onClick={handleBackdropClick}
			/>
			<div className="wrapper flex h-full items-center justify-center">
				<Card className="w-full max-w-480">
					<Button
						variant="icon"
						aria-label="Close modal"
						className="absolute right-5 top-5"
						onClick={closeDialog}
					>
						<Image
							src="/images/common/icon_close_thin_white.svg"
							alt="Close"
							width={16}
							height={16}
						/>
					</Button>
					{children}
				</Card>
			</div>
		</div>
	);
};
