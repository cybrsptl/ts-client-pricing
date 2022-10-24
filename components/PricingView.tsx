import * as React from "react"
import { Box, Stack } from "@chakra-ui/react"
import PricingServices from "../constants/PricingData"
import { ProductCallToActionTable } from "./ProductCallToActionTable"
import { ProductFeaturesTable } from "./ProductFeaturesTable"
import { ProductOverviewTable } from "./ProductOverviewTable"
import { ProductTierSelection } from "./ProductTierSelection"

export enum PricingBillingMode {
	MONTHLY = "MONTHLY",
	ANNUAL = "ANNUAL",
}

export const PricingView = () => {
	const [billingMode, setBillingMode] = React.useState<PricingBillingMode>(
		PricingBillingMode.ANNUAL
	)
	const [billingTier, setBillingTier] = React.useState(0)
	const products = PricingServices

	return (
		<Box as="section" bg="bg-surface">
			<Stack spacing={{ base: "5", md: "7" }} width="100%" mb={8}>
				<ProductTierSelection
					{...{
						products,
						billingMode,
						setBillingMode,
						billingTier,
						setBillingTier,
					}}
				/>
				<ProductOverviewTable products={PricingServices} />
				<ProductCallToActionTable
					products={PricingServices}
					marginTop="0px important"
				/>
				<ProductFeaturesTable products={PricingServices} />
				<ProductCallToActionTable products={PricingServices} />
			</Stack>
		</Box>
	)
}
