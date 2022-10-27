import _ from "lodash"
import * as React from "react"
import { useEffect, useMemo, useState } from "react"
import { Box, Stack } from "@chakra-ui/react"
import AppConfig from "@common/constants/AppConfig"
import PricingAccounts from "../constants/CustomPricingData"
import {
	PricingBillingMode,
	PricingBillingModeToStripe,
} from "../constants/PricingConstants"
import {
	PricingAccountForTierType,
	StripePricingDataList,
} from "../constants/PricingTypes"
import { PricingDataDev, PricingDataProd } from "../constants/StripePricingData"
import { ProductCallToActionTable } from "./ProductCallToActionTable"
import { ProductFeaturesTable } from "./ProductFeaturesTable"
import { ProductOverviewTable } from "./ProductOverviewTable"
import { ProductTierSelection } from "./ProductTierSelection"

type PricingViewParams = {
	tenantDataUnderAnalysis?: number
	tenantTierName?: string
	userEmail?: string
}

export const PricingView = ({
	tenantDataUnderAnalysis,
	tenantTierName,
	userEmail,
}: PricingViewParams) => {
	const [billingMode, setBillingMode] = React.useState<PricingBillingMode>(
		PricingBillingMode.ANNUAL
	)

	// Automatically set billing tier to current tenant limit when page loads
	const [billingTier, setBillingTier] = useState(-1)
	useEffect(() => {
		if (billingTier !== -1 || !tenantDataUnderAnalysis) {
			return
		}
		setBillingTier(tenantDataUnderAnalysis / (1000 * 1000 * 1000))
	}, [billingTier, tenantDataUnderAnalysis])

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
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [AppConfig?.stripe_test_mode])

	// Enumerate all account tiers
	// (Used to determine where to place the discrete stops for the ProductTierSelection slider).
	const pricingTiers = useMemo(() => {
		const pricingTiers = {}
		PricingAccounts.forEach((type) => {
			if (!type.tiersByGB) {
				return
			}
			Object.entries(type.tiersByGB).forEach(([k, v]) => {
				const prodKey = `${v}|${PricingBillingModeToStripe[billingMode]}`

				// Blank tiersByGB values indicate free tiers
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
	// (Flattens all XXXByTier values into a pricing-tier-aligned feature/pricing matrix to be rendered by child components).
	const products = React.useMemo(() => {
		const accountTypesForChosenTier: PricingAccountForTierType[] = JSON.parse(
			JSON.stringify(PricingAccounts)
		)

		accountTypesForChosenTier.forEach((product) => {
			if (!product.tiersByGB) {
				return
			}

			// console.log("------")
			// console.log("pricingAccount.name", pricingAccount.name)

			// Find the lowest tier for this account type with enough GB to satisfy current billingTier selection

			const tiersAsc: number[] = Object.keys(product.tiersByGB)
				.sort((a, b) => parseFloat(a) - parseFloat(b))
				.map((k) => parseFloat(k))

			// console.log("tiersAsc", tiersAsc)

			let lowestTierIndex: number = tiersAsc.find(
				(tierDataLimit) => tierDataLimit >= billingTier
			)

			// Default to first tier of each product if requested resources are already over the highest tier
			if (lowestTierIndex === undefined) {
				product.isBelowDesiredLimits = true
				lowestTierIndex = tiersAsc[tiersAsc.length - 1]
			}

			const lowestTierProductId = product.tiersByGB[lowestTierIndex]
			const tierProdKey = `${lowestTierProductId}|${PricingBillingModeToStripe[billingMode]}`

			// Flatten ByTier values to match current tier
			Object.entries(product?.features || {}).forEach(
				([featureKey, featureVal]) => {
					if (!featureKey.endsWith("ByTier") || !featureVal[lowestTierIndex]) {
						return
					}
					const featureKeyNormalized = featureKey.replace("ByTier", "")
					// console.log(
					// 	"featureKeyNormalized",
					// 	featureKeyNormalized,
					// 	"featureVal",
					// 	featureVal,
					// 	"pricingAccount.features[featureKeyNormalized]",
					// 	(pricingAccount.features[featureKeyNormalized] =
					// 		featureVal[lowestTierIndex])
					// )
					product.features[featureKeyNormalized] = featureVal[lowestTierIndex]
				}
			)

			// Inject additional values by cross-referencing with (Stripe authoritative) pricingData

			if (pricingData[tierProdKey]) {
				product.name = `${_.startCase(pricingData[tierProdKey].prodType)} ${
					pricingData[tierProdKey].prodTier
				}`
				product.price = `${pricingData[tierProdKey].cost / 100}`

				product.pricePerMonth = Math.floor(
					pricingData[tierProdKey].cost /
						100 /
						(pricingData[tierProdKey].interval === "year" ? 12 : 1)
				)
				product.dataInGB = lowestTierIndex
				product.billingFrequency = pricingData[tierProdKey].interval
				if (!product.isBelowDesiredLimits) {
					product.purchaseLink = pricingData[tierProdKey].link
				}
			} else {
				product.isDisabled = true
			}

			// Set annualBillingOnly for products with blank pricing because of monthly billing mode being selected
			if (
				!product.pricePerMonth &&
				billingMode === PricingBillingMode.MONTHLY &&
				lowestTierProductId
				// && pricingData[tierProdKey].interval === "year"
			) {
				product.annualBillingOnly = true
			}

			// console.log("billingTier", billingTier)
			// console.log("pricingData", pricingData)
			// console.log("lowestTierProductId", lowestTierProductId)
			// console.log("pricingData[tierProdKey]", pricingData[tierProdKey])
		})

		// console.log("accountTypesForChosenTier", accountTypesForChosenTier)
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
				<ProductOverviewTable
					{...{
						billingMode,
						billingTier,
						products: products,
					}}
				/>
				<ProductCallToActionTable
					{...{
						products,
					}}
				/>
				<ProductFeaturesTable
					{...{
						billingMode,
						billingTier,
						accountTypesForChosenTier: products,
					}}
				/>
				<ProductCallToActionTable
					{...{
						products,
						userEmail,
						tenantTierName,
					}}
				/>
			</Stack>
		</Box>
	)
}
