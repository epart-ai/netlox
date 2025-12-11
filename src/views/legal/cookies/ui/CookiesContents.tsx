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

export const CookiesContents = () => {
	return (
		<LegalContainer>
			<Reveal rootMargin="-25% 0px -25% 0px" threshold={0}>
				<LegalArticle>
					<LegalArticleTitle>1. What Are Cookies?</LegalArticleTitle>
					<Card variant="glass">
						<CardWrapper>
							<LegalCardContent>
								<LegalCardParagraph>
									Cookies are small text files placed on your device (computer,
									tablet, smartphone) by websites you visit. Cookies allow
									websites to:
								</LegalCardParagraph>
								<DataList
									variant="subtle"
									data={[
										"Recognize your device",
										"Store your preferences",
										"Improve website performance",
										"Provide analytics and insights",
										"Personalize your experience",
										"Enhance security",
									]}
								/>
								<LegalCardParagraph>
									Cookies may be <b>first-party</b> (set by us) or{" "}
									<b>third-party</b> (set by external services).
								</LegalCardParagraph>
							</LegalCardContent>
						</CardWrapper>
					</Card>
				</LegalArticle>
			</Reveal>
			<Reveal>
				<LegalArticle>
					<LegalArticleTitle>2. Types of Cookies We Use</LegalArticleTitle>
					<Card variant="glass">
						<CardWrapper>
							<LegalCardParagraph>
								We use the following categories of cookies:
							</LegalCardParagraph>
							<LegalCardContent>
								<CardTitle>2.1 Strictly Necessary Cookies</CardTitle>
								<LegalCardParagraph>
									<span>
										These cookies are required for the website to function
										properly.
									</span>
									<span>They enable:</span>
								</LegalCardParagraph>
								<DataList
									variant="subtle"
									data={[
										"Page navigation",
										"Security features",
										"Access to secure areas",
										"Basic service operations",
									]}
								/>
								<LegalCardParagraph>
									<span>
										<b>
											Without these cookies, the website cannot operate
											correctly.
										</b>
									</span>
									<span>
										These do <b>not</b> require user consent under GDPR/ePrivacy
										rules.
									</span>
								</LegalCardParagraph>
							</LegalCardContent>
							<LegalCardContent>
								<CardTitle>2.2 Performance and Analytics Cookies</CardTitle>
								<LegalCardParagraph>
									These cookies help us understand:
								</LegalCardParagraph>
								<DataList
									variant="subtle"
									data={[
										"How visitors use our website",
										"Which pages are popular",
										"How users navigate",
										"Errors or loading issues",
									]}
								/>
								<LegalCardParagraph>
									<span>
										We use services such as <b>Google Analytics, Cloudflare</b>,
										or equivalent analytics tools.
									</span>
									<span>All data is aggregated and anonymized.</span>
								</LegalCardParagraph>
							</LegalCardContent>
							<LegalCardContent>
								<CardTitle>2.3 Functional Cookies</CardTitle>
								<LegalCardParagraph>
									These cookies allow the website to:
								</LegalCardParagraph>
								<DataList
									variant="subtle"
									data={[
										"Remember your preferences",
										"Store language or region settings",
										"Retain form information",
										"Improve user experience",
									]}
								/>
								<LegalCardParagraph>
									Without these cookies, some features may not function as
									intended.
								</LegalCardParagraph>
							</LegalCardContent>
							<LegalCardContent>
								<CardTitle>
									2.4 Marketing or Advertising Cookies (If applicable)
								</CardTitle>
								<LegalCardParagraph>
									<span>
										NetLOX <b>currently does not run targeted advertising.</b>
									</span>
									<span>If this changes, these cookies may be used to:</span>
								</LegalCardParagraph>
								<DataList
									variant="subtle"
									data={[
										"Measure campaign effectiveness",
										"Deliver relevant ads",
										"Track user interactions with content",
									]}
								/>
								<LegalCardParagraph>
									You will be prompted to accept or reject them before use.
								</LegalCardParagraph>
							</LegalCardContent>
							<LegalCardContent>
								<CardTitle>2.5 Third-Party Cookies</CardTitle>
								<LegalCardParagraph>
									Certain external services integrated into our website may set
									their own cookies:
								</LegalCardParagraph>
								<DataList
									variant="subtle"
									data={[
										"GitHub OAuth / GitHub Pages",
										"Cloudflare security tools",
										"CDN providers",
										"Video or documentation embeds",
										"Analytics platforms",
									]}
								/>
								<LegalCardParagraph>
									These providers may collect their own information per their
									respective privacy policies.
								</LegalCardParagraph>
							</LegalCardContent>
						</CardWrapper>
					</Card>
				</LegalArticle>
			</Reveal>
			<Reveal>
				<LegalArticle>
					<LegalArticleTitle>3. Why We Use Cookies</LegalArticleTitle>
					<Card variant="glass">
						<CardWrapper>
							<LegalCardContent>
								<LegalCardParagraph>We use cookies to:</LegalCardParagraph>
								<DataList
									variant="subtle"
									data={[
										"Ensure website stability and performance",
										"Improve user experience",
										"Maintain security",
										"Monitor usage and traffic patterns",
										"Analyze website improvements",
										"Support open-source community engagement",
									]}
								/>
								<LegalCardParagraph>
									We <b>do not</b> sell personal data, and cookies are not used
									to identify individuals directly.
								</LegalCardParagraph>
							</LegalCardContent>
						</CardWrapper>
					</Card>
				</LegalArticle>
			</Reveal>
			<Reveal>
				<LegalArticle>
					<LegalArticleTitle>4. Cookie Duration</LegalArticleTitle>
					<Card variant="glass">
						<CardWrapper>
							<LegalCardContent>
								<LegalCardParagraph>Cookies may be:</LegalCardParagraph>
								<DataList
									variant="subtle"
									data={[
										<>
											<span className="font-semibold text-white">
												Session cookies{" "}
											</span>
											→ deleted when you close your browser
										</>,
										<>
											<span className="font-semibold text-white">
												Persistent cookies{" "}
											</span>
											→ remain for a fixed period or until deleted manually
										</>,
									]}
								/>
								<LegalCardParagraph>
									Expiration periods vary by cookie function.
								</LegalCardParagraph>
							</LegalCardContent>
						</CardWrapper>
					</Card>
				</LegalArticle>
			</Reveal>
			<Reveal>
				<LegalArticle>
					<LegalArticleTitle>5. Managing Cookies</LegalArticleTitle>
					<Card variant="glass">
						<CardWrapper>
							<LegalCardParagraph>
								You can manage, reject, or delete cookies at any time through:
							</LegalCardParagraph>
							<LegalCardContent>
								<CardTitle>5.1 Browser Settings</CardTitle>
								<LegalCardParagraph>
									Most browsers allow you to:
								</LegalCardParagraph>
								<DataList
									variant="subtle"
									data={[
										"Block cookies",
										"Delete existing cookies",
										"Prevent third-party cookies",
										"Notify when cookies are set",
									]}
								/>
							</LegalCardContent>
							<LegalCardContent>
								<CardTitle>5.2 Cookie Consent Tool (if implemented)</CardTitle>
								<LegalCardParagraph>
									If our site uses a consent banner:
								</LegalCardParagraph>
								<DataList
									variant="subtle"
									data={[
										"You may accept or reject non-essential cookies",
										"You may modify your choices at any time",
									]}
								/>
							</LegalCardContent>
							<LegalCardContent>
								<CardTitle>5.3 Opt-Out Options</CardTitle>
								<LegalCardParagraph>For analytics tools:</LegalCardParagraph>
								<DataList
									variant="subtle"
									data={[
										<>
											<span className="font-semibold text-white">
												Google Analytics Opt-Out{" "}
											</span>
											:{" "}
											<TextLink
												colors="white50"
												href="https://tools.google.com/dlpage/gaoptout"
												label="https://tools.google.com/dlpage/gaoptout"
												underline
												target="_blank"
											/>
										</>,
									]}
								/>
								<LegalCardParagraph>
									Blocking cookies may affect website functionality.
								</LegalCardParagraph>
							</LegalCardContent>
						</CardWrapper>
					</Card>
				</LegalArticle>
			</Reveal>
			<Reveal>
				<LegalArticle>
					<LegalArticleTitle>6. Do Not Track (DNT) Signals</LegalArticleTitle>
					<Card variant="glass">
						<CardWrapper>
							<LegalCardContent>
								<LegalCardParagraph>
									<span>Some browsers send DNT signals.</span>
									<span>
										At this time, our website does <b>not</b> respond to DNT
										signals due to industry standards not being finalized, but
										we respect user privacy preferences where possible.
									</span>
								</LegalCardParagraph>
							</LegalCardContent>
						</CardWrapper>
					</Card>
				</LegalArticle>
			</Reveal>
			<Reveal>
				<LegalArticle>
					<LegalArticleTitle>7. Third-Party Data Collection</LegalArticleTitle>
					<Card variant="glass">
						<CardWrapper>
							<LegalCardContent>
								<LegalCardParagraph>
									Some cookies may allow third parties to:
								</LegalCardParagraph>
								<DataList
									variant="subtle"
									data={[
										"Collect anonymized usage data",
										"Provide aggregated analytics",
										"Enhance security or detect threats (e.g., Cloudflare)",
									]}
								/>
								<LegalCardParagraph>
									We do not control third-party cookies; refer to their privacy
									policies for more details.
								</LegalCardParagraph>
							</LegalCardContent>
						</CardWrapper>
					</Card>
				</LegalArticle>
			</Reveal>
			<Reveal>
				<LegalArticle>
					<LegalArticleTitle>
						8. Updates to This Cookie Policy
					</LegalArticleTitle>
					<Card variant="glass">
						<CardWrapper>
							<LegalCardContent>
								<LegalCardParagraph>
									We may update this Cookie Policy periodically to reflect:
								</LegalCardParagraph>
								<DataList
									variant="subtle"
									data={[
										"Changes in cookie use",
										"Updates to legal requirements",
										"New technologies or services",
									]}
								/>
								<LegalCardParagraph>
									Updates will be posted with a new “Last Updated” date.
								</LegalCardParagraph>
							</LegalCardContent>
						</CardWrapper>
					</Card>
				</LegalArticle>
			</Reveal>
			<Reveal>
				<LegalArticle>
					<LegalArticleTitle>9. Contact Information</LegalArticleTitle>
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
