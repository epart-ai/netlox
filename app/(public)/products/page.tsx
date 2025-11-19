import { BackgroundImage } from "@/shared/ui/display";
import {
	Tabs,
	TabsContent,
	TabsList,
	TabsTrigger,
} from "@/shared/ui/shadcn/tabs";
import {
	ProductsEnterprise,
	ProductsOpenSource,
	ProductsPremium,
	ProductsSaas,
} from "@/views/products";

export default function ProductsPage() {
	return (
		<>
			<section className="overflow-hidden">
				<div className="wrapper relative pt-header">
					<BackgroundImage opacity="50" src="/images/products/bg_hero.jpg" />
					<div className="flex h-[260px] flex-col items-center justify-center gap-4 text-center lg:h-[420px] lg:gap-6">
						<h2 className="title-36 lg:title-60">NetLOX Products</h2>
						<p className="paragraph-16 lg:paragraph-20">
							From open-source community editions to 24/7 supported <br />
							enterprise-grade deployments, NetLOX provides the right solution
							for your scale.
						</p>
					</div>
				</div>
			</section>
			<Tabs defaultValue="openSource" className="">
				<TabsList>
					<div className="wrapper">
						<TabsTrigger value="openSource">Open Source </TabsTrigger>
						<TabsTrigger value="enterprise">Enterprise</TabsTrigger>
						<TabsTrigger value="premium">Premium</TabsTrigger>
						<TabsTrigger value="saas">SaaS</TabsTrigger>
					</div>
				</TabsList>
				<div className="pt-[50px] lg:pt-[100px]">
					<BackgroundImage
						className="mix-blend-overlay"
						src="/images/common/bg_content.png"
					/>
					<div className="wrapper">
						<TabsContent value="openSource">
							<ProductsOpenSource />
						</TabsContent>
						<TabsContent value="enterprise">
							<ProductsEnterprise />
						</TabsContent>
						<TabsContent value="premium">
							<ProductsPremium />
						</TabsContent>
						<TabsContent value="saas">
							<ProductsSaas />
						</TabsContent>
					</div>
				</div>
			</Tabs>
			<div></div>
		</>
	);
}
