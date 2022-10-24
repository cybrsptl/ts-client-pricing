import * as React from "react"
import { MdGraphicEq } from "react-icons/md"
import {
	Box,
	Heading,
	Radio,
	RadioGroup,
	Slider,
	SliderFilledTrack,
	SliderMark,
	SliderThumb,
	SliderTrack,
	Stack,
	TableProps,
	Text,
} from "@chakra-ui/react"
import Card from "@common/components/Card"
import UserSubscriptionInfoCard from "@common/components/UserSubscriptionInfoCard"
import AppConfig from "@common/constants/AppConfig"
import { PricingServicesType } from "../constants/CustomPricingData"
import { PricingBillingMode } from "./PricingView"

interface ProductTierSelectionProps extends TableProps {
	billingMode: PricingBillingMode
	setBillingMode: (PricingBillingMode) => void
	billingTier: number
	setBillingTier: (int) => void
	products: PricingServicesType[]
}

export const ProductTierSelection = ({
	billingMode,
	setBillingMode,
	billingTier,
	setBillingTier,
	products,
}: ProductTierSelectionProps) => {
	// const tierLevels = useMemo(() => {
	// 	const levels = []
	// 	products.forEach((product) => {
	// 		if (!product.price_per_gb) {
	// 			return
	// 		}
	// 		object.keysproduct.price_per_gb.forEach()
	// 		levels[]
	// 	}
	// 		return levels
	// }, [products])

	const labelStyles = {
		mt: "4",
		ml: "-2.5",
		fontSize: "sm",
		minWidth: "4em",
	}

	return (
		<Card height="40">
			<Stack
				direction={["row"]}
				// alignItems="left"
				justifyContent="start"
				// spacing={[1, 2, 4]}
			>
				<Box flex=".3" textAlign="right" pr="8" mt="0">
					<Heading size="md" mb="8">
						Billing Plan:
					</Heading>
					<Text size="lg">Data to analyze:</Text>
				</Box>
				{/* <Box flex=".5">
					<UserSubscriptionInfoCard />
				</Box> */}
				<Box flex=".5">
					<RadioGroup
						value={billingMode}
						mb={6}
						onChange={setBillingMode}
						colorScheme="green"
					>
						<Stack spacing={4} direction="row">
							<Radio value={PricingBillingMode.MONTHLY}>Monthly</Radio>
							<Radio value={PricingBillingMode.ANNUAL}>Annual</Radio>
						</Stack>
					</RadioGroup>
					<Slider
						aria-label="slider-ex-6"
						onChange={(val) => setBillingTier(val)}
						value={billingTier}
						step={25}
						// min={1}
						ml={2}
						// pb="4"
						// height="8"
					>
						<SliderMark value={0} {...labelStyles}>
							0.1 GB
						</SliderMark>
						<SliderMark value={25} {...labelStyles}>
							10 GB
						</SliderMark>
						<SliderMark value={50} {...labelStyles}>
							20 GB
						</SliderMark>
						<SliderMark value={75} {...labelStyles}>
							200 GB
						</SliderMark>
						<SliderMark value={100} {...labelStyles}>
							1k GB
						</SliderMark>
						{/* <SliderMark
							value={billingTier}
							textAlign="center"
							bg="green.500"
							color="white"
							mt="-10"
							ml="-5"
							w="12"
						>
							{billingTier}%
						</SliderMark> */}
						<SliderTrack bg="green.100">
							<SliderFilledTrack bg="green.500" />
						</SliderTrack>
						<SliderThumb
							boxSize={6}
							// ml="-2"
						>
							<Box color="green.500" as={MdGraphicEq} />
						</SliderThumb>
					</Slider>
				</Box>
			</Stack>
		</Card>
		// <Box pt={6} pb={2} width="50%" margin="auto">

		// </Box>
	)
}
