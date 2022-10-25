import * as React from "react"
import { Box, Stack } from "@chakra-ui/react"
import { useTenantUsage } from "@common/components/AppTenantUsage"
import PricingAccountTypes from "../constants/CustomPricingData"
import { PricingBillingMode } from "../constants/PricingConstants"
import { ProductCallToActionTable } from "./ProductCallToActionTable"
import { ProductFeaturesTable } from "./ProductFeaturesTable"
import { ProductOverviewTable } from "./ProductOverviewTable"
import { ProductTierSelection } from "./ProductTierSelection"

export const PricingView = () => {
	const { usage } = useTenantUsage()
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
