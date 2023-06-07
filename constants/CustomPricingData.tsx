import Image from "next/legacy/image"
import { Box } from "@chakra-ui/react"
import AppConfig from "@common/constants/AppConfig"
import { ButtonStyle } from "@common/utils/theme"
import { PricingList, PricingListItem } from "../components/PricingDescList"
import { PricingBillingMode } from "./PricingConstants"
import { PricingAccountType } from "./PricingTypes"

// Note: Tier thresholds should match out latest values here:
// https://docs.google.com/spreadsheets/d/1rQRlPnumgwwRB2d-18kU82fpEOwILBEXys_FgbVdjc0

export const defaultPricingTier = 2 // Default to Starter 2 tier

const PricingAccounts: (
	pricingBillingMode?: PricingBillingMode
) => PricingAccountType[] = (pricingBillingMode) => [
	{
		name: "Free Trial",
		hideOverviewCard: true,
		prodType: "trial",
		goButtonStyle: ButtonStyle.light,
		freeTrialDays: 7,
		tierShort: {
			title: "Free Trial",
			subtitle: "7-day Teleseer trial",
			go: "Try for Free",
		},
		features: {
			dataByTier: {
				1: "1 GB",
			},
			xferByTier: {
				1: "3 GB",
			},
			perGbMonth: "$8/mo",
			projects: "3",
			assets: 1000,
			resources: {
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
		go: "Go Starter",
		goButtonStyle: ButtonStyle.white,
		description: (product: PricingAccountType) => (
			<PricingList mb={2}>
				<PricingListItem>
					<>{product.features["data"]} data under analysis</>
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
			2: AppConfig.stripe_test_mode ? "prod_NzaoJMCcrvfdBl" : "",
			5: AppConfig.stripe_test_mode ? "prod_Nzarmn4e78EXz2" : "",
			10: AppConfig.stripe_test_mode ? "prod_NK6dRgnmymlqGS" : "",
			20: AppConfig.stripe_test_mode ? "prod_Nzat4nsV0oAz24" : "",
		},
		freeTrialDays: 7,
		tierShort: {
			title: "Starter",
			subtitle: "On-demand analysis",
			go: "Go Starter",
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
				perGb: "$8/mo",
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
		goButtonStyle: ButtonStyle.blue,
		cardStyle: {
			color: "white",
			borderColor: "blue.500",
			_hover: {
				backgroundColor: "blue.800",
			},
		},
		footer: "Plus everything in Starter!",
		description: (product: PricingAccountType) => (
			<>
				<PricingList>
					<PricingListItem>
						<>{product.features["data"]} data under analysis</>
					</PricingListItem>
					<PricingListItem>
						<>{product.features["projects"]} projects</>
					</PricingListItem>
					<PricingListItem>
						<>Advanced data exports</>
					</PricingListItem>
					<PricingListItem>
						<>Automated report generation</>
					</PricingListItem>
					<PricingListItem>
						<>Integrated threat feeds</>
					</PricingListItem>
				</PricingList>
				<Box
					sx={{
						paddingTop: ".5em",
						paddingLeft: "2.2em",
						paddingRight: "2.2em",
					}}
				>
					<Image
						src={require("../public/icons/enrichment_partners.svg")}
						alt={"GreyNoise"}
					/>
				</Box>
			</>
		),
		boxProps: {
			borderColor: "blue.500",
			boxShadow: "0px 0px 7px 0px rgba(74,189,255,0.25)",
		},
		tiersByGbToStripeIDs: {
			50: AppConfig.stripe_test_mode ? "prod_NMdZCgj8c3lABb" : "",
			75: AppConfig.stripe_test_mode ? "prod_NzcOkvKcfwEJDA" : "",
			100: AppConfig.stripe_test_mode ? "prod_MeU7K4Gq8jKxec" : "",
			150: AppConfig.stripe_test_mode ? "prod_NzcRQX2e3RYkuw" : "",
		},
		tierShort: {
			title: "Pro",
			subtitle: "Advanced analysis",
			go: "Go Pro",
		},
		features: {
			dataByTier: {
				50: "50 GB",
				75: "75 GB",
				100: "100 GB",
				150: "150 GB",
			},
			xferByTier: {
				50: "50 GB",
				75: "75 GB",
				100: "100 GB",
				150: "150 GB",
			},
			carvingByTier: {
				50: "50 GB",
				75: "75 GB",
				100: "100 GB",
				150: "150 GB",
			},
			assetsByTier: {
				50: "Unlimited",
				100: "Unlimited",
				200: "Unlimited",
			},
			projects: "Unlimited",
			assets: "Unlimited",
			greynoiseByTier: {
				50: 50,
				100: 100,
				200: 200,
			},
			resources: {
				num_assets: "Unlimited",
				perGb: "$4/mo",
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
		go: "Go Teams",
		goButtonStyle: ButtonStyle.dark,
		subTitle: "Collaborative analysis for elite teams",
		description: (product: PricingAccountType) => (
			<>
				<PricingList>
					<PricingListItem>
						<>{product.features["data"]} data under analysis</>
					</PricingListItem>
					<PricingListItem>
						<>{product.features.resources["seats"]} seats included</>
					</PricingListItem>
					<PricingListItem>
						<>API-based uploads</>
					</PricingListItem>
					<PricingListItem>
						<>Single sign-on (SSO)</>
					</PricingListItem>
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
			300: AppConfig.stripe_test_mode ? "prod_MeU7Sd8NfyG2y1" : "",
			500: AppConfig.stripe_test_mode ? "prod_Nzu55ZREPKt702" : "",
			1000: AppConfig.stripe_test_mode ? "prod_Nzu6QIbyqEspSP" : "",
			2000: AppConfig.stripe_test_mode ? "prod_Nzu7DOI4NFo7oJ" : "",
		},
		tierShort: {
			title: "Teams",
			subtitle: "Collaborative analysis",
			go: "Go Teams",
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
				perGb: "$3/mo",
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
				response_time: "24 hours",
			},
			feeds: {
				ipinfo: "Unlimited",
				greynoise: "300 / day",
			},
		},
	},
]

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
					"Total uncompressed amount of data analyzed and stored for all your projects.",
			},
			{
				key: "xfer",
				name: "Monthly Data Transfer",
			},
			{
				key: "projects",
				name: "Total Projects",
			},
			{
				key: "assets",
				name: "Total Assets",
			},
			{
				key: "perGb",
				name: "$ per GB (avg)",
			},
			{
				key: "perUser",
				name: "$ per Extra User",
			},
			{
				key: "seats",
				name: "User Seats",
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
			},
			{
				key: "zeek",
				name: "Zeek Log Ingest",
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
			},
			{
				key: "event_detection",
				name: "Event Detection",
			},
			// {
			// 	key: "log_carving",
			// 	name: "Log Carving",
			// },
			// {
			// 	key: "pcap_carving",
			// 	name: "PCAP Carving",
			// },
			{
				key: "vulnerability_info",
				name: "Vulnerability Info",
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
			},
			{
				key: "internet_hosts",
				name: "Internet Hosts",
			},
			{
				key: "screenshots",
				name: "Screenshots",
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
			},
			{
				key: "community",
				name: "Community Support",
			},
			{
				key: "one_on_one",
				name: "1-on-1 Support",
			},
			{
				key: "response_time",
				name: "Service Response Time",
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
			},
			{
				key: "greynoise",
				name: "GreyNoise",
			},
		],
	},
]

export default PricingAccounts
