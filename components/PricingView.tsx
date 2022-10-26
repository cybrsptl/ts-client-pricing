import * as React from "react"
import { useMemo, useState } from "react"
import { Box, Stack } from "@chakra-ui/react"
import AppConfig from "@common/constants/AppConfig"
import PricingAccounts, {
	PricingAccountForTierType,
} from "../constants/CustomPricingData"
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
	const [billingTier, setBillingTier] = useState(0)

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

	// Enumerate all account tiers
	// (Used to determine where to place the discrete stops for the ProductTierSelection slider).
	const pricingTiers = React.useMemo(() => {
		const pricingTiers = {}
		PricingAccounts.forEach((type) => {
			if (!type.tiers_by_gb) {
				return
			}
			Object.entries(type.tiers_by_gb).forEach(([k, v]) => {
				const prodKey = `${v}|${PricingBillingModeToStripe[billingMode]}`

				// Blank tiers_by_gb values indicate free tiers
				if (!v) {
					pricingTiers[k] = null
					return
				}

				if (!pricingData[prodKey]) {
					console.warn(
						"ProductTierSelection :: No pricing data found for ",
						prodKey
					)
					return
				}
				pricingTiers[k] = pricingData[prodKey]
			})
		})
		return pricingTiers
	}, [pricingData, billingMode])

	// Normalize PricingAccountTypes
	// (Flattens all XXX_by_tier values into a pricing-tier-aligned feature/pricing matrix to be rendered by child components).
	const accountTypesForChosenTier = React.useMemo(() => {
		const accountTypesForChosenTier: PricingAccountForTierType[] = JSON.parse(
			JSON.stringify(PricingAccounts)
		)

		accountTypesForChosenTier.forEach((pricingAccount) => {
			if (!pricingAccount.tiers_by_gb) {
				return
			}

			// Find the lowest tier for this account type with enough GB to satisfy current billingTier selection
			let lowestTier: number = null
			let lowestTierProductId = null
			Object.entries(pricingAccount.tiers_by_gb).forEach(([k, v]) => {
				const tierDataLimit = parseFloat(k)
				if (
					tierDataLimit < billingTier ||
					(lowestTier && tierDataLimit > lowestTier)
				) {
					return
				}
				lowestTier = tierDataLimit
				lowestTierProductId = v
			})

			const tierProdKey = `${lowestTierProductId}|${PricingBillingModeToStripe[billingMode]}`

			// console.log("------")
			// console.log("pricingAccount.name", pricingAccount.name)
			// console.log("pricingData", pricingData)
			// console.log("lowestTierProductId", tierProdKey)
			// console.log("pricingData[tierProdKey]", pricingData[tierProdKey])

			if (!pricingData[tierProdKey]) {
				pricingAccount.isDisabled = true
				return
			}

			pricingAccount.name = `${pricingData[tierProdKey].prodType} ${pricingData[tierProdKey].prodTier}`

			// Flatten _by_tier values to match current tier
			// Inject additional values by cross-referencing with (Stripe authoritative) pricingData
		})

		console.log("accountTypesForChosenTier", accountTypesForChosenTier)
		return accountTypesForChosenTier
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [PricingAccounts, billingTier, billingMode, pricingData])

	return (
		<Box as="section" bg="bg-surface">
			<Stack spacing={{ base: "5", md: "7" }} width="100%" mb={8}>
				<ProductTierSelection
					{...{
						pricingTiers: pricingTiers,
						billingMode,
						setBillingMode,
						billingTier,
						setBillingTier,
					}}
				/>
				<ProductOverviewTable products={accountTypesForChosenTier} />
				<ProductCallToActionTable
					products={accountTypesForChosenTier}
					marginTop="0px important"
				/>
				<ProductFeaturesTable
					{...{
						billingMode,
						billingTier,
					}}
				/>
				<ProductCallToActionTable products={accountTypesForChosenTier} />
			</Stack>
		</Box>
	)
}
