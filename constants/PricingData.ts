const PricingServices = [
	{
		name: "Starter",
		description: "",
		price: "$19",
		features: {
			data: "999",
			xfer: "999",
			carving: "999",
			time: "999",
			assets: "999",
			projects: "999",
			price_per_gb: "999",
			ana_std: "999",
			ana_prem: "999",
			enr_std: "999",
			enr_prem: "999",
			ds_prem: "999",
			mfa: "999",
			sso: "999",
			team_adm: "999",
			team_pool: "999",
			slf_hosted: "999",
			slo: "999",
			proj_share: "999",
			ver_his: "999",
			data_stream: "999",
			audio: "999",
		},
	},
	{
		name: "Pro",
		isPopular: true,
		description: "",
		price: "$29",
		features: {
			// Features,
			Cupcakes: "20",
			Marshmallow: true,
			Biscuit: false,
			Brownie: false,
			// Analytics,
			Lollipop: "Cherry",
			Muffin: true,
			Pudding: true,
			Cookie: false,
			// Support
			Chocolate: true,
			Marzipan: true,
			Gingerbread: false,
		},
	},
	{
		name: "Team",
		description: "",
		price: "$49",
		features: {
			// Features,
			Cupcakes: "Unlimited",
			Marshmallow: true,
			Biscuit: true,
			Brownie: true,
			// Analytics,
			Lollipop: "Apple",
			Muffin: true,
			Pudding: true,
			Cookie: true,
			// Support
			Chocolate: true,
			Marzipan: true,
			Gingerbread: true,
		},
	},
	{
		name: "Enterprise",
		description: "Contact for details.",
		features: {
			// Features,
			Cupcakes: "Unlimited",
			Marshmallow: true,
			Biscuit: true,
			Brownie: true,
			// Analytics,
			Lollipop: "Apple",
			Muffin: true,
			Pudding: true,
			Cookie: true,
			// Support
			Chocolate: true,
			Marzipan: true,
			Gingerbread: true,
		},
	},
]

interface Feature {
	category: string
	items: {
		name: keyof typeof PricingServices[number]["features"]
		tooltip?: string
	}[]
}

export const PricingFeatures: Feature[] = [
	{
		category: "Resource Limits",
		items: [
			{
				key: "data",
				name: "Data Under Analysis (GB)",
				// tooltip: "Tiramisu caramels topping donut oat cake chocolate bar cookie jujubes.",
			},
			{
				key: "xfer",
				name: "Monthly Transfer Limit (GB)",
			},
			{
				key: "carving",
				name: "Data Carving Size Limit (GB)",
			},
			{
				key: "time",
				name: "Analysis Time Range",
			},
			{
				key: "assets",
				name: "Total Assets",
			},
			{
				key: "projects",
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
				key: "enr_prem",
				name: "Premium threat intel enrichments",
			},
			{
				key: "ana_prem",
				name: "Premium analytics",
			},
			{
				key: "ds_prem",
				name: "Data Science Add-on Package",
			},
			{
				key: "ver_his",
				name: "Version History",
			},
			{
				key: "data_stream",
				name: "Data streaming",
			},
			{
				key: "nvme",
				name: "NVME-backed Storage",
			},
			{
				key: "audio",
				name: "Audio Chat",
			},
		],
	},
]

export type ElementType<T extends ReadonlyArray<unknown>> =
	T extends ReadonlyArray<infer ElementType> ? ElementType : never

export type PricingServicesType = ElementType<typeof PricingServices>

export default PricingServices
