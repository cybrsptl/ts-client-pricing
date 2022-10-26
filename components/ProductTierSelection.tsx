import * as React from "react"
import { useMemo } from "react"
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
import { useTenants } from "@common/components/AppTenantsProvider"
import Card from "@common/components/Card"
import Logo from "@common/components/Logo"
import AppConfig from "@common/constants/AppConfig"
import PricingAccounts from "../constants/CustomPricingData"
import {
	PricingBillingMode,
	PricingBillingModeToStripe,
} from "../constants/PricingConstants"
import { PricingDataDev, PricingDataProd } from "../constants/StripePricingData"

interface ProductTierSelectionProps extends TableProps {
	pricingTiers: object
	billingMode: PricingBillingMode
	setBillingMode: (PricingBillingMode) => void
	billingTier: number
	setBillingTier: (int) => void
}

export const ProductTierSelection = ({
	pricingTiers,
	billingMode,
	setBillingMode,
	billingTier,
	setBillingTier,
}: ProductTierSelectionProps) => {
	const { accountTierSliderIntervalCount, accountTierSliderIntervals } =
		useMemo(() => {
			const accountTierSliderIntervals = Object.keys(pricingTiers)
				.sort((a, b) => parseFloat(a) - parseFloat(b))
				.map((k) => parseFloat(k))
			const accountTierSliderIntervalCount = accountTierSliderIntervals.length

			return {
				accountTierSliderIntervals,
				accountTierSliderIntervalCount,
			}
		}, [pricingTiers])

	// console.log("billingTier", billingTier)
	// console.log("accountTierSliderIntervals", accountTierSliderIntervals)

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
					<Text size="lg">Data to analyze (GB):</Text>
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
						min={0}
						max={accountTierSliderIntervalCount - 1}
						aria-label="slider-ex-6"
						onChange={(val) => setBillingTier(accountTierSliderIntervals[val])}
						value={accountTierSliderIntervals.findIndex(
							(v) => v == billingTier
						)}
						step={1}
						ml={2}
						// pb="4"
						// height="8"
					>
						{accountTierSliderIntervals.map((tier, index) => (
							<SliderMark value={index} {...labelStyles} key={index}>
								{tier}
							</SliderMark>
						))}
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
							{/* <Logo color="green.500" logoStyle="symbol" height={24} /> */}
						</SliderThumb>
					</Slider>
				</Box>
			</Stack>
		</Card>
		// <Box pt={6} pb={2} width="50%" margin="auto">

		// </Box>
	)
}
