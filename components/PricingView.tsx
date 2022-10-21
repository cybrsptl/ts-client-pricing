import * as React from "react"
import {
	Box,
	Container,
	Flex,
	Stack,
	useBreakpointValue,
} from "@chakra-ui/react"
import PricingServices from "../constants/PricingData"
import { ProductCallToActionTable } from "./ProductCallToActionTable"
import { ProductFeaturesTable } from "./ProductFeaturesTable"
import { ProductOverviewTable } from "./ProductOverviewTable"

export const PricingView = () => {
	const isMobile = useBreakpointValue({ base: true, md: false })
	return (
		<Box as="section" bg="bg-surface">
			{/* <Stack
			spacing={{ base: "16", md: "24" }}
			shouldWrapChildren
			width="100%"
			bg="green"
		> */}
			{/* {isMobile ? (
				<Flex>
					{PricingServices.map((product, id) => (
						<Container px={{ base: "0" }} key={id} width="100%">
							<Stack spacing={{ base: "5", md: "7" }}>
								<ProductOverviewTable products={[product]} />
								<ProductFeaturesTable products={[product]} />
								<ProductCallToActionTable products={[product]} />
							</Stack>
						</Container>
					))}
				</Flex>
			) : ( */}
			{/* <Container px={{ base: "0", lg: "8" }} bg="red"> */}
			<Stack spacing={{ base: "5", md: "7" }} width="100%">
				<ProductOverviewTable products={PricingServices} />
				<ProductFeaturesTable products={PricingServices} />
				<ProductCallToActionTable products={PricingServices} />
			</Stack>
			{/* </Container> */}
			{/* )} */}
			{/* </Stack> */}
		</Box>
	)
}
