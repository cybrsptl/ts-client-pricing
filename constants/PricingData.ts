const PricingServices = [
	{
		name: "Starter",
		description: "",
		price_per_gb: {
			0.1: "Free",
			10: ["$49", "$39"],
			20: ["$99", "$79"],
		},
		features: {
			data_per_gb: {
				0.1: "0.1",
				10: "10",
				20: "20",
			},
			xfer_per_gb: {
				0.1: "0.1",
				10: "10",
				20: "20",
			},
			carving_per_gb: {
				0.1: "0.1",
				10: "10",
				20: "20",
			},
			history_per_gb: {
				0.1: "0.1",
				10: "10",
				20: "20",
			},
			assets_per_gb: {
				0.1: "0.1",
				10: "10",
				20: "20",
			},
			projects_per_gb: {
				0.1: "0.1",
				10: "10",
				20: "20",
			},
			price_per_gb: "$4.90",
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
		isPopular: true,
		description: "",
		features: {
			data_per_gb: {
				0.1: "0.1",
				10: "10",
				20: "20",
			},
			xfer_per_gb: {
				0.1: "0.1",
				10: "10",
				20: "20",
			},
			carving_per_gb: {
				0.1: "0.1",
				10: "10",
				20: "20",
			},
			history_per_gb: {
				0.1: "0.1",
				10: "10",
				20: "20",
			},
			assets_per_gb: {
				0.1: "0.1",
				10: "10",
				20: "20",
			},
			projects_per_gb: {
				0.1: "0.1",
				10: "10",
				20: "20",
			},
			price_per_gb: "$2.49",
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
		name: "Team",
		description: "Coming soon.",
		isDisabled: true,
		features: {
			data_per_gb: {
				0.1: "0.1",
				10: "10",
				20: "20",
			},
			xfer_per_gb: {
				0.1: "0.1",
				10: "10",
				20: "20",
			},
			carving_per_gb: {
				0.1: "0.1",
				10: "10",
				20: "20",
			},
			history_per_gb: {
				0.1: "0.1",
				10: "10",
				20: "20",
			},
			assets_per_gb: {
				0.1: "0.1",
				10: "10",
				20: "20",
			},
			projects_per_gb: {
				0.1: "0.1",
				10: "10",
				20: "20",
			},
			price_per_gb: "$1.00",
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
		isDisabled: true,
		features: {
			data_per_gb: {
				0.1: "0.1",
				10: "10",
				20: "20",
			},
			xfer_per_gb: {
				0.1: "0.1",
				10: "10",
				20: "20",
			},
			carving_per_gb: {
				0.1: "0.1",
				10: "10",
				20: "20",
			},
			history_per_gb: {
				0.1: "0.1",
				10: "10",
				20: "20",
			},
			assets_per_gb: {
				0.1: "0.1",
				10: "10",
				20: "20",
			},
			projects_per_gb: {
				0.1: "0.1",
				10: "10",
				20: "20",
			},
			price_per_gb: "",
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
			slo: "Call Us",
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
		key: keyof typeof PricingServices[number]["features"]
		tooltip?: string
	}[]
}

export const PricingFeatures: Feature[] = [
	{
		category: "Resource Limits",
		items: [
			{
				key: "data_per_gb",
				name: "Data Under Analysis (GB)",
				// tooltip: "Tiramisu caramels topping donut oat cake chocolate bar cookie jujubes.",
			},
			{
				key: "xfer_per_gb",
				name: "Monthly Transfer Limit (GB)",
			},
			{
				key: "carving_per_gb",
				name: "Data Carving Size Limit (GB)",
			},
			{
				key: "history_per_gb",
				name: "Analysis Time Range",
			},
			{
				key: "assets_per_gb",
				name: "Total Assets",
			},
			{
				key: "projects_per_gb",
				name: "Total Projects",
			},
			{
				key: "price_per_gb",
				name: "Price per GB (annual)",
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
				name: "Standard threat intel enrichments",
			},
			{
				key: "ana_prem",
				name: "Premium analytics",
			},
			{
				key: "enr_prem",
				name: "Premium threat intel enrichments",
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
				key: "ver_his",
				name: "Version History",
			},
			{
				key: "audio",
				name: "Audio Chat",
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

export type PricingServicesType = ElementType<typeof PricingServices>

export default PricingServices
