import AppConfig from "@common/constants/AppConfig"

// Note: Tier thresholds should match out latest values in https://docs.google.com/spreadsheets/d/1rQRlPnumgwwRB2d-18kU82fpEOwILBEXys_FgbVdjc0/edit?usp=sharing

const PricingAccounts = [
	{
		name: "Free",
		prodType: "starter",
		description: "",
		tiersByGB: {
			0.1: null,
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
				0.1: "100 MB",
				5: "5 GB",
				20: "20 GB",
			},
			xferByTier: {
				0.1: "10",
				5: "25",
				20: "20",
			},
			carvingByTier: {
				0.1: "0.01",
				5: "1",
				20: "2",
			},
			historyByTier: {
				0.1: "30 days",
				5: "90 days",
				20: "90 days",
			},
			assetsByTier: {
				0.1: "1,000",
				5: "Unlimited",
				20: "Unlimited",
			},
			projectsByTier: {
				0.1: "3",
				5: "5",
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
				100: "1 TB",
				200: "2 TB",
				300: "3 TB",
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
		isComingSoon: true,
		description: "",
		isDisabled: true,
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
				500: "5 TB",
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
			data: "Unlimited",
			xfer: "Unlimited",
			carving: "Unlimited",
			assets: "Unlimited",
			projects: "Unlimited",
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
	{
		category: "Resource Limits",
		items: [
			{
				key: "data",
				name: "Data Under Analysis",
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
			// 	key: "priceByTier",
			// 	name: "Price per GB (annual)",
			// 	forumula: "PRICEByTier"
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
	// 			key: "ana_prem",
	// 			name: "Premium analytics",
	// 		},
	// 		{
	// 			key: "enr_prem",
	// 			name: "Premium threat intel enrichments",
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
