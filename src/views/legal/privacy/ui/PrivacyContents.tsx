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

export const PrivacyContents = () => {
	return (
		<LegalContainer>
			<Reveal rootMargin="-25% 0px -25% 0px" threshold={0}>
				<LegalArticle>
					<LegalArticleTitle>1. Information We Collect</LegalArticleTitle>
					<Card variant="glass">
						<CardWrapper>
							<LegalCardParagraph>
								We may collect the following categories of personal information:
							</LegalCardParagraph>
							<LegalCardContent>
								<CardTitle>1.1 Information You Provide Directly</CardTitle>

								<DataList
									variant="subtle"
									data={[
										"Name, email address, and contact information",
										"Company/organization details",
										"Support requests, inquiries, and communication",
										"Developer contributions via GitHub, forums, or community channels",
									]}
								/>
							</LegalCardContent>
							<LegalCardContent>
								<CardTitle>1.2 Information Collected Automatically</CardTitle>
								<LegalCardParagraph>
									When you visit our website or use our services:
								</LegalCardParagraph>
								<DataList
									variant="subtle"
									data={[
										"IP address and browser information",
										"Device and operating system data",
										"Cookies and usage analytics",
										"Access logs and performance metrics",
									]}
								/>
							</LegalCardContent>
							<LegalCardContent>
								<CardTitle>1.3 Information from Third-Party Services</CardTitle>
								<LegalCardParagraph>
									If you interact with our GitHub organization, documentation
									platforms, or partner systems:
								</LegalCardParagraph>
								<DataList
									variant="subtle"
									data={[
										"Public profile information",
										"Interaction metadata (issues, pull requests, stars, comments)",
									]}
								/>
								<LegalCardParagraph>
									We do not collect sensitive personal data unless strictly
									necessary and with explicit consent.
								</LegalCardParagraph>
							</LegalCardContent>
						</CardWrapper>
					</Card>
				</LegalArticle>
			</Reveal>
			<Reveal>
				<LegalArticle>
					<LegalArticleTitle>
						2. How We Use Personal Information
					</LegalArticleTitle>
					<Card variant="glass">
						<CardWrapper>
							<LegalCardContent>
								<LegalCardParagraph>
									We process personal information for the following purposes:
								</LegalCardParagraph>
								<DataList
									variant="subtle"
									data={[
										"To operate, maintain, and improve our products and website",
										"To provide customer and technical support",
										"To manage developer contributions and open-source community participation",
										"To send service-related notifications or updates",
										"To ensure security, fraud prevention, and compliance",
										"To analyze usage and enhance product performance",
										"To meet legal and regulatory obligations",
									]}
								/>

								<LegalCardParagraph>
									Personal information will <b>never</b> be sold or used for
									purposes not described in this policy.
								</LegalCardParagraph>
							</LegalCardContent>
						</CardWrapper>
					</Card>
				</LegalArticle>
			</Reveal>
			<Reveal>
				<LegalArticle>
					<LegalArticleTitle>
						3. Legal Basis for Processing (GDPR)
					</LegalArticleTitle>
					<Card variant="glass">
						<CardWrapper>
							<LegalCardContent>
								<LegalCardParagraph>
									Where required by law, we process personal information based
									on:
								</LegalCardParagraph>
								<DataList
									variant="subtle"
									data={[
										<>
											<span className="font-semibold text-white">Consent</span>
										</>,
										<>
											<span className="font-semibold text-white">
												Performance of a contract{" "}
											</span>
											(e.g., providing support)
										</>,
										<>
											<span className="font-semibold text-white">
												Legitimate interests{" "}
											</span>
											(e.g., improving our services, ensuring security)
										</>,
										<>
											<span className="font-semibold text-white">
												Compliance with legal obligations
											</span>
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
					<LegalArticleTitle>4. Data Sharing and Transfers</LegalArticleTitle>
					<Card variant="glass">
						<CardWrapper>
							<LegalCardContent>
								<LegalCardParagraph>
									We may share personal information with:
								</LegalCardParagraph>
								<DataList
									variant="subtle"
									data={[
										"Cloud or hosting providers (for site operation)",
										"Analytics or monitoring providers",
										"Business partners or service vendors",
										"Regulatory authorities when legally required",
									]}
								/>
								<LegalCardParagraph>
									<span>
										All third parties are contractually required to maintain
										strict confidentiality and comply with applicable privacy
										laws.
									</span>
									<span>
										Some data may be stored or processed in countries outside
										your jurisdiction. We use{" "}
										<b>standard contractual clauses</b> or equivalent safeguards
										to ensure adequate protection.
									</span>
								</LegalCardParagraph>
							</LegalCardContent>
						</CardWrapper>
					</Card>
				</LegalArticle>
			</Reveal>
			<Reveal>
				<LegalArticle>
					<LegalArticleTitle>5. Data Retention</LegalArticleTitle>
					<Card variant="glass">
						<CardWrapper>
							<LegalCardContent>
								<LegalCardParagraph>
									We retain personal information only for as long as necessary
									to:
								</LegalCardParagraph>
								<DataList
									variant="subtle"
									data={[
										"Fulfill the purposes described in this policy",
										"Comply with legal, regulatory, or contractual obligations",
										"Resolve disputes or enforce agreements",
									]}
								/>
								<LegalCardParagraph>
									When no longer needed, data is securely deleted or anonymized.
								</LegalCardParagraph>
							</LegalCardContent>
						</CardWrapper>
					</Card>
				</LegalArticle>
			</Reveal>
			<Reveal>
				<LegalArticle>
					<LegalArticleTitle>6. Your Rights</LegalArticleTitle>
					<Card variant="glass">
						<CardWrapper>
							<LegalCardContent>
								<LegalCardParagraph>
									Depending on your jurisdiction, you may have the right to:
								</LegalCardParagraph>
								<DataList
									variant="subtle"
									data={[
										"Access your personal information",
										"Request correction or deletion",
										"Object to or restrict processing",
										"Request data portability",
										"Withdraw consent",
										"Opt-out of communications",
										"File a complaint with a relevant data protection authority",
									]}
								/>

								<LegalCardParagraph>
									We will respond to verified requests within the legally
									required timeframe.
								</LegalCardParagraph>
							</LegalCardContent>
						</CardWrapper>
					</Card>
				</LegalArticle>
			</Reveal>
			<Reveal>
				<LegalArticle>
					<LegalArticleTitle>
						7. Cookies and Tracking Technologies
					</LegalArticleTitle>
					<Card variant="glass">
						<CardWrapper>
							<LegalCardContent>
								<LegalCardParagraph>We use cookies for:</LegalCardParagraph>
								<DataList
									variant="subtle"
									data={[
										"Website functionality",
										"User experience improvement",
										"Usage analytics",
										"Security purposes",
									]}
								/>
								<LegalCardParagraph>
									Users may configure browser settings to reject cookies;
									however, certain site features may not function properly.
								</LegalCardParagraph>
							</LegalCardContent>
						</CardWrapper>
					</Card>
				</LegalArticle>
			</Reveal>
			<Reveal>
				<LegalArticle>
					<LegalArticleTitle>8. Security Measures</LegalArticleTitle>
					<Card variant="glass">
						<CardWrapper>
							<LegalCardContent>
								<LegalCardParagraph>
									We implement reasonable administrative, technical, and
									physical safeguards to protect personal information,
									including:
								</LegalCardParagraph>
								<DataList
									variant="subtle"
									data={[
										"Encryption",
										"Access control",
										"Network security measures",
										"Regular security audits",
										"Data minimization practices",
									]}
								/>
								<LegalCardParagraph>
									However, no method of transmission over the Internet is 100%
									secure.
								</LegalCardParagraph>
							</LegalCardContent>
						</CardWrapper>
					</Card>
				</LegalArticle>
			</Reveal>
			<Reveal>
				<LegalArticle>
					<LegalArticleTitle>9. Children’s Privacy</LegalArticleTitle>
					<Card variant="glass">
						<CardWrapper>
							<LegalCardContent>
								<LegalCardParagraph>
									<span>
										Our services are <b>not</b> intended for children under 16.
									</span>
									<span>
										We do not knowingly collect personal information from
										minors.
									</span>
								</LegalCardParagraph>
							</LegalCardContent>
						</CardWrapper>
					</Card>
				</LegalArticle>
			</Reveal>
			<Reveal>
				<LegalArticle>
					<LegalArticleTitle>10. International Transfers</LegalArticleTitle>
					<Card variant="glass">
						<CardWrapper>
							<LegalCardContent>
								<LegalCardParagraph>
									We comply with international data transfer regulations,
									including GDPR requirements for cross-border transfers, and
									apply appropriate protection mechanisms.
								</LegalCardParagraph>
							</LegalCardContent>
						</CardWrapper>
					</Card>
				</LegalArticle>
			</Reveal>
			<Reveal>
				<LegalArticle>
					<LegalArticleTitle>11. Changes to This Policy</LegalArticleTitle>
					<Card variant="glass">
						<CardWrapper>
							<LegalCardContent>
								<LegalCardParagraph>
									<span>We may update this policy periodically.</span>
									<span>
										The “Last Updated” date will reflect the latest version.
									</span>
									<span>
										Substantial changes will be posted prominently on our
										website.
									</span>
								</LegalCardParagraph>
							</LegalCardContent>
						</CardWrapper>
					</Card>
				</LegalArticle>
			</Reveal>
			<Reveal>
				<LegalArticle>
					<LegalArticleTitle>12. Contact Us</LegalArticleTitle>
					<Card variant="glass">
						<CardWrapper>
							<LegalCardContent>
								<LegalCardParagraph>
									If you have questions or requests regarding this policy,
									please contact:
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
