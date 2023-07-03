import * as React from "react"
import { useEffect, useMemo, useState } from "react"
import { Stack } from "@chakra-ui/react"
import AppConfig from "@common/constants/AppConfig"
import useAppToast from "@common/hooks/useAppToast"
import useAxios from "@common/hooks/useAxios"
import PricingAccounts, {
	defaultPricingTier,
} from "../constants/CustomPricingData"
import {
	PricingBillingMode,
	PricingBillingModeToStripe,
} from "../constants/PricingConstants"
import { StripePricingDataList } from "../constants/PricingTypes"
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
}

export const PricingView = ({
	tenantDataUnderAnalysis,
	tenantTierName,
	userEmail,
	purchaseEnabled,
	purchaseComponent: PurchaseComponent,
}: PricingViewParams) => {
	const toast = useAppToast()
	const axiosInstance = useAxios()

	const [stripePriceIdToPurchase, setStripePriceIdToPurchase] =
		useState<string>(null)

	const [billingMode, setBillingMode] = React.useState<PricingBillingMode>(
		PricingBillingMode.ANNUAL
	)

	// Load Stripe pricing data
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

	// Automatically set billing tier to highest available match value based on current tenant limit when page loads
	const [billingTier, setBillingTier] = useState(defaultPricingTier)
	useEffect(() => {
		// If tenant data is not available, leave at defaultPricingTier
		if (
			!tenantDataUnderAnalysis ||
			tenantDataUnderAnalysis / (1000 * 1000 * 1000) < 1
		) {
			return
		}

		const currentDUA = tenantDataUnderAnalysis / (1000 * 1000 * 1000)
		let highestTierMatch = defaultPricingTier
		PricingAccounts(
			PricingBillingMode.ANNUAL,
			defaultPricingTier,
			tenantTierName
		).forEach((type) => {
			if (!type.tiersByGbToStripeIDs) {
				return
			}

			Object.entries(type.tiersByGbToStripeIDs).forEach(([k, v]) => {
				const tierDUA = parseInt(k)
				if (currentDUA >= tierDUA) {
					highestTierMatch = tierDUA
				}
			})
		})

		setBillingTier(highestTierMatch)
	}, [tenantDataUnderAnalysis, tenantTierName])

	// Enumerate all account tiers
	// (Used to determine where to place the discrete stops for the ProductTierSelection slider).
	const pricingTiers = useMemo(() => {
		const pricingTiers = {}
		PricingAccounts(billingMode, billingTier, tenantTierName).forEach(
			(type) => {
				if (!type.tiersByGbToStripeIDs) {
					return
				}

				Object.entries(type.tiersByGbToStripeIDs).forEach(([k, v]) => {
					const prodKey = `${v}|${PricingBillingModeToStripe[billingMode]}`

					// Blank tiersByGbToStripeIDs values indicate free tiers
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
			}
		)
		return pricingTiers
	}, [pricingData, billingMode, billingTier, tenantTierName])

	// Normalize PricingAccountTypes
	// (Flattens all XXXByTier values into a pricing-tier-aligned feature/pricing matrix to be rendered by child components).
	const products = React.useMemo(() => {
		const accountTypesForChosenTier = PricingAccounts(
			billingMode,
			billingTier,
			tenantTierName
		)
		accountTypesForChosenTier.forEach((product) => {
			if (!product.tiersByGbToStripeIDs) {
				return
			}

			// console.log("------")
			// console.log("pricingAccount.name", pricingAccount.name)

			// Find the lowest tier for this account type with enough GB to satisfy current billingTier selection
			const tiersAsc: number[] = Object.keys(product.tiersByGbToStripeIDs)
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

			const lowestTierProductId = product.tiersByGbToStripeIDs[lowestTierIndex]
			const tierProdKey = `${lowestTierProductId}|${PricingBillingModeToStripe[billingMode]}`

			// Flatten ByTier values to match current tier
			Object.entries(product?.features || {}).forEach(
				([featureKey, featureVal]) => {
					if (!featureKey.endsWith("ByTier")) {
						return
					}

					const featureKeyNormalized = featureKey.replace("ByTier", "")
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

			// Populate the "go" action taken for each product when its CTA button is clicked
			product.goActionMethod = () => {
				if (purchaseEnabled) {
					if (product.freeTrialCode) {
						if (!axiosInstance) {
							console.error("No axiosInstance available for trial activation")
							return
						}

						setStripePriceIdToPurchase(`trial:${product.freeTrialCode}`)
						axiosInstance
							.post("/user/activate_trial", {
								tier: product.freeTrialCode,
							})
							.then(() => {
								toast({
									status: "success",
									title: `Welcome to Teleseer!`,
									description: `Your trial account has been activated`,
								})

								// Note - the active page will now automatically transition from our pricing dialog to home view thanks to our tenants websocket subscription
							})
							.catch((e) => {
								console.error(`Account trial activation failed: `, e)
								toast({
									status: "error",
									title: `Account trial activation failure`,
									description: `Please contact support if this issue persists.`,
								})
							})
							.finally(() => {
								setStripePriceIdToPurchase(null)
							})
					} else {
						setStripePriceIdToPurchase(product.priceId)
					}
					return
				}

				if (product.freeTrialCode) {
					return window.open(
						"https://go.teleseer.com/auth/register/trial",
						"_blank"
					)
				} else {
					return window.open("https://go.teleseer.com/auth/register", "_blank")
				}
			}

			// console.log("billingTier", billingTier)
			// console.log("pricingData", pricingData)
			// console.log("lowestTierProductId", lowestTierProductId)
			// console.log("pricingData[tierProdKey]", pricingData[tierProdKey])
		})

		// console.log("accountTypesForChosenTier", accountTypesForChosenTier)
		return accountTypesForChosenTier
	}, [
		billingMode,
		billingTier,
		tenantTierName,
		pricingData,
		purchaseEnabled,
		axiosInstance,
		toast,
	])

	return (
		<Stack
			as="section"
			w="100%"
			spacing={{ base: "5", md: "7" }}
			alignItems="center"
			mb={8}
		>
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
				}}
			/>
			<ProductTierSelection
				{...{
					pricingTiers,
					billingMode,
					setBillingMode,
					billingTier,
					setBillingTier,
				}}
			/>
			<ProductFeatures
				{...{
					billingMode,
					billingTier,
					products,
					stripePriceIdToPurchase,
				}}
			/>
		</Stack>
	)
}
