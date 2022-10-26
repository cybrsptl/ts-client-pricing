import _ from "lodash"
import * as React from "react"
import { useEffect, useMemo, useState } from "react"
import { Box, Stack } from "@chakra-ui/react"
import { useTenants } from "@common/components/AppTenantsProvider"
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
	const { activeTenant } = useTenants()
	const [billingMode, setBillingMode] = React.useState<PricingBillingMode>(
		PricingBillingMode.ANNUAL
	)
	const [billingTier, setBillingTier] = useState(-1)

	// Automatically set billing tier to current tenant limit when page loads
	useEffect(() => {
		if (billingTier !== -1 || !activeTenant?.tier?.data_under_analysis) {
			return
		}
		setBillingTier(activeTenant.tier.data_under_analysis / (1000 * 1000 * 1000))
	}, [billingTier, activeTenant?.tier?.data_under_analysis])

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

		// console.log("pricingData", data)
		return data
	}, [AppConfig?.stripe_test_mode])

	// Enumerate all account tiers
	// (Used to determine where to place the discrete stops for the ProductTierSelection slider).
	const pricingTiers = useMemo(() => {
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

			console.log("------")
			console.log("pricingAccount.name", pricingAccount.name)

			// Find the lowest tier for this account type with enough GB to satisfy current billingTier selection

			const tiersAsc: number[] = Object.keys(pricingAccount.tiers_by_gb)
				.sort((a, b) => parseFloat(a) - parseFloat(b))
				.map((k) => parseFloat(k))

			// console.log("tiersAsc", tiersAsc)

			const lowestTierIndex: number = tiersAsc.find(
				(tierDataLimit) => tierDataLimit >= billingTier
			)
			const lowestTierProductId = lowestTierIndex
				? pricingAccount.tiers_by_gb[lowestTierIndex]
				: null
			const tierProdKey = `${lowestTierProductId}|${PricingBillingModeToStripe[billingMode]}`

			// Flatten _by_tier values to match current tier
			Object.entries(pricingAccount?.features || {}).forEach(
				([featureKey, featureVal]) => {
					if (
						!featureKey.endsWith("_by_tier") ||
						!featureVal[lowestTierIndex]
					) {
						return
					}
					const featureKeyNormalized = featureKey.replace("_by_tier", "")
					// console.log(
					// 	"featureKeyNormalized",
					// 	featureKeyNormalized,
					// 	"featureVal",
					// 	featureVal,
					// 	"pricingAccount.features[featureKeyNormalized]",
					// 	(pricingAccount.features[featureKeyNormalized] =
					// 		featureVal[lowestTierIndex])
					// )
					pricingAccount.features[featureKeyNormalized] =
						featureVal[lowestTierIndex]
				}
			)

			// Inject additional values by cross-referencing with (Stripe authoritative) pricingData

			if (pricingData[tierProdKey]) {
				pricingAccount.name = `${_.startCase(
					pricingData[tierProdKey].prodType
				)} ${pricingData[tierProdKey].prodTier}`
				pricingAccount.price = `$${pricingData[tierProdKey].cost / 100}`
				pricingAccount.billingFrequency = pricingData[tierProdKey].interval
			} else {
				pricingAccount.isDisabled = true
			}

			console.log("billingTier", billingTier)
			console.log("pricingData", pricingData)
			console.log("lowestTierProductId", lowestTierProductId)
			console.log("pricingData[tierProdKey]", pricingData[tierProdKey])
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
						accountTypesForChosenTier,
					}}
				/>
				<ProductCallToActionTable products={accountTypesForChosenTier} />
			</Stack>
		</Box>
	)
}
