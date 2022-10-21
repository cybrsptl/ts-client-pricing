const PricingServices = [
	{
		name: "Basic",
		description: "Oat cake chocolate liquorice jelly shortbread cake oat.",
		price: "$19",
		features: {
			// Features,
			Cupcakes: "10",
			Marshmallow: true,
			Biscuit: false,
			Brownie: false,
			// Analytics,
			Lollipop: "Strawberry",
			Muffin: true,
			Pudding: false,
			Cookie: false,
			// Support
			Chocolate: true,
			Marzipan: false,
			Gingerbread: false,
		},
	},
	{
		name: "Pro",
		isPopular: true,
		description: "Caramels cupcake topping cookie tootsie roll macaroon.",
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
		name: "Ultimate",
		description: "Chocolate macaroon liquorice cheesecake donut toffee.",
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
		category: "Features",
		items: [
			{ name: "Marshmallow" },
			{
				name: "Cupcakes",
				tooltip:
					"Tiramisu caramels topping donut oat cake chocolate bar cookie jujubes.",
			},
			{
				name: "Biscuit",
				tooltip:
					"Tiramisu caramels topping donut oat cake chocolate bar cookie jujubes.",
			},
			{ name: "Brownie" },
		],
	},
	{
		category: "Analytics",
		items: [
			{ name: "Lollipop" },
			{
				name: "Muffin",
				tooltip:
					"Tiramisu caramels topping donut oat cake chocolate bar cookie jujubes.",
			},
			{ name: "Pudding" },
			{ name: "Cookie" },
		],
	},
	{
		category: "Support",
		items: [
			{ name: "Chocolate" },
			{ name: "Marzipan" },
			{
				name: "Gingerbread",
				tooltip:
					"Tiramisu caramels topping donut oat cake chocolate bar cookie jujubes.",
			},
			{ name: "Brownie" },
		],
	},
]

export type ElementType<T extends ReadonlyArray<unknown>> =
	T extends ReadonlyArray<infer ElementType> ? ElementType : never

export type PricingServicesType = ElementType<typeof PricingServices>

export default PricingServices
