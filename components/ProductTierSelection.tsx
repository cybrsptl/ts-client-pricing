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
import AppConfig from "@common/constants/AppConfig"
import PricingAccountTypes from "../constants/CustomPricingData"
import {
	PricingBillingMode,
	PricingBillingModeToStripe,
} from "../constants/PricingConstants"
import { PricingDataDev, PricingDataProd } from "../constants/StripePricingData"

interface ProductTierSelectionProps extends TableProps {
	billingMode: PricingBillingMode
	setBillingMode: (PricingBillingMode) => void
	billingTier: number
	setBillingTier: (int) => void
}

export const ProductTierSelection = ({
	billingMode,
	setBillingMode,
	billingTier,
	setBillingTier,
}: ProductTierSelectionProps) => {
	const { activeTenant } = useTenants()
	const PricingData = AppConfig.stripe_test_mode
		? PricingDataDev
		: PricingDataProd

	const {
		accountTiers,
		accountTierSliderIntervalCount,
		accountTierSliderIntervals,
	} = useMemo(() => {
		const accountTiers = {}
		PricingAccountTypes.forEach((type) => {
			if (!type.tiers_by_gb) {
				return
			}
			Object.entries(type.tiers_by_gb).forEach(([k, v]) => {
				const prodKey = `${v}|${PricingBillingModeToStripe[billingMode]}`

				// Blank tiers_by_gb values indicate free tiers
				if (!v) {
					accountTiers[k] = null
					return
				}

				if (!PricingData[prodKey]) {
					console.warn(
						"ProductTierSelection :: No pricing data found for ",
						prodKey
					)
					return
				}
				accountTiers[k] = PricingData[prodKey]
			})
		})

		const accountTierSliderIntervals = Object.keys(accountTiers).sort(
			(a, b) => parseFloat(a) - parseFloat(b)
		)
		const accountTierSliderIntervalCount = accountTierSliderIntervals.length

		return {
			accountTiers,
			accountTierSliderIntervals,
			accountTierSliderIntervalCount,
		}
	}, [PricingData, billingMode])

	console.log(accountTiers)

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
						onChange={(val) => setBillingTier(val)}
						value={billingTier}
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
						</SliderThumb>
					</Slider>
				</Box>
			</Stack>
		</Card>
		// <Box pt={6} pb={2} width="50%" margin="auto">

		// </Box>
	)
}
