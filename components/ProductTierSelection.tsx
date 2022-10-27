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
	useColorModeValue,
} from "@chakra-ui/react"
import { PricingBillingMode } from "../constants/PricingConstants"

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
		<Box
			bg={useColorModeValue("white", "theme_accent")}
			// shadow="base"
			rounded="lg"
			p={{ base: "4", md: "8" }}
			mb={20}
		>
			<Stack
				direction={["row"]}
				// alignItems="left"
				justifyContent="start"
				// spacing={[1, 2, 4]}
			>
				<Box flex=".4" textAlign="right" pr="8" mt="0">
					<Heading size="md" mb="8">
						Billing Plan:
					</Heading>
					<Text size="lg">Data Under Analysis (GB):</Text>
				</Box>
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
					<Text fontSize="xs" mt={8}>
						* Data Under Analysis (DUA) is the total uncompressed amount of data
						that Teleseer has processed and stored for your account. You can
						free up space by deleting uploaded data files. Projects do not count
						towards your quota.
					</Text>
				</Box>
			</Stack>
		</Box>
	)
}
