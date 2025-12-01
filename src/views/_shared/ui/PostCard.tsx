import Image from "next/image";
import Link, { type LinkProps } from "next/link";

import { TextLink } from "@/shared/ui/navigation";
import {
	Card,
	CardContent,
	CardDescription,
	CardFooter,
	CardTitle,
	CardWrapper,
} from "@/shared/ui/shadcn/card";
import { formatDate } from "@/views/resource/_shared/lib/resource.utils";

type PostCardProps = {
	id: string | number;
	title: string;
	description?: string;
	createdAt?: string;
	imageUrl?: string | null;
	href?: string | null;
	textLink?: LinkProps & {
		label: string;
	};
};

export function PostCard({
	id,
	title,
	description,
	createdAt,
	imageUrl,
	href,
	textLink,
}: PostCardProps) {
	const cardContent = (
		<CardWrapper>
			<div className="absolute inset-0 h-[295px]">
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
				<CardTitle className="[.card:hover_&]:text-blue-20">{title}</CardTitle>
				{description && (
					<CardDescription className="line-clamp-2">
						{description}
					</CardDescription>
				)}
				{createdAt && <CardFooter>{formatDate(createdAt)}</CardFooter>}
			</CardContent>
			{textLink && (
				<TextLink
					{...textLink}
					label={textLink.label}
					colors="blue"
					iconVisible="right"
				/>
			)}
		</CardWrapper>
	);

	return (
		<Card key={id} className="w-full !pt-[295px] md:w-[440px]">
			{href ? (
				<Link href={href} target="_blank" rel="noopener noreferrer">
					{cardContent}
				</Link>
			) : (
				cardContent
			)}
		</Card>
	);
}
