import Image from "next/image"
import { Box, Tag, Text } from "@chakra-ui/react"
import AppConfig from "@common/constants/AppConfig"
import { PricingList, PricingListItem } from "../components/PricingDescList"
import { PricingAccountForTierType } from "./PricingTypes"

// Note: Tier thresholds should match out latest values here:
// https://docs.google.com/spreadsheets/d/1rQRlPnumgwwRB2d-18kU82fpEOwILBEXys_FgbVdjc0

const PricingAccounts = [
	{
		name: "Free",
		subTitle: "For individuals",
		prodType: "free",
		footer: "",
		hideOverviewCard: true,
		description: () => (
			<PricingList>
				<PricingListItem>Introductory Teleseer experience</PricingListItem>
				<PricingListItem>Process telemetry files</PricingListItem>
				<PricingListItem>View a map of your network</PricingListItem>
			</PricingList>
		),
		tiersByGB: {
			0.1: null,
		},
		dataInGB: 0.0,
		features: {
			data: "",
			xfer: "",
			carving: "",
			history: "",
			assets: "",
			projects: "",
			pricePerGB: false,
			dataByTier: {
				0.1: "100 MB",
			},
			xferByTier: {
				0.1: "250 MB",
			},
			carvingByTier: {
				0.1: "0.01 GB",
			},
			historyByTier: {
				0.1: "30 days",
			},
			assetsByTier: {
				0.1: "1,000",
			},
			projectsByTier: {
				0.1: "3",
			},
			ana_std: true,
			ana_prem: false,
			enr_std: false,
			enr_prem: false,
			greynoise: false,
			ds_prem: false,
			mfa: true,
			sso: false,
			team_adm: false,
			team_pool: false,
			slf_hosted: false,
			slo: "5-day",
			proj_share: true,
			ver_his: false,
			data_stream: false,
			nvme: false,
			audio: false,
		},
	},
	{
		name: "Starter",
		subTitle: "For individuals",
		prodType: "starter",
		description: (product: PricingAccountForTierType) => (
			<PricingList>
				{/* <PricingListItem>Increased resource limits</PricingListItem> */}
				<PricingListItem>Standard data enrichments</PricingListItem>
			</PricingList>
		),
		footer: "Plus everything in Free",
		tiersByGB: {
			5: AppConfig.stripe_test_mode
				? "prod_MeU6p5nJCScRjT"
				: "prod_MfuUHskBj85gTF",
			20: AppConfig.stripe_test_mode
				? "prod_MfF4EP6muijTDC"
				: "prod_MfuUDm2rcXbhbj",
		},
		dataInGB: 0.0,
		features: {
			data: "",
			xfer: "",
			carving: "",
			history: "",
			assets: "",
			projects: "",
			dataByTier: {
				5: "5 GB",
				20: "20 GB",
			},
			xferByTier: {
				5: "10 GB",
				20: "50 GB",
			},
			carvingByTier: {
				5: "1",
				20: "2",
			},
			historyByTier: {
				5: "90 days",
				20: "90 days",
			},
			assetsByTier: {
				5: "Unlimited",
				20: "Unlimited",
			},
			projectsByTier: {
				5: "5",
				20: "10",
			},
			ana_std: true,
			ana_prem: false,
			enr_std: true,
			enr_prem: false,
			greynoise: false,
			ds_prem: false,
			mfa: true,
			sso: false,
			team_adm: false,
			team_pool: false,
			slf_hosted: false,
			slo: "5-day",
			proj_share: true,
			ver_his: false,
			data_stream: false,
			nvme: false,
			audio: false,
		},
	},
	{
		name: "Pro",
		subTitle: "For professionals",
		prodType: "pro",
		isPopular: true,
		footer: "Plus everything in Starter",
		description: (product: PricingAccountForTierType) => (
			<>
				<PricingList>
					<PricingListItem>
						<Box mb={2}>Premium data enrichments</Box>
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
						alt={"Ipinfo | Greynoise"}
					/>
				</Box>
			</>
		),
		boxProps: {
			borderColor: "blue.500",
			boxShadow: "0px 0px 7px 0px rgba(74,189,255,0.25)",
		},
		tiersByGB: {
			100: AppConfig.stripe_test_mode
				? "prod_MeU7K4Gq8jKxec"
				: "prod_MfuUY9YItO6jKO",
			200: AppConfig.stripe_test_mode
				? "prod_MfF9dP3mPJBGtV"
				: "prod_MfuUl19Z99KKuR",
			300: AppConfig.stripe_test_mode
				? "prod_MfFAyBr9OXVxJG"
				: "prod_MfpQXEGqW8HjMR",
		},
		features: {
			data: "",
			xfer: "",
			carving: "",
			history: "",
			assets: "",
			projects: "",
			dataByTier: {
				100: "100 GB",
				200: "200 GB",
				300: "300 GB",
			},
			xferByTier: {
				100: "200 GB",
				200: "300 GB",
				300: "500 GB",
			},
			carvingByTier: {
				100: "10 GB",
				200: "20 GB",
				300: "30 GB",
			},
			historyByTier: {
				100: "Unlimited",
				200: "Unlimited",
				300: "Unlimited",
			},
			assetsByTier: {
				100: "Unlimited",
				200: "Unlimited",
				300: "Unlimited",
			},
			projectsByTier: {
				100: "25",
				200: "50",
				300: "100",
			},
			ana_std: true,
			ana_prem: true,
			enr_std: true,
			enr_prem: true,
			greynoiseByTier: {
				100: 100,
				200: 200,
				300: 250,
			},
			ds_prem: "$",
			mfa: true,
			sso: false,
			team_adm: false,
			team_pool: false,
			slf_hosted: false,
			slo: "3-day",
			proj_share: true,
			ver_his: true,
			data_stream: false,
			nvme: false,
			audio: true,
		},
	},
	{
		name: "Teams",
		prodType: "team",
		subTitle: "For organizations",
		isComingSoon: true,
		description: (product: PricingAccountForTierType) => (
			<>
				{/* <Text textAlign="left" fontSize="sm" mb={2}>
					Everything in Pro, plus:
				</Text> */}
				<PricingList>
					<PricingListItem>Data streaming</PricingListItem>
					<PricingListItem>Single sign-on (SSO)</PricingListItem>
					<PricingListItem>Unified billing and admin</PricingListItem>
				</PricingList>
				{/* <Text fontSize="sm" fontStyle="italic" mt={6}>
					Contact for details.
				</Text> */}
			</>
		),
		footer: "Plus everything in Pro",
		isDisabled: true,
		// borderColor: "gray.500",
		tiersByGB: {
			500: AppConfig.stripe_test_mode
				? "prod_MeU7Sd8NfyG2y1"
				: "prod_Mfuxsa5JWXtFO6",
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
			ana_std: true,
			ana_prem: true,
			enr_std: true,
			enr_prem: true,
			greynoise: 300,
			ds_prem: "$",
			mfa: true,
			sso: true,
			team_adm: true,
			team_pool: true,
			slf_hosted: false,
			slo: "2-day",
			proj_share: true,
			ver_his: true,
			data_stream: true,
			nvme: false,
			audio: true,
		},
	},
	// {
	// 	name: "Enterprise",
	// 	description: "Contact for details.",
	// 	prodType: "enterprise",
	// 	isDisabled: true,
	// 	features: {
	// 		data: "Unlimited",
	// 		xfer: "Unlimited",
	// 		carving: "Unlimited",
	// 		assets: "Unlimited",
	// 		projects: "Unlimited",
	// 		ana_std: true,
	// 		ana_prem: true,
	// 		enr_std: true,
	// 		enr_prem: true,
	// 		ds_prem: true,
	// 		mfa: true,
	// 		sso: true,
	// 		team_adm: true,
	// 		team_pool: true,
	// 		slf_hosted: true,
	// 		slo: "Call us",
	// 		proj_share: true,
	// 		ver_his: true,
	// 		data_stream: true,
	// 		nvme: true,
	// 		audio: true,
	// 	},
	// },
]

interface Feature {
	category: string
	items: {
		name: string | React.ReactElement
		key: keyof typeof PricingAccounts[number]["features"]
		tooltip?: string
	}[]
}

export const PricingFeatures: Feature[] = [
	{
		category: "Resources",
		items: [
			{
				key: "data",
				name: "Data Under Analysis",
				// tooltip: "Tiramisu caramels topping donut oat cake chocolate bar cookie jujubes.",
			},
			{
				key: "xfer",
				name: "Monthly Transfer Limit",
			},
			// {
			// 	key: "carving",
			// 	name: "Data Carving Size Limit (GB)",
			// },
			// {
			// 	key: "history",
			// 	name: "Analysis Time Range",
			// },
			{
				key: "assets",
				name: "Total Assets",
			},
			{
				key: "projects",
				name: "Total Projects",
			},
			{
				key: "pricePerGB",
				name: "Price per GB",
			},
		],
	},
	{
		category: "Features",
		items: [
			{
				key: "ana_std",
				name: "Standard analytics",
			},
			{
				key: "enr_std",
				name: "Standard data enrichments",
			},
			// {
			// 	key: "ana_prem",
			// 	name: "Premium analytics",
			// },
			{
				key: "enr_prem",
				name: "Premium data enrichments",
			},
			{
				key: "greynoise",
				name: (
					<>
						<Text color="theme_text_desc" as="div" mb={1}>
							Daily GreyNoise lookups
						</Text>
						<Tag size="sm">Coming Soon</Tag>
					</>
				),
			},
			// {
			// 	key: "ds_prem",
			// 	name: "Data Science add-on package",
			// },
		],
	},
	{
		category: "Teams & Security",
		items: [
			{
				key: "mfa",
				name: "MFA",
			},
			{
				key: "sso",
				name: "Single Sign-On (SSO)",
			},
			{
				key: "team_adm",
				name: "Unified Admin & Billing",
			},
			{
				key: "team_pool",
				name: "Team Resource Pooling",
			},
			// {
			// 	key: "slf_hosted",
			// 	name: "Self-Hosted",
			// },
		],
	},
	// {
	// 	category: "Support",
	// 	items: [{ key: "slo", name: "SLO" }],
	// },
	// {
	// 	category: "Coming Soon",
	// 	items: [
	// 		{
	// 			key: "proj_share",
	// 			name: "Project Sharing",
	// 		},
	// 		{
	// 			key: "ver_his",
	// 			name: "Version History",
	// 		},
	// 		{
	// 			key: "audio",
	// 			name: "Live Collaboration",
	// 		},
	// 		{
	// 			key: "audio",
	// 			name: "Team Audio Chat",
	// 		},
	// 		{
	// 			key: "data_stream",
	// 			name: "Data streaming",
	// 		},
	// 		{
	// 			key: "nvme",
	// 			name: "NVME-backed Storage",
	// 		},
	// ],
	// },
]

export type ElementType<T extends ReadonlyArray<unknown>> =
	T extends ReadonlyArray<infer ElementType> ? ElementType : never

export type PricingAccountsType = ElementType<typeof PricingAccounts>

export default PricingAccounts
