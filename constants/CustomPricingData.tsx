import { Box } from "@chakra-ui/react"

import AppConfig from "@common/constants/AppConfig"

import { CustomButtonStyles } from "./CustomStyles"
import { PricingBillingMode } from "./PricingConstants"
import { PricingAccountType } from "./PricingTypes"
import { PricingList, PricingListItem } from "../components/PricingDescList"
import EnrichmentPartnerLogosIcon from "../icons/EnrichmentPartnerLogosIcon"

// Note: Tier thresholds should match out latest values here:
// https://docs.google.com/spreadsheets/d/1rQRlPnumgwwRB2d-18kU82fpEOwILBEXys_FgbVdjc0

export const defaultPricingTier = 1 // Default to Free Trial tier

const PricingAccounts: (
	pricingBillingMode: PricingBillingMode,
	pricingBillingTier: number,
	tenantTierName?: string
) => PricingAccountType[] = (
	pricingBillingMode,
	pricingBillingTier,
	tenantTierName
) => {
	const freeTrialAvailable =
		!tenantTierName ||
		tenantTierName?.toUpperCase() === "NEW" ||
		tenantTierName?.toUpperCase() === "FREE"

	return [
		{
			name: "Free Trial",
			subTitle: "No credit card required",
			prodType: "trial",
			go: freeTrialAvailable ? "Try for Free" : `Trial Not Available`,
			hideOverviewCard: false, // !freeTrialAvailable || pricingBillingTier > 1
			isDisabled: !freeTrialAvailable,
			freeTrialCode: "trial",
			goButtonStyle: CustomButtonStyles.white,
			description: (product: PricingAccountType) => (
				<PricingList mb={2}>
					<PricingListItem>
						<>{product.features["data"]} data under analysis</>
					</PricingListItem>
					<PricingListItem>
						<>{product.features["xfer"]} monthly transfer</>
					</PricingListItem>
					<PricingListItem>
						<>{product.features["projects"]} projects</>
					</PricingListItem>
				</PricingList>
			),
			tiersByGbToStripeIDs: freeTrialAvailable
				? {
						1: AppConfig.stripe_test_mode
							? "prod_NzaoJMCcrvfdBl"
							: "prod_O4TFgRNOwpMWxY",
				  }
				: {},
			tierShort: {
				title: "Free Trial",
				subtitle: "No credit card required",
			},
			features: {
				data: "1 GB",
				xfer: "3 GB",
				projects: "2",
				assets: 1000,
				resources: {
					perGb:
						pricingBillingMode === PricingBillingMode.ANNUAL
							? "$8/mo"
							: "$10/mo",
					perUser: false,
					seats: false,
				},
				telemetry: {
					pcap: true,
					zeek: true,
					api_uploads: false,
				},
				network_analysis: {
					asset_identification: true,
					event_detection: true,
					log_carving: true,
					pcap_carving: true,
					vulnerability_info: true,
					vulnerability_prioritization: false,
					threat_detection: false,
				},
				data_export: {
					asset_summary: true,
					internet_hosts: true,
					screenshots: true,
					credentials: false,
					file_transfers: false,
					file_extraction: false,
					reports: false,
					downloads: false,
					data_carving: "100 MB",
				},
				admin: {
					google: true,
					two_factor: true,
					sso: false,
					unified_billing: false,
					resource_pooling: false,
					team_perms: false,
				},
				service: {
					help_center: true,
					community: true,
					one_on_one: false,
					response_time: false,
				},
				feeds: {
					ipinfo: "25 / day",
					greynoise: false,
				},
			},
		},
		{
			name: "Starter",
			subTitle: "On-demand analysis for individuals",
			prodType: "starter",
			hideOverviewCard: false, // freeTrialAvailable && pricingBillingTier === 1,
			cardStyle: {
				borderColor: "theme-primary-active",
			},
			go: "Go Starter",
			goButtonStyle: CustomButtonStyles.blue,
			description: (product: PricingAccountType) => (
				<PricingList mb={2}>
					<PricingListItem>
						<>{product.features["data"]} data under analysis</>
					</PricingListItem>
					<PricingListItem>
						<>{product.features["xfer"]} monthly transfer</>
					</PricingListItem>
					<PricingListItem>
						<>{product.features["projects"]} projects</>
					</PricingListItem>
					<PricingListItem>
						<>{product.features["assets"]} assets</>
					</PricingListItem>
					<PricingListItem>
						<>PCAP Carving</>
					</PricingListItem>
				</PricingList>
			),
			tiersByGbToStripeIDs: {
				2: AppConfig.stripe_test_mode
					? "prod_NzaoJMCcrvfdBl"
					: "prod_O4TFgRNOwpMWxY",
				5: AppConfig.stripe_test_mode
					? "prod_Nzarmn4e78EXz2"
					: "prod_MfuUHskBj85gTF",
				10: AppConfig.stripe_test_mode
					? "prod_NK6dRgnmymlqGS"
					: "prod_NMXm7zGLj81wvL",
				20: AppConfig.stripe_test_mode
					? "prod_Nzat4nsV0oAz24"
					: "prod_O4TEozv5boTBQp",
			},
			tierShort: {
				title: "Starter",
				subtitle: "On-demand analysis",
			},
			features: {
				dataByTier: {
					2: "2 GB",
					5: "5 GB",
					10: "10 GB",
					20: "20 GB",
				},
				xferByTier: {
					2: "10 GB",
					5: "25 GB",
					10: "50 GB",
					20: "100 GB",
				},
				projects: "5",
				assets: "Unlimited",
				resources: {
					perGb:
						pricingBillingMode === PricingBillingMode.ANNUAL
							? "$8/mo"
							: "$10/mo",
					perUser: false,
					seats: false,
				},
				telemetry: {
					pcap: true,
					zeek: true,
					api_uploads: false,
				},
				network_analysis: {
					asset_identification: true,
					event_detection: true,
					log_carving: true,
					pcap_carving: true,
					vulnerability_info: true,
					vulnerability_prioritization: false,
					threat_detection: false,
				},
				data_export: {
					asset_summary: true,
					internet_hosts: true,
					screenshots: true,
					credentials: false,
					file_transfers: false,
					file_extraction: false,
					reports: false,
					downloads: false,
					data_carving: "100 MB",
				},
				admin: {
					google: true,
					two_factor: true,
					sso: false,
					unified_billing: false,
					resource_pooling: false,
					team_perms: false,
				},
				service: {
					help_center: true,
					community: true,
					one_on_one: false,
					response_time: false,
				},
				feeds: {
					ipinfo: "25 / day",
					greynoise: false,
				},
			},
		},
		{
			name: "Teleseer Pro",
			subTitle: "Advanced analysis for practitioners",
			prodType: "pro",
			go: "Go Pro",
			goButtonStyle: CustomButtonStyles.dark,
			cardStyle: {
				borderColor: "theme-button-dark",
			},
			footer: "Plus everything in Starter!",
			description: (product: PricingAccountType) => (
				<>
					<PricingList>
						<PricingListItem>
							<>{product.features["data"]} data under analysis</>
						</PricingListItem>
						<PricingListItem>
							<>{product.features["xfer"]} monthly transfer</>
						</PricingListItem>
						<PricingListItem>
							<>{product.features["projects"]} projects</>
						</PricingListItem>
						<PricingListItem>
							<>Advanced data exports</>
						</PricingListItem>
						{/* <PricingListItem>
						<>Automated report generation</>
					</PricingListItem> */}
						<PricingListItem>
							<>Integrated threat feeds</>
						</PricingListItem>
					</PricingList>
					<Box
						sx={{
							pt: ".5em",
						}}
					>
						<EnrichmentPartnerLogosIcon width="200" />
					</Box>
				</>
			),
			tiersByGbToStripeIDs: {
				50: AppConfig.stripe_test_mode
					? "prod_NMdZCgj8c3lABb"
					: "prod_NMdamx0fJNKkDf",
				75: AppConfig.stripe_test_mode
					? "prod_NzcOkvKcfwEJDA"
					: "prod_O4TCHwyVu8TJrW",
				100: AppConfig.stripe_test_mode
					? "prod_MeU7K4Gq8jKxec"
					: "prod_MfuUY9YItO6jKO",
				150: AppConfig.stripe_test_mode
					? "prod_NzcRQX2e3RYkuw"
					: "prod_MfuUl19Z99KKuR",
			},
			tierShort: {
				title: "Pro",
				subtitle: "Advanced analysis",
			},
			features: {
				dataByTier: {
					50: "50 GB",
					75: "75 GB",
					100: "100 GB",
					150: "150 GB",
				},
				xferByTier: {
					50: "200 GB",
					75: "300 GB",
					100: "400 GB",
					150: "600 GB",
				},
				carvingByTier: {
					50: "50 GB",
					75: "75 GB",
					100: "100 GB",
					150: "150 GB",
				},
				projects: "Unlimited",
				assets: "Unlimited",
				greynoiseByTier: {
					50: 50,
					100: 100,
					200: 200,
				},
				resources: {
					perGb:
						pricingBillingMode === PricingBillingMode.ANNUAL
							? "$4/mo"
							: "$5/mo",
					num_assets: "Unlimited",
					perUser: false,
					seats: false,
				},
				telemetry: {
					pcap: true,
					zeek: true,
					api_uploads: false,
				},
				network_analysis: {
					asset_identification: true,
					event_detection: true,
					log_carving: true,
					pcap_carving: true,
					vulnerability_info: true,
					vulnerability_prioritization: true,
					threat_detection: true,
				},
				data_export: {
					asset_summary: true,
					internet_hosts: true,
					screenshots: true,
					credentials: true,
					file_transfers: true,
					file_extraction: true,
					reports: true,
					downloads: true,
					data_carving: "100 MB",
				},
				admin: {
					google: true,
					two_factor: true,
					sso: false,
					unified_billing: false,
					resource_pooling: false,
					team_perms: false,
				},
				service: {
					help_center: true,
					community: true,
					one_on_one: true,
					response_time: false,
				},
				feeds: {
					ipinfo: "Unlimited",
					greynoise: "100 / day",
				},
			},
		},
		{
			name: "Teleseer Teams",
			prodType: "team",
			go: "Coming Soon", //"Go Teams",
			isDisabled: true,
			hideOverviewCard: true,
			goButtonStyle: CustomButtonStyles.dark,
			cardStyle: {
				borderTopColor: "theme-section-color-dark",
			},
			subTitle: "Collaborative analysis for elite teams",
			description: (product: PricingAccountType) => (
				<>
					<PricingList>
						<PricingListItem>
							<>{product.features["data"]} data under analysis</>
						</PricingListItem>
						<PricingListItem>
							<>{product.features["xfer"]} monthly transfer</>
						</PricingListItem>
						<PricingListItem>
							<>{product.features.resources["seats"]} seats included</>
						</PricingListItem>
						<PricingListItem>
							<>API-based uploads</>
						</PricingListItem>
						{/* <PricingListItem>
						<>Single sign-on (SSO)</>
					</PricingListItem> */}
						<PricingListItem>
							<>Unified billing and admin</>
						</PricingListItem>
						<PricingListItem>
							<>Team resource pooling</>
						</PricingListItem>
					</PricingList>
				</>
			),
			footer: "Plus everything in Pro!",
			tiersByGbToStripeIDs: {
				300: AppConfig.stripe_test_mode
					? "prod_MeU7Sd8NfyG2y1"
					: "prod_O4TG5h6YIeaNKu",
				500: AppConfig.stripe_test_mode
					? "prod_Nzu55ZREPKt702"
					: "prod_Mfuxsa5JWXtFO6",
				1000: AppConfig.stripe_test_mode
					? "prod_Nzu6QIbyqEspSP"
					: "prod_O4T7RPIvyp2VMG",
				2000: AppConfig.stripe_test_mode
					? "prod_Nzu7DOI4NFo7oJ"
					: "prod_O4T7AMUTvpYakc",
			},
			tierShort: {
				title: "Teams",
				subtitle: "Collaborative analysis",
			},
			features: {
				dataByTier: {
					300: "300 GB",
					500: "500 GB",
					1000: "1 TB",
					2000: "2 TB",
				},
				xferByTier: {
					300: "900 GB",
					500: "1.5 TB",
					1000: "3 TB",
					2000: "6 TB",
				},
				carvingByTier: {
					500: "Call us",
				},
				projects: "Unlimited",
				assets: "Unlimited",
				resources: {
					perGb:
						pricingBillingMode === PricingBillingMode.ANNUAL
							? "$3/mo"
							: "$4/mo",
					perUser: "$49/mo",
					seats: "2",
				},
				telemetry: {
					pcap: true,
					zeek: true,
					api_uploads: true,
				},
				network_analysis: {
					asset_identification: true,
					event_detection: true,
					log_carving: true,
					pcap_carving: true,
					vulnerability_info: true,
					vulnerability_prioritization: true,
					threat_detection: true,
				},
				data_export: {
					asset_summary: true,
					internet_hosts: true,
					screenshots: true,
					credentials: true,
					file_transfers: true,
					file_extraction: true,
					reports: true,
					downloads: true,
					data_carving: "10 GB",
				},
				admin: {
					google: true,
					two_factor: true,
					sso: true,
					unified_billing: true,
					resource_pooling: true,
					team_perms: true,
				},
				service: {
					help_center: true,
					community: true,
					one_on_one: true,
					response_time: "1 business day",
				},
				feeds: {
					ipinfo: "Unlimited",
					greynoise: "300 / day",
				},
			},
		},
	]
}

interface Feature {
	category: string // text to display for section
	sectionKey: string // section within "features" object to pull from
	items: {
		name: string | React.ReactElement
		key: string
		tooltip?: string
	}[]
}

export const PricingFeatures: Feature[] = [
	{
		category: "Resources",
		sectionKey: "resources",
		items: [
			{
				key: "data",
				name: "Data Under Analysis",
				tooltip:
					"Total amount of uncompressed data we've analyzed and stored for your account",
			},
			{
				key: "xfer",
				name: "Monthly Data Transfer",
				tooltip: "Amount of data uploaded and analyzed for your account",
			},
			{
				key: "projects",
				name: "Total Projects",
				tooltip: "Number of dataset collections for analysis",
			},
			{
				key: "assets",
				name: "Total Hosts",
				tooltip:
					"All the internal devices and external hosts we've identified in your data",
			},
			{
				key: "perGb",
				name: "$ per GB (avg)",
				tooltip: "Average price/GB of data under analysis",
			},
			{
				key: "perUser",
				name: "$ per Extra User",
				tooltip: "Price per additional user seat",
			},
			{
				key: "seats",
				name: "User Seats",
				tooltip: "Number of pre-included seats for your account",
			},
		],
	},
	{
		category: "Telemetry Ingest",
		sectionKey: "telemetry",
		items: [
			{
				key: "pcap",
				name: "PCAP Ingest",
				tooltip: "We support analyzing PCAP and PCAP-ng files",
			},
			{
				key: "zeek",
				name: "Zeek Log Ingest",
				tooltip: "We support ingesting most Zeek log types",
			},
			// {
			// 	key: "api_uploads",
			// 	name: "API Uploads",
			// },
		],
	},
	{
		category: "Network Analysis",
		sectionKey: "network_analysis",
		items: [
			{
				key: "asset_identification",
				name: "Asset Identification",
				tooltip: "Unique assets identified by by our analysis engine",
			},
			{
				key: "event_detection",
				name: "Event Detection",
				tooltip:
					"Network events we detect, such as logins, file transfers, and vulnerability scans",
			},
			{
				key: "pcap_carving",
				name: "PCAP Carving",
				tooltip:
					"Select and download traffic for specific assets, protocols, and time ranges",
			},
			// {
			// 	key: "log_carving",
			// 	name: "Log Carving",
			// },
			{
				key: "vulnerability_info",
				name: "Vulnerability Info",
				tooltip: "See all CVEs associated with your assets and apps",
			},
			// {
			// 	key: "vulnerability_prioritization",
			// 	name: "Vulnerability Prioritization",
			// },
			// {
			// 	key: "threat_detection",
			// 	name: "Threat Detection",
			// },
		],
	},
	{
		category: "Data Exports",
		sectionKey: "data_export",
		items: [
			{
				key: "asset_summary",
				name: "Asset Inventory",
				tooltip:
					"Passively discover assets on your network and export as a CSV file",
			},
			{
				key: "internet_hosts",
				name: "Internet Hosts",
				tooltip:
					"Track all IPs and domains your network has interacted with and export as a CSV file",
			},
			{
				key: "screenshots",
				name: "Screenshots",
				tooltip:
					"Export full-resolution screenshots of your network map and timeline as PNG images",
			},
			// {
			// 	key: "credentials",
			// 	name: "Credentials",
			// },
			// {
			// 	key: "file_transfers",
			// 	name: "File Transfers",
			// },
			// {
			// 	key: "file_extraction",
			// 	name: "Auto File Extraction",
			// },
			// {
			// 	key: "reports",
			// 	name: "Automated Reports",
			// },
			// {
			// 	key: "downloads",
			// 	name: "Project Downloads",
			// },
			// {
			// 	key: "timeline",
			// 	name: "Timeline Data",
			// },
			// {
			// 	key: "data_carving",
			// 	name: "Data Carving Size",
			// },
		],
	},
	{
		category: "Admin Controls",
		sectionKey: "admin",
		items: [
			{
				key: "google",
				name: "Sign-in with Google",
				tooltip: "Register and login using your Google account",
			},
			// {
			// 	key: "two_factor",
			// 	name: "2-Factor Authentication",
			// },
			// {
			// 	key: "sso",
			// 	name: "Single Sign-On (SSO)",
			// },
			// {
			// 	key: "unified_billing",
			// 	name: "Unified Billing & Admin",
			// },
			// {
			// 	key: "resource_pooling",
			// 	name: "Team Resource Pooling",
			// },
			// {
			// 	key: "team_perms",
			// 	name: "Team Permissions",
			// },
		],
	},
	{
		category: "Service Support",
		sectionKey: "service",
		items: [
			{
				key: "help_center",
				name: "Help Center Docs",
				tooltip: "Educational content published on our website",
			},
			{
				key: "community",
				name: "Community Support",
				tooltip:
					"Support from other Teleseer users on our Slack and Discourse channels",
			},
			{
				key: "one_on_one",
				name: "1-on-1 Support",
				tooltip: "Individualized email and chat with our support team",
			},
			{
				key: "response_time",
				name: "Service Response Time",
				tooltip: "We respond to inquiries within guaranteed time periods",
			},
		],
	},
	{
		category: "Intel Feeds",
		sectionKey: "feeds",
		items: [
			{
				key: "ipinfo",
				name: "IPinfo",
				tooltip:
					"Enrich IP addresses with Geo, Company, ASN, Domain and other data",
			},
			{
				key: "greynoise",
				name: "GreyNoise",
				tooltip:
					"Identify benign and malicious IP addresses with Internet-wide scan and attack data",
			},
		],
	},
]

export default PricingAccounts
