import {
	BusinessPricingComparisonHead,
	BusinessPricingComparisonTable,
	BusinessPricingDetailHead,
	BusinessPricingDetailList,
	BusinessPricingPlanHead,
	BusinessPricingPlanList,
	BusinessPricingQnaHead,
	BusinessPricingQnaList,
} from "@/views/business/pricing/ui";

export default function BusinessPricingPage() {
	return (
		<>
			<BusinessPricingPlanHead />
			<div className="mt-9 lg:mt-[66px]">
				<BusinessPricingPlanList />
			</div>
			<div className="mt-20 lg:mt-[160px]">
				<BusinessPricingDetailHead />
				<div className="mt-14 lg:mt-[92px]">
					<BusinessPricingDetailList />
				</div>
			</div>
			<div className="mt-20 lg:mt-[160px]">
				<BusinessPricingComparisonHead />
				<div className="mt-10 lg:mt-[80px]">
					<BusinessPricingComparisonTable />
				</div>
			</div>
			<div className="mt-20 lg:mt-[160px]">
				<BusinessPricingQnaHead />
				<div className="mt-10 lg:mt-[80px]">
					<BusinessPricingQnaList />
				</div>
			</div>
		</>
	);
}
