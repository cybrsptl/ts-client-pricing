import * as React from "react"
import { useMemo } from "react"
import { Box, Stack } from "@chakra-ui/react"
import AppConfig from "@common/constants/AppConfig"
import PricingAccountTypes from "../constants/CustomPricingData"
import {
	PricingBillingMode,
	PricingBillingModeToStripe,
} from "../constants/PricingConstants"
import { StripePricingDataList } from "../constants/PricingTypes"
import { PricingDataDev, PricingDataProd } from "../constants/StripePricingData"
import { ProductCallToActionTable } from "./ProductCallToActionTable"
import { ProductFeaturesTable } from "./ProductFeaturesTable"
import { ProductOverviewTable } from "./ProductOverviewTable"
import { ProductTierSelection } from "./ProductTierSelection"

export const PricingView = () => {
	const [billingMode, setBillingMode] = React.useState<PricingBillingMode>(
		PricingBillingMode.ANNUAL
	)

	const pricingData = useMemo(() => {
		const data = (
			AppConfig.stripe_test_mode ? PricingDataDev : PricingDataProd
		) as StripePricingDataList
		Object.entries(data).forEach(([k, v]) => {
			const regex = /(Teleseer\s?)?(?<type>\w+)\s(?<tier>\w+)/
			const prodNameParsed = v.prodName.match(regex)
			v.prodType = prodNameParsed.groups.type.toLowerCase()
			v.prodTier = parseInt(prodNameParsed.groups.tier)
		})
		console.log("pricingData", data)
		return data
	}, [AppConfig?.stripe_test_mode])

	const accountTiers = React.useMemo(() => {
		const accountTiers = {}
		PricingAccountTypes.forEach((type) => {
			if (!type.tiers_by_gb) {
				return
			}
			Object.entries(type.tiers_by_gb).forEach(([k, v]) => {
				const prodKey = `${v}|${PricingBillingModeToStripe[billingMode]}`

				// Blank tiers_by_gb values indicate free tiers
				if (!v) {
					accountTiers[k] = null
					return
				}

				if (!pricingData[prodKey]) {
					console.warn(
						"ProductTierSelection :: No pricing data found for ",
						prodKey
					)
					return
				}
				accountTiers[k] = pricingData[prodKey]
			})
		})
		return accountTiers
	}, [pricingData, billingMode])

	const [billingTier, setBillingTier] = React.useState(0)

	return (
		<Box as="section" bg="bg-surface">
			<Stack spacing={{ base: "5", md: "7" }} width="100%" mb={8}>
				<ProductTierSelection
					{...{
						accountTiers,
						billingMode,
						setBillingMode,
						billingTier,
						setBillingTier,
					}}
				/>
				<ProductOverviewTable products={PricingAccountTypes} />
				<ProductCallToActionTable
					products={PricingAccountTypes}
					marginTop="0px important"
				/>
				<ProductFeaturesTable
					{...{
						billingMode,
						billingTier,
					}}
				/>
				<ProductCallToActionTable products={PricingAccountTypes} />
			</Stack>
		</Box>
	)
}
