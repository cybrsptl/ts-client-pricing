import Image from "next/legacy/image"
import { Box } from "@chakra-ui/react"
import AppConfig from "@common/constants/AppConfig"
import { PricingList, PricingListItem } from "../components/PricingDescList"
import { PricingAccountForTierType } from "./PricingTypes"

// Note: Tier thresholds should match out latest values here:
// https://docs.google.com/spreadsheets/d/1rQRlPnumgwwRB2d-18kU82fpEOwILBEXys_FgbVdjc0

const PricingAccounts = [
	{
		name: "Starter",
		subTitle: "On-demand analysis for individuals",
		prodType: "starter",
		go: "Go Starter",
		perGb: "8",
		description: (product: PricingAccountForTierType) => (
			<PricingList mb={2}>
				<PricingListItem>
					<>{product.features.resources["dua"]} data under analysis</>
				</PricingListItem>
				<PricingListItem>
					<>{product.features.resources["num_projects"]} projects</>
				</PricingListItem>
				<PricingListItem>
					<>{product.features.resources["num_assets"]} assets</>
				</PricingListItem>
				<PricingListItem>
					<>PCAP Carving</>
				</PricingListItem>
			</PricingList>
		),
		// footer: "Plus everything in Free",
		tiersByGB: {
			// 5: AppConfig.stripe_test_mode
			// 	? "prod_MeU6p5nJCScRjT"
			// 	: "prod_MfuUHskBj85gTF",
			10: AppConfig.stripe_test_mode
				? "prod_NK6dRgnmymlqGS"
				: "prod_NMXm7zGLj81wvL",
		},
		dataInGB: 0.0,
		freeTrialDays: 7,
		tierShort: {
			title: "Starter",
			subtitle: "On-demand analysis",
			go: "Go Starter",
		},
		features: {
			resources: {
				dua: "10 GB",
				monthly_transfer: "50 GB",
				num_projects: "5",
				num_assets: "Unlimited",
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
				timeline: false,
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
		go: "Go Professional",
		perGb: "4",
		isPopular: true,
		footer: "Plus everything in Starter!",
		description: (product: PricingAccountForTierType) => (
			<>
				<PricingList>
					<PricingListItem>
						<>{product.features.resources["dua"]} data under analysis</>
					</PricingListItem>
					<PricingListItem>
						<>{product.features.resources["num_projects"]} projects</>
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
		tiersByGB: {
			50: AppConfig.stripe_test_mode
				? "prod_NMdZCgj8c3lABb"
				: "prod_NMdamx0fJNKkDf",
			100: AppConfig.stripe_test_mode
				? "prod_MeU7K4Gq8jKxec"
				: "prod_MfuUY9YItO6jKO",
			200: AppConfig.stripe_test_mode
				? "prod_MfF9dP3mPJBGtV"
				: "prod_MfuUl19Z99KKuR",
			// 300: AppConfig.stripe_test_mode
			// 	? "prod_MfFAyBr9OXVxJG"
			// 	: "prod_MfpQXEGqW8HjMR",
		},
		tierShort: {
			title: "Pro",
			subtitle: "Advanced analysis",
			go: "Go Pro",
		},
		features: {
			dataByTier: {
				50: "50 GB",
				100: "100 GB",
				200: "200 GB",
				// 300: "300 GB",
			},
			xferByTier: {
				50: "200 GB",
				100: "300 GB",
				200: "500 GB",
				// 300: "500 GB",
			},
			carvingByTier: {
				50: "10 GB",
				100: "20 GB",
				200: "30 GB",
				// 300: "30 GB",
			},
			historyByTier: {
				50: "Unlimited",
				100: "Unlimited",
				200: "Unlimited",
				// 300: "Unlimited",
			},
			assetsByTier: {
				50: "Unlimited",
				100: "Unlimited",
				200: "Unlimited",
				// 300: "Unlimited",
			},
			projectsByTier: {
				50: "10",
				100: "25",
				200: "50",
				// 300: "100",
			},
			greynoiseByTier: {
				50: 50,
				100: 100,
				200: 200,
				// 300: 250,
			},
			resources: {
				dua: "50 GB",
				monthly_transfer: "200 GB",
				num_projects: "Unlimited",
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
				timeline: "30 days",
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
		perGb: "3",
		subTitle: "Collaborative analysis for elite teams",
		description: (product: PricingAccountForTierType) => (
			<>
				<PricingList>
					<PricingListItem>
						<>{product.features.resources["dua"]} data under analysis</>
					</PricingListItem>
					<PricingListItem>
						<>{product.features.resources["seats"]} seats include</>
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
		// borderColor: "gray.500",
		tiersByGB: {
			500: AppConfig.stripe_test_mode
				? "prod_MeU7Sd8NfyG2y1"
				: "prod_Mfuxsa5JWXtFO6",
		},
		tierShort: {
			title: "Teams",
			subtitle: "Collaborative analysis",
			go: "Go Teams",
		},
		features: {
			dataByTier: {
				500: "500 GB",
			},
			xferByTier: {
				500: "750 GB",
			},
			carvingByTier: {
				500: "Call us",
			},
			historyByTier: {
				500: "Unlimited",
			},
			assetsByTier: {
				500: "Unlimited",
			},
			projectsByTier: {
				500: "100",
			},
			resources: {
				dua: "300 GB",
				monthly_transfer: "900 GB",
				num_projects: "Unlimited",
				num_assets: "Unlimited",
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
				timeline: "90 days",
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
		key: string //keyof typeof PricingAccounts[number]["features"]
		tooltip?: string
	}[]
}

export const PricingFeatures: Feature[] = [
	{
		category: "Resources",
		sectionKey: "resources",
		items: [
			{
				key: "dua",
				name: "Data Under Analysis",
				tooltip: "testing",
			},
			{
				key: "monthly_transfer",
				name: "Monthly Data Transfer",
			},
			{
				key: "num_projects",
				name: "Total Projects",
			},
			{
				key: "num_assets",
				name: "Total Assets",
			},
			{
				key: "perGb",
				name: "$ per extra GB",
			},
			{
				key: "perUser",
				name: "$ per extra user",
			},
			{
				key: "seats",
				name: "User seats",
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
			{
				key: "api_uploads",
				name: "API Uploads",
			},
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
			{
				key: "log_carving",
				name: "Log Carving",
			},
			{
				key: "pcap_carving",
				name: "PCAP Carving",
			},
			{
				key: "vulnerability_info",
				name: "Vulnerability Info",
			},
			{
				key: "vulnerability_prioritization",
				name: "Vulnerability Prioritization",
			},
			{
				key: "threat_detection",
				name: "Threat Detection",
			},
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
			{
				key: "credentials",
				name: "Credentials",
			},
			{
				key: "file_transfers",
				name: "File Transfers",
			},
			{
				key: "file_extraction",
				name: "Auto File Extraction",
			},
			{
				key: "reports",
				name: "Automated Reports",
			},
			{
				key: "downloads",
				name: "Project Downloads",
			},
			{
				key: "timeline",
				name: "Timeline Data",
			},
			{
				key: "data_carving",
				name: "Data Carving Size",
			},
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
			{
				key: "two_factor",
				name: "2-Factor Authentication",
			},
			{
				key: "sso",
				name: "Single Sign-On (SSO)",
			},
			{
				key: "unified_billing",
				name: "Unified Billing & Admin",
			},
			{
				key: "resource_pooling",
				name: "Team Resource Pooling",
			},
			{
				key: "team_perms",
				name: "Team Permissions",
			},
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

export type ElementType<T extends ReadonlyArray<unknown>> =
	T extends ReadonlyArray<infer ElementType> ? ElementType : never

export type PricingAccountsType = ElementType<typeof PricingAccounts>

export default PricingAccounts
