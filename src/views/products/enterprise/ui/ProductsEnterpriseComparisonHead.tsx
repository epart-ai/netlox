import { Reveal } from "@/shared/ui/display";
import { PageHead } from "@/views/_shared/ui/PageHead";

export const ProductsEnterpriseComparisonHead = () => {
	return (
		<Reveal>
			<PageHead
				title="Detailed Feature Comparison"
				description="Compare Enterprise features against Open Source, Premium, and SaaS plans."
			/>
		</Reveal>
	);
};
