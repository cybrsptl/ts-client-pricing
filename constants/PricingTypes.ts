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
