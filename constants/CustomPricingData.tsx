import { Text } from "@chakra-ui/react"
import AppConfig from "@common/constants/AppConfig"
import { DevPricingButton } from "../components/DevPricingButton"

const MSG_DATA_TOO_LOW = "Too small for your analysis needs."
// <Text fontWeight="bold">Too small for your analysis needs.</Text>

const PricingAccounts = [
	{
		name: "Free",
		prodType: "starter",
		description: "",
		tiers_by_gb: {
			0.1: null,
			10: AppConfig.stripe_test_mode
				? "prod_MeU6p5nJCScRjT"
				: "prod_MfuUHskBj85gTF",
			20: AppConfig.stripe_test_mode
				? "prod_MfF4EP6muijTDC"
				: "prod_MfuUDm2rcXbhbj",
		},
		features: {
			// dev_purchase_buttons: (
			// 	<>
			// 		<DevPricingButton
			// 			caption="s50 (year)"
			// 			href="https://buy.stripe.com/test_9AQ7wt4rFaSm2Dm9De"
			// 		/>
			// 		<DevPricingButton
			// 			caption="s100 (month)"
			// 			href="https://buy.stripe.com/test_5kA7wt7DR7Ga0ve5n3"
			// 		/>
			// 	</>
			// ),
			data: MSG_DATA_TOO_LOW,
			xfer: "",
			carving: "",
			history: "",
			assets: "",
			projects: "",
			data_by_tier: {
				0.1: "0.1 GB",
				10: "10 GB",
				20: "20 GB",
			},
			xfer_by_tier: {
				0.1: "10",
				10: "25",
				20: "20",
			},
			carving_by_tier: {
				0.1: "0.01",
				10: "1",
				20: "2",
			},
			history_by_tier: {
				0.1: "30 days",
				10: "90 days",
				20: "90 days",
			},
			assets_by_tier: {
				0.1: "1,000",
				10: "Unlimited",
				20: "Unlimited",
			},
			projects_by_tier: {
				0.1: "3",
				10: "5",
				20: "10",
			},
			ana_std: true,
			ana_prem: false,
			enr_std: true,
			enr_prem: false,
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
		prodType: "pro",
		isPopular: true,
		description: "",
		tiers_by_gb: {
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
			// dev_purchase_buttons: (
			// 	<>
			// 		<DevPricingButton
			// 			caption="p200 (year)"
			// 			href="https://buy.stripe.com/test_6oE8AxbU72lQ91KbLs"
			// 		/>
			// 		<DevPricingButton
			// 			caption="p300 (year)"
			// 			href="https://buy.stripe.com/test_dR67wt3nB1hM1zi6ra"
			// 		/>
			// 		<DevPricingButton
			// 			caption="p500 (month)"
			// 			href="https://buy.stripe.com/test_5kA6sp2jxd0u0vebLn"
			// 		/>
			// 	</>
			// ),
			data: MSG_DATA_TOO_LOW,
			xfer: "",
			carving: "",
			history: "",
			assets: "",
			projects: "",
			data_by_tier: {
				100: "100 GB",
				200: "200 GB",
				300: "300 GB",
			},
			xfer_by_tier: {
				100: "1 TB",
				200: "2 TB",
				300: "3 TB",
			},
			carving_by_tier: {
				100: "10 GB",
				200: "20 GB",
				300: "30 GB",
			},
			history_by_tier: {
				100: "Unlimited",
				200: "Unlimited",
				300: "Unlimited",
			},
			assets_by_tier: {
				100: "Unlimited",
				200: "Unlimited",
				300: "Unlimited",
			},
			projects_by_tier: {
				100: "25",
				200: "50",
				300: "100",
			},
			ana_std: true,
			ana_prem: true,
			enr_std: true,
			enr_prem: true,
			ds_prem: true,
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
		name: "Team 1000",
		prodType: "team",
		description: "Coming soon.",
		isDisabled: true,
		tiers_by_gb: {
			500: AppConfig.stripe_test_mode
				? "prod_MeU7Sd8NfyG2y1"
				: "prod_Mfuxsa5JWXtFO6",
		},
		features: {
			data_by_tier: {
				500: "500 GB",
			},
			xfer_by_tier: {
				500: "5 TB",
			},
			carving_by_tier: {
				500: "Call us",
			},
			history_by_tier: {
				500: "Unlimited",
			},
			assets_by_tier: {
				500: "Unlimited",
			},
			projects_by_tier: {
				500: "100",
			},
			ana_std: true,
			ana_prem: true,
			enr_std: true,
			enr_prem: true,
			ds_prem: true,
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
	{
		name: "Enterprise",
		description: "Contact for details.",
		prodType: "enterprise",
		isDisabled: true,
		features: {
			data_by_tier: {
				500: "Call us",
			},
			xfer_by_tier: {
				500: "Call us",
			},
			carving_by_tier: {
				500: "Call us",
			},
			history_by_tier: {
				500: "Unlimited",
			},
			assets_by_tier: {
				500: "Unlimited",
			},
			projects_by_tier: {
				500: "Unlimited",
			},
			ana_std: true,
			ana_prem: true,
			enr_std: true,
			enr_prem: true,
			ds_prem: true,
			mfa: true,
			sso: true,
			team_adm: true,
			team_pool: true,
			slf_hosted: true,
			slo: "Call us",
			proj_share: true,
			ver_his: true,
			data_stream: true,
			nvme: true,
			audio: true,
		},
	},
]

interface Feature {
	category: string
	items: {
		name: string
		key: keyof typeof PricingAccounts[number]["features"]
		tooltip?: string
	}[]
}

export const PricingFeatures: Feature[] = [
	// {
	// 	category: "Dev Tools",
	// 	items: [
	// 		{
	// 			key: "dev_purchase_buttons",
	// 			name: "Hardcoded Purchase Links",
	// 			// tooltip: "Tiramisu caramels topping donut oat cake chocolate bar cookie jujubes.",
	// 		},
	// 	],
	// },
	{
		category: "Resource Limits",
		items: [
			{
				key: "data",
				name: "Data Under Analysis (GB)",
				// tooltip: "Tiramisu caramels topping donut oat cake chocolate bar cookie jujubes.",
			},
			// {
			// 	key: "xfer",
			// 	name: "Monthly Transfer Limit (GB)",
			// },
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
			// { // @todo finish me
			// 	key: "price_by_tier",
			// 	name: "Price per GB (annual)",
			// 	forumula: "PRICE_BY_TIER"
			// },
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
				name: "Standard threat intel enrichments",
			},
			// {
			// 	key: "ds_prem",
			// 	name: "Data Science Add-on Package",
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
			{
				key: "slf_hosted",
				name: "Self-Hosted",
			},
		],
	},
	{
		category: "Support",
		items: [{ key: "slo", name: "SLO" }],
	},
	{
		category: "Coming Soon",
		items: [
			{
				key: "proj_share",
				name: "Project Sharing",
			},
			{
				key: "ana_prem",
				name: "Premium analytics",
			},
			{
				key: "enr_prem",
				name: "Premium threat intel enrichments",
			},
			{
				key: "ver_his",
				name: "Version History",
			},
			{
				key: "audio",
				name: "Live Collaboration",
			},
			{
				key: "audio",
				name: "Team Audio Chat",
			},
			{
				key: "data_stream",
				name: "Data streaming",
			},
			{
				key: "nvme",
				name: "NVME-backed Storage",
			},
		],
	},
]

export type ElementType<T extends ReadonlyArray<unknown>> =
	T extends ReadonlyArray<infer ElementType> ? ElementType : never

export type PricingAccountsType = ElementType<typeof PricingAccounts>

export type PricingAccountForTierType = {
	name: string
	prodType: string
	description: string
	tiers_by_gb: { [key: number]: string }
	features: { [key: string]: object | string | boolean }
	isPopular: boolean
	isDisabled: boolean
	isCurrent: boolean
}

export default PricingAccounts
