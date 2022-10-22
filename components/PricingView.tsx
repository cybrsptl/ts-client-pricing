import * as React from "react"
import { Box, Stack } from "@chakra-ui/react"
import PricingServices from "../constants/PricingData"
import { ProductCallToActionTable } from "./ProductCallToActionTable"
import { ProductFeaturesTable } from "./ProductFeaturesTable"
import { ProductOverviewTable } from "./ProductOverviewTable"
import { ProductTierSlider } from "./ProductTierSlider"

export const PricingView = () => {
	return (
		<Box as="section" bg="bg-surface">
			<Stack spacing={{ base: "5", md: "7" }} width="100%" mb={8}>
				<ProductTierSlider products={PricingServices} />
				<ProductOverviewTable products={PricingServices} />
				<ProductFeaturesTable products={PricingServices} />
				<ProductCallToActionTable products={PricingServices} />
			</Stack>
		</Box>
	)
}
