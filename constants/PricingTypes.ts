import React from "react"
import { BoxProps, SystemStyleObject } from "@chakra-ui/react"

export interface StripePricingData {
	prodId: string
	prodName: string
	prodType?: string
	prodTier?: number
	cost: number
	interval: string
	priceId: string
	link: string
}

export interface StripePricingDataList {
	[key: string]: StripePricingData
}

export type PricingAccountForTierType = {
	name: string
	subTitle?: string
	footer?: string
	purchaseLink?: string
	go?: string
	goButtonStyle?: SystemStyleObject
	cardStyle?: SystemStyleObject
	perGb?: number
	price?: string
	prodId?: string
	priceId?: string
	pricePerMonth?: number
	pricePerMonthBilledMonthly?: number
	pricePerMonthBilledAnnually?: number
	description?:
		| string
		| ((product: PricingAccountForTierType) => React.ReactNode)
	dataInGB?: number
	billingFrequency?: string
	prodType: string
	tiersByGbToStripeIDs?: { [key: number]: string }
	tierShort: { [key: string]: string }
	features: { [key: string]: object | string | boolean | number }
	hideOverviewCard?: boolean
	isDisabled?: boolean
	isCurrent?: boolean
	annualBillingOnly?: boolean
	isBelowDesiredLimits?: boolean
	boxProps?: BoxProps
	freeTrialDays?: number
}
