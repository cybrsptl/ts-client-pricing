import * as React from "react"
import { Box, Stack } from "@chakra-ui/react"
import PricingAccountTypes from "../constants/CustomPricingData"
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
	const products = PricingAccountTypes

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
				<ProductOverviewTable products={PricingAccountTypes} />
				<ProductCallToActionTable
					products={PricingAccountTypes}
					marginTop="0px important"
				/>
				<ProductFeaturesTable products={PricingAccountTypes} />
				<ProductCallToActionTable products={PricingAccountTypes} />
			</Stack>
		</Box>
	)
}
