export interface StripePricingData {
	prodId: string
	prodName: string
	prodType?: string
	prodTier?: number
	cost: number
	interval: string
	link: string
}

export interface StripePricingDataList {
	[key: string]: StripePricingData
}

export type PricingAccountForTierType = {
	name: string
	price: string
	pricePerMonth: number
	dataInGB: number
	billingFrequency: string
	prodType: string
	description: string
	tiersByGB: { [key: number]: string }
	features: { [key: string]: object | string | boolean }
	isPopular: boolean
	isComingSoon: boolean
	isDisabled: boolean
	isCurrent: boolean
	isBelowDesiredLimits: boolean
}
