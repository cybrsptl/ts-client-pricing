import * as React from "react"
import { useEffect, useMemo, useState } from "react"
import { Box, Stack } from "@chakra-ui/react"
import AppConfig from "@common/constants/AppConfig"
import { ThemeColor } from "@common/utils/theme"
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
import { ProductFeatures } from "./ProductFeatures"
import { ProductOverview } from "./ProductOverview"
import { ProductTierSelection } from "./ProductTierSelection"

export interface ProductPurchaseProps {
	stripePriceIdToPurchase: string | null
	setStripePriceIdToPurchase: (prodType: string | null) => void
}

export type PricingViewParams = {
	tenantDataUnderAnalysis?: number
	tenantTierName?: string
	userEmail?: string
	purchaseEnabled?: boolean
	purchaseComponent?: React.FC<ProductPurchaseProps>
	theme?: ThemeColor
}

export const PricingView = ({
	tenantDataUnderAnalysis,
	tenantTierName,
	userEmail,
	purchaseEnabled,
	purchaseComponent: PurchaseComponent,
	theme,
}: PricingViewParams) => {
	const [stripePriceIdToPurchase, setStripePriceIdToPurchase] =
		useState<string>(null)

	const [billingMode, setBillingMode] = React.useState<PricingBillingMode>(
		PricingBillingMode.MONTHLY
	)

	// Automatically set billing tier to current tenant limit when page loads
	const [billingTier, setBillingTier] = useState(10) // Default to Starter 10 (10 GB tier)
	useEffect(() => {
		if (
			!tenantDataUnderAnalysis ||
			tenantDataUnderAnalysis / (1000 * 1000 * 1000) < 1
		) {
			return
		}
		setBillingTier(tenantDataUnderAnalysis / (1000 * 1000 * 1000))
	}, [tenantDataUnderAnalysis])

	const pricingData = useMemo(() => {
		const data = (
			AppConfig.stripe_test_mode ? PricingDataDev : PricingDataProd
		) as StripePricingDataList

		Object.entries(data).forEach(([k, v]) => {
			const regex = /(Teleseer\s?)?(?<type>\w+)\s\((?<tier>.+)\)/
			const prodNameParsed = v.prodName.match(regex)
			v.prodType = prodNameParsed.groups.type.toLowerCase()
			v.prodTier = parseInt(prodNameParsed.groups.tier)
		})

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
					// console.warn(
					// 	"ProductTierSelection :: No pricing data found for ",
					// 	prodKey
					// )
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

			// Copy product descriptions from source PricingAccounts data, as React nodes can't survive JSON serialization.
			const sourcePricingAccount = PricingAccounts.find(
				(p) => p.prodType === product.prodType
			)
			if (sourcePricingAccount) {
				product.description = sourcePricingAccount.description
			}

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

			// Inject additional pricing values by cross-referencing with (Stripe authoritative) pricingData
			if (pricingData[tierProdKey]) {
				// product.name = `${_.startCase(pricingData[tierProdKey].prodType)} ${
				// 	pricingData[tierProdKey].prodTier
				// }`
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
				product.prodId = pricingData[tierProdKey].prodId
				product.priceId = pricingData[tierProdKey].priceId
			} else {
				product.isDisabled = true
			}

			// Populate pricePerMonthBilledMonthly/Annually for display purposes
			const tierProdKeyBilledMonthly = `${lowestTierProductId}|${
				PricingBillingModeToStripe[PricingBillingMode.MONTHLY]
			}`
			const tierProdKeyBilledAnnually = `${lowestTierProductId}|${
				PricingBillingModeToStripe[PricingBillingMode.ANNUAL]
			}`
			if (pricingData[tierProdKeyBilledMonthly]) {
				if (billingMode === PricingBillingMode.ANNUAL) {
					product.pricePerMonthBilledMonthly = Math.floor(
						pricingData[tierProdKeyBilledMonthly].cost / 100
					)
				} else {
					product.pricePerMonthBilledAnnually = Math.floor(
						pricingData[tierProdKeyBilledAnnually].cost / 100 / 12
					)
				}
			} else {
				// Set annualBillingOnly for products with blank pricing because of monthly billing mode being selected
				product.annualBillingOnly = true
			}

			if (product.pricePerMonth && product.dataInGB) {
				product.features.pricePerGB = `$${(
					product.pricePerMonth / product.dataInGB
				)
					.toFixed(2)
					.toLocaleString()}`
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
		<Box as="section">
			<Stack spacing={{ base: "5", md: "7" }} mb={8}>
				{PurchaseComponent && (
					<PurchaseComponent
						{...{
							stripePriceIdToPurchase,
							setStripePriceIdToPurchase,
						}}
					/>
				)}
				<ProductOverview
					{...{
						products,
						billingMode,
						setBillingMode,
						billingTier,
						userEmail,
						tenantTierName,
						purchaseEnabled,
						stripePriceIdToPurchase,
						setStripePriceIdToPurchase,
						theme,
					}}
				/>
				<ProductTierSelection
					{...{
						pricingTiers,
						billingMode,
						setBillingMode,
						billingTier,
						setBillingTier,
						theme,
					}}
				/>
				<ProductFeatures
					{...{
						billingMode,
						billingTier,
						products,
						theme,
					}}
				/>
			</Stack>
		</Box>
	)
}
