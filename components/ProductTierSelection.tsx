import { useMemo } from "react"
import {
	Box,
	Heading,
	Slider,
	SliderFilledTrack,
	SliderMark,
	SliderThumb,
	SliderTrack,
	TableProps,
	Text,
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
	...containerProps
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

	const labelStyles = {
		mt: "4",
		ml: "-2.5",
		fontSize: "xs",
		minWidth: "4em",
	}

	return (
		<Box w="100%" maxWidth="800px" py={4} px={4} {...containerProps}>
			<Heading fontSize={20} textAlign="center" mb={2}>
				Data under analysis (DUA)
			</Heading>
			<Text textAlign={"center"} mb={6}>
				DUA is the total uncompressed amount of data we’ve analyzed and stored.
				<br />
				You can free up space by deleting uploaded projects and data.
			</Text>
			<Box mx={8}>
				<Slider
					min={0}
					max={accountTierSliderIntervalCount - 1}
					onChange={(val) => setBillingTier(accountTierSliderIntervals[val])}
					value={accountTierSliderIntervals.findIndex((v) => v == billingTier)}
					step={1}
					ml={2}
					mb={12}
				>
					{accountTierSliderIntervals.map((tier, index) => (
						<SliderMark value={index} {...labelStyles} key={index}>
							{Number(tier).toLocaleString()}
						</SliderMark>
					))}
					{/* <SliderMark
							value={billingTier}
							textAlign="center"
							bg="blue.500"
							color="white"
							mt="-10"
							ml="-5"
							w="12"
						>
							{billingTier}%
						</SliderMark> */}
					<SliderTrack bg="theme-hilight">
						<SliderFilledTrack bg="theme-hilight_dark" />
					</SliderTrack>
					<SliderThumb
						boxSize={6}
						bg="theme-hilight_dark"
						color="theme-text-bright"
						px={4}
						whiteSpace="pre"
						width={16}
						fontSize="xs"
						fontWeight="bold"
					>
						{billingTier >= 1000
							? billingTier / 1000 + " TB"
							: billingTier + " GB"}
						{/* <Box color="blue.500" as={MdGraphicEq} /> */}
						{/* <Logo color="blue.500" logoStyle="symbol" height={24} /> */}
					</SliderThumb>
				</Slider>
			</Box>
		</Box>
	)
}
