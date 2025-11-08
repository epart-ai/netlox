import { cn } from "@/shared/lib/utils";

interface Props {
	className?: string;
	src: string;
}

export const BackgroundImage = ({ className, src }: Props) => {
	return (
		<div
			aria-hidden="true"
			className={cn(
				"inset-0 -z-[1] h-full w-full bg-cover bg-center opacity-50 mix-blend-multiply absolute-center",
				className,
			)}
			style={{ backgroundImage: `url(${src})` }}
		></div>
	);
};
