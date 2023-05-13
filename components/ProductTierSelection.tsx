import { useMemo } from "react"
import { MdGraphicEq } from "react-icons/md"
import { ThemeColor } from "utils/theme"
import {
	Box,
	Divider,
	Heading,
	Slider,
	SliderFilledTrack,
	SliderMark,
	SliderThumb,
	SliderTrack,
	Stack,
	TableProps,
	Text,
} from "@chakra-ui/react"
import useIsMobile from "@common/hooks/useIsMobile"
import { PricingBillingMode } from "../constants/PricingConstants"

interface ProductTierSelectionProps extends TableProps {
	pricingTiers: object
	billingMode: PricingBillingMode
	setBillingMode: (PricingBillingMode) => void
	billingTier: number
	setBillingTier: (int) => void
	theme: ThemeColor
}

export const ProductTierSelection = ({
	pricingTiers,
	billingMode,
	setBillingMode,
	billingTier,
	setBillingTier,
	theme,
	...containerProps
}: ProductTierSelectionProps) => {
	const isMobile = useIsMobile()

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
		<Box rounded="lg" p={{ base: "4", md: "4" }} mb={20} {...containerProps}>
			<Stack
				direction={isMobile ? "column" : "row"}
				alignItems="center"
				justifyContent="center"
			>
				<Box flex=".75" width={{ base: 300, lg: 350 }}>
					<Heading fontSize={20} textAlign="center" mb={2}>
						Data under analysis (DUA)
					</Heading>
					<Text textAlign={"center"} mb={6}>
						DUA is the total uncompressed amount of data we’ve analyzed and
						stored. <br />
						You can free up space by deleting uploaded projects and data.
					</Text>
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
						mb={12}
					>
						{accountTierSliderIntervals.map((tier, index) => (
							<SliderMark value={index} {...labelStyles} key={index}>
								{tier}
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
						<SliderTrack bg="blue.100">
							<SliderFilledTrack bg="blue.500" />
						</SliderTrack>
						<SliderThumb
							boxSize={6}
							// ml="-2"
						>
							<Box color="blue.500" as={MdGraphicEq} />
							{/* <Logo color="blue.500" logoStyle="symbol" height={24} /> */}
						</SliderThumb>
					</Slider>
				</Box>
			</Stack>
			<Divider
				width="100%"
				color={"red"}
				height="10px"
				orientation="horizontal"
			/>
		</Box>
	)
}
