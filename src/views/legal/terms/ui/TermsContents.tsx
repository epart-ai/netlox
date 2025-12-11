import { DataList, Reveal } from "@/shared/ui/display";
import { TextLink } from "@/shared/ui/navigation";
import { Card, CardTitle, CardWrapper } from "@/shared/ui/shadcn/card";
import {
	LegalArticle,
	LegalArticleTitle,
	LegalCardContent,
	LegalCardParagraph,
	LegalContainer,
} from "@/views/legal/_shared/ui/legal";

export const TermsContents = () => {
	return (
		<LegalContainer>
			<Reveal rootMargin="-25% 0px -25% 0px" threshold={0}>
				<LegalArticle>
					<LegalArticleTitle>1. Definitions</LegalArticleTitle>
					<Card variant="glass">
						<CardWrapper>
							<LegalCardContent>
								<DataList
									variant="subtle"
									data={[
										<>
											<span className="font-semibold text-white">
												“NetLOX”{" "}
											</span>
											refers to NetLOX Co., Ltd., its affiliates, and
											subsidiaries.
										</>,
										<>
											<span className="font-semibold text-white">
												“User”, “you”, “your”{" "}
											</span>
											refers to any visitor, customer, contributor, or
											individual accessing our Services.
										</>,
										<>
											<span className="font-semibold text-white">
												“Services”{" "}
											</span>
											include websites, software, documentation, APIs, support
											systems, and all related materials.
										</>,
										<>
											<span className="font-semibold text-white">
												“Content”{" "}
											</span>
											includes text, images, code, information, analytics,
											documentation, and all materials provided through our
											Services.
										</>,
										<>
											<span className="font-semibold text-white">
												“Software”{" "}
											</span>
											includes Open-Source LoxiLB (Apache 2.0 licensed),
											Enterprise products, binaries, APIs, and any downloadable
											or cloud-hosted components.
										</>,
									]}
								/>
							</LegalCardContent>
						</CardWrapper>
					</Card>
				</LegalArticle>
			</Reveal>
			<Reveal>
				<LegalArticle>
					<LegalArticleTitle>2. Acceptance of Terms</LegalArticleTitle>
					<Card variant="glass">
						<CardWrapper>
							<LegalCardContent>
								<LegalCardParagraph>
									By accessing or using the Services, you:
								</LegalCardParagraph>
								<DataList
									variant="subtle"
									data={[
										"Agree to be bound by these Terms",
										"Confirm that you have the legal authority to accept these Terms",
										"Agree to comply with all applicable laws and regulations",
									]}
								/>
								<LegalCardParagraph>
									If you are using the Services on behalf of an organization,
									you represent that you are authorized to accept these Terms on
									its behalf.
								</LegalCardParagraph>
							</LegalCardContent>
						</CardWrapper>
					</Card>
				</LegalArticle>
			</Reveal>
			<Reveal>
				<LegalArticle>
					<LegalArticleTitle>3. Use of Services</LegalArticleTitle>
					<Card variant="glass">
						<CardWrapper>
							<LegalCardParagraph>
								You agree to use the Services only for lawful purposes and in
								accordance with these Terms.
							</LegalCardParagraph>
							<LegalCardContent>
								<CardTitle>3.1 Prohibited Activities</CardTitle>
								<LegalCardParagraph>You may NOT:</LegalCardParagraph>
								<DataList
									variant="subtle"
									data={[
										"Interfere with or disrupt the integrity or performance of the Services",
										"Reverse-engineer, decompile, disassemble, or otherwise attempt to derive source code from proprietary components",
										"Circumvent security or authentication measures",
										"Access systems or data without authorization",
										"Use the Services to engage in harmful, illegal, or abusive activities",
										"Misrepresent your identity or affiliation",
										"Use automated systems (bots/scrapers) without written permission",
									]}
								/>
							</LegalCardContent>
							<LegalCardContent>
								<CardTitle>3.2 Open Source Usage</CardTitle>
								<LegalCardParagraph>
									<span>
										Open-source components (e.g., LoxiLB under Apache 2.0) are
										governed by their respective licenses.
									</span>
									<span>
										Enterprise or commercial components may be governed by
										separate licensing agreements.
									</span>
								</LegalCardParagraph>
							</LegalCardContent>
						</CardWrapper>
					</Card>
				</LegalArticle>
			</Reveal>
			<Reveal>
				<LegalArticle>
					<LegalArticleTitle>4. Accounts and Registration</LegalArticleTitle>
					<Card variant="glass">
						<CardWrapper>
							<LegalCardContent>
								<LegalCardParagraph>
									Some features may require you to create an account. You agree
									to:
								</LegalCardParagraph>
								<DataList
									variant="subtle"
									data={[
										"Provide accurate and complete information",
										"Maintain confidentiality of your credentials",
										"Be responsible for all activities under your account",
									]}
								/>
								<LegalCardParagraph>
									NetLOX is not liable for unauthorized account access resulting
									from your failure to protect your credentials.
								</LegalCardParagraph>
							</LegalCardContent>
						</CardWrapper>
					</Card>
				</LegalArticle>
			</Reveal>
			<Reveal>
				<LegalArticle>
					<LegalArticleTitle>5. Intellectual Property Rights</LegalArticleTitle>
					<Card variant="glass">
						<CardWrapper>
							<LegalCardContent>
								<CardTitle>5.1 NetLOX Ownership</CardTitle>
								<LegalCardParagraph>
									All trademarks, logos, content, designs, documentation, and
									intellectual property provided through our Services—except
									open-source components—are the exclusive property of NetLOX or
									its licensors.
								</LegalCardParagraph>
							</LegalCardContent>
							<LegalCardContent>
								<CardTitle>5.2 User Content</CardTitle>
								<LegalCardParagraph>
									If you submit code, ideas, feedback, or contributions:
								</LegalCardParagraph>
								<DataList
									variant="subtle"
									data={[
										"You grant NetLOX a worldwide, royalty-free, irrevocable license to use, modify, distribute, or incorporate your feedback into our Services.",
										"You represent that you own the rights to the content you submit.",
									]}
								/>
							</LegalCardContent>
							<LegalCardContent>
								<CardTitle>5.3 Open Source Contributions</CardTitle>
								<LegalCardParagraph>
									Any contributions to LoxiLB or other open-source projects are
									subject to:
								</LegalCardParagraph>
								<DataList
									variant="subtle"
									data={[
										"The project’s contribution guidelines",
										"The applicable open-source license (e.g., Apache 2.0)",
									]}
								/>
							</LegalCardContent>
						</CardWrapper>
					</Card>
				</LegalArticle>
			</Reveal>
			<Reveal>
				<LegalArticle>
					<LegalArticleTitle>6. Software Licensing</LegalArticleTitle>
					<Card variant="glass">
						<CardWrapper>
							<LegalCardContent>
								<CardTitle>6.1 Open Source License</CardTitle>
								<LegalCardParagraph>
									<span>
										LoxiLB (community edition) is distributed under the{" "}
										<b>Apache License 2.0.</b>
									</span>
									<span>
										Use, modification, and distribution must follow the terms of
										that license.
									</span>
								</LegalCardParagraph>
							</LegalCardContent>
							<LegalCardContent>
								<CardTitle>6.2 Enterprise / Commercial Licensing</CardTitle>
								<LegalCardParagraph>
									Enterprise versions, proprietary modules, or commercial SaaS
									offerings are governed by:
								</LegalCardParagraph>
								<DataList
									variant="subtle"
									data={[
										<>
											A separate{" "}
											<span className="font-semibold text-white">
												commercial license,
											</span>
										</>,
										"Subscription terms, or",
										"A mutually agreed customer contract.",
									]}
								/>
								<LegalCardParagraph>
									These Terms do <b>not</b> grant rights to proprietary
									enterprise features.
								</LegalCardParagraph>
							</LegalCardContent>
						</CardWrapper>
					</Card>
				</LegalArticle>
			</Reveal>
			<Reveal>
				<LegalArticle>
					<LegalArticleTitle>
						7. Payment, Billing, and Subscriptions (If Applicable)
					</LegalArticleTitle>
					<Card variant="glass">
						<CardWrapper>
							<LegalCardContent>
								<LegalCardParagraph>
									For commercial services:
								</LegalCardParagraph>
								<DataList
									variant="subtle"
									data={[
										"Fees, billing terms, and payment schedules are defined in the applicable subscription plan or contract.",
										"Failure to pay may result in suspension or termination of access.",
										"All fees are non-refundable unless required by law.",
									]}
								/>
							</LegalCardContent>
						</CardWrapper>
					</Card>
				</LegalArticle>
			</Reveal>
			<Reveal>
				<LegalArticle>
					<LegalArticleTitle>8. Third-Party Services</LegalArticleTitle>
					<Card variant="glass">
						<CardWrapper>
							<LegalCardContent>
								<LegalCardParagraph>
									<span>
										Our Services may integrate with third-party providers (cloud
										providers, analytics tools, GitHub, etc.).
									</span>
									<span>NetLOX is not responsible for:</span>
								</LegalCardParagraph>
								<DataList
									variant="subtle"
									data={[
										"Availability of third-party systems",
										"Data processed by those systems",
										"Their terms or policies",
									]}
								/>
								<LegalCardParagraph>
									You must comply with the terms of those third parties.
								</LegalCardParagraph>
							</LegalCardContent>
						</CardWrapper>
					</Card>
				</LegalArticle>
			</Reveal>
			<Reveal>
				<LegalArticle>
					<LegalArticleTitle>9. Privacy and Data Protection</LegalArticleTitle>
					<Card variant="glass">
						<CardWrapper>
							<LegalCardContent>
								<LegalCardParagraph>
									<span>Your privacy is important to us.</span>
									<span>
										Please review our{" "}
										<b>Personal Information Processing Policy</b>, which
										explains:
									</span>
								</LegalCardParagraph>
								<DataList
									variant="subtle"
									data={[
										"What data we collect",
										"How we use it",
										"How we protect it",
										"Your rights under international privacy laws",
									]}
								/>
								<LegalCardParagraph>
									By using our Services, you agree to our Privacy Policy.
								</LegalCardParagraph>
							</LegalCardContent>
						</CardWrapper>
					</Card>
				</LegalArticle>
			</Reveal>
			<Reveal>
				<LegalArticle>
					<LegalArticleTitle>10. Security</LegalArticleTitle>
					<Card variant="glass">
						<CardWrapper>
							<LegalCardContent>
								<LegalCardParagraph>
									<span>
										NetLOX implements reasonable administrative, technical, and
										physical safeguards to protect the Services.
									</span>
									<span>However:</span>
								</LegalCardParagraph>
								<DataList
									variant="subtle"
									data={[
										"No online service is fully secure",
										"You use the Services at your own risk",
										"You are responsible for securing your devices and accounts",
									]}
								/>
							</LegalCardContent>
						</CardWrapper>
					</Card>
				</LegalArticle>
			</Reveal>
			<Reveal>
				<LegalArticle>
					<LegalArticleTitle>
						11. Service Availability and Modifications
					</LegalArticleTitle>
					<Card variant="glass">
						<CardWrapper>
							<LegalCardContent>
								<LegalCardParagraph>NetLOX may:</LegalCardParagraph>
								<DataList
									variant="subtle"
									data={[
										"Update, modify, or discontinue features",
										"Add new functionality",
										"Perform maintenance that may temporarily interrupt service",
										"Change or remove documentation content",
									]}
								/>
								<LegalCardParagraph>
									We are not liable for interruption or discontinuation of any
									part of the Services.
								</LegalCardParagraph>
							</LegalCardContent>
						</CardWrapper>
					</Card>
				</LegalArticle>
			</Reveal>
			<Reveal>
				<LegalArticle>
					<LegalArticleTitle>12. Disclaimer of Warrantie</LegalArticleTitle>
					<Card variant="glass">
						<CardWrapper>
							<LegalCardContent>
								<LegalCardParagraph>
									<span>
										<b>The Services are provided “as is” and “as available.”</b>
									</span>
									<span>
										NetLOX makes <b>no warranties</b>, express or implied,
										including:
									</span>
								</LegalCardParagraph>
								<DataList
									variant="subtle"
									data={[
										"Merchantability",
										"Fitness for a particular purpose",
										"Non-infringement",
										"Continuous availability",
										"Accuracy or completeness of information",
									]}
								/>
								<LegalCardParagraph>
									Use of the Services is at your own risk.
								</LegalCardParagraph>
							</LegalCardContent>
						</CardWrapper>
					</Card>
				</LegalArticle>
			</Reveal>
			<Reveal>
				<LegalArticle>
					<LegalArticleTitle>13. Limitation of Liability</LegalArticleTitle>
					<Card variant="glass">
						<CardWrapper>
							<LegalCardContent>
								<LegalCardParagraph>
									To the maximum extent permitted by law:
								</LegalCardParagraph>
								<DataList
									variant="subtle"
									data={[
										<>
											NetLOX is{" "}
											<span className="font-semibold text-white">
												not responsible for indirect, incidental, consequential,
												or punitive damages
											</span>
											, including loss of data, profits, or business
											interruption.
										</>,
										"NetLOX’s total liability shall not exceed the amount paid (if any) for commercial services during the preceding 12 months.",
									]}
								/>
								<LegalCardParagraph>
									Open-source software is provided <b>without liability</b> as
									per its license.
								</LegalCardParagraph>
							</LegalCardContent>
						</CardWrapper>
					</Card>
				</LegalArticle>
			</Reveal>
			<Reveal>
				<LegalArticle>
					<LegalArticleTitle>14. Indemnification</LegalArticleTitle>
					<Card variant="glass">
						<CardWrapper>
							<LegalCardContent>
								<LegalCardParagraph>
									You agree to indemnify and hold NetLOX harmless from claims,
									damages, losses, or liabilities arising from:
								</LegalCardParagraph>
								<DataList
									variant="subtle"
									data={[
										"Your use of the Services",
										"Violation of these Terms",
										"Violation of third-party rights",
										"Misuse of code, APIs, or integrations",
									]}
								/>
							</LegalCardContent>
						</CardWrapper>
					</Card>
				</LegalArticle>
			</Reveal>
			<Reveal>
				<LegalArticle>
					<LegalArticleTitle>15. Termination</LegalArticleTitle>
					<Card variant="glass">
						<CardWrapper>
							<LegalCardContent>
								<LegalCardParagraph>
									NetLOX may suspend or terminate your access if:
								</LegalCardParagraph>
								<DataList
									variant="subtle"
									data={[
										"You violate these Terms",
										"You infringe intellectual property rights",
										"You misuse the Services",
										"Required by law or security concerns",
									]}
								/>
								<LegalCardParagraph>
									Upon termination, your right to use the Services ceases
									immediately.
								</LegalCardParagraph>
							</LegalCardContent>
						</CardWrapper>
					</Card>
				</LegalArticle>
			</Reveal>
			<Reveal>
				<LegalArticle>
					<LegalArticleTitle>
						16. Governing Law and Jurisdiction
					</LegalArticleTitle>
					<Card variant="glass">
						<CardWrapper>
							<LegalCardContent>
								<LegalCardParagraph>
									Unless otherwise agreed in a commercial contract:
								</LegalCardParagraph>
								<DataList
									variant="subtle"
									data={[
										<>
											These Terms are governed by the laws of{" "}
											<span className="font-semibold text-white">
												[NetLOX / South Korea]
											</span>
										</>,
										<>
											Disputes shall be resolved exclusively in the courts of{" "}
											<span className="font-semibold text-white">
												[Seoul/South Korea]
											</span>
										</>,
									]}
								/>
								<LegalCardParagraph>
									For international users, local mandatory consumer protection
									laws may still apply.
								</LegalCardParagraph>
							</LegalCardContent>
						</CardWrapper>
					</Card>
				</LegalArticle>
			</Reveal>
			<Reveal>
				<LegalArticle>
					<LegalArticleTitle>17. Changes to Terms</LegalArticleTitle>
					<Card variant="glass">
						<CardWrapper>
							<LegalCardContent>
								<LegalCardParagraph>
									<span>We may update these Terms periodically.</span>
									<span>
										The “Last Updated” date will reflect the latest version.
									</span>
									<span>
										Your continued use of the Services constitutes acceptance of
										the updated Terms.
									</span>
								</LegalCardParagraph>
							</LegalCardContent>
						</CardWrapper>
					</Card>
				</LegalArticle>
			</Reveal>
			<Reveal>
				<LegalArticle>
					<LegalArticleTitle>18. Contact Information</LegalArticleTitle>
					<Card variant="glass">
						<CardWrapper>
							<LegalCardContent>
								<LegalCardParagraph>
									For questions regarding these Terms, contact us at:
								</LegalCardParagraph>
								<DataList
									variant="subtle"
									data={[
										<>
											<span className="font-semibold text-white">Email </span>:{" "}
											<TextLink
												colors="white50"
												href="mailto:contact@netlox.io"
												label="contact@netlox.io"
												underline
											/>
										</>,
										<>
											<span className="font-semibold text-white">Website </span>
											:{" "}
											<TextLink
												colors="white50"
												href="https://www.netlox.io"
												label="https://www.netlox.io"
												underline
												target="_blank"
											/>
										</>,
									]}
								/>
							</LegalCardContent>
						</CardWrapper>
					</Card>
				</LegalArticle>
			</Reveal>
		</LegalContainer>
	);
};
