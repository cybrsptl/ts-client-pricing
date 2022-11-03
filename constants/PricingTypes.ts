import React from "react"
import { BoxProps } from "@chakra-ui/react"

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
	subTitle: string
	footer: string
	purchaseLink?: string
	price?: string
	pricePerMonth?: number
	pricePerMonthBilledMonthly?: number
	pricePerMonthBilledAnnually?: number
	description?:
		| string
		| ((product: PricingAccountForTierType) => React.ReactNode)
	dataInGB?: number
	billingFrequency?: string
	prodType: string
	tiersByGB: { [key: number]: string }
	features: { [key: string]: object | string | boolean }
	hideOverviewCard?: boolean
	isPopular?: boolean
	isComingSoon?: boolean
	isDisabled?: boolean
	isCurrent?: boolean
	annualBillingOnly?: boolean
	isBelowDesiredLimits?: boolean
	boxProps?: BoxProps
}
