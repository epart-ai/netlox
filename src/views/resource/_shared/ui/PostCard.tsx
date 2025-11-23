import Image from "next/image";
import Link from "next/link";

import {
	Card,
	CardContent,
	CardFooter,
	CardTitle,
	CardWrapper,
} from "@/shared/ui/shadcn/card";
import { formatDate } from "@/views/resource/_shared/lib/resource.utils";

type PostCardProps = {
	id: string | number;
	title: string;
	createdAt: string;
	imageUrl?: string | null;
	href?: string | null;
};

export function PostCard({
	id,
	title,
	createdAt,
	imageUrl,
	href,
}: PostCardProps) {
	const cardContent = (
		<Card key={id} className="pt-[30.729vw] lg:pt-[15.3645vw]">
			<CardWrapper>
				<div className="absolute inset-0 h-[30.729vw] lg:h-[15.3645vw]">
					{imageUrl ? (
						<Image
							src={imageUrl}
							alt={title}
							fill
							className="object-cover"
							priority={false}
						/>
					) : (
						<div className="flex h-full w-full items-center justify-center text-sm text-slate-500">
							이미지가 없습니다
						</div>
					)}
				</div>
				<CardContent>
					<CardTitle className="[.card:hover_&]:text-blue-20">
						{title}
					</CardTitle>
					<CardFooter>{formatDate(createdAt)}</CardFooter>
				</CardContent>
			</CardWrapper>
		</Card>
	);

	return (
		<>
			{href ? (
				<Link href={href} target="_blank" rel="noopener noreferrer">
					{cardContent}
				</Link>
			) : (
				cardContent
			)}
		</>
	);
}
