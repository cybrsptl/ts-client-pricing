import * as React from "react"
import { MdGraphicEq } from "react-icons/md"
import {
	Box,
	Slider,
	SliderFilledTrack,
	SliderMark,
	SliderThumb,
	SliderTrack,
	TableProps,
} from "@chakra-ui/react"
import { PricingServicesType } from "../constants/PricingData"

interface ProductTierSliderProps extends TableProps {
	products: PricingServicesType[]
}

export const ProductTierSlider = (props: ProductTierSliderProps) => {
	const { products } = props

	const [sliderValue, setSliderValue] = React.useState(50)

	const labelStyles = {
		mt: "2",
		ml: "-2.5",
		fontSize: "sm",
	}

	return (
		<Box pt={6} pb={2} width="50%" margin="auto">
			<Slider
				aria-label="slider-ex-6"
				onChange={(val) => setSliderValue(val)}
				step={30}
			>
				<SliderMark value={25} {...labelStyles}>
					25%
				</SliderMark>
				<SliderMark value={50} {...labelStyles}>
					50%
				</SliderMark>
				<SliderMark value={75} {...labelStyles}>
					75%
				</SliderMark>
				<SliderMark
					value={sliderValue}
					textAlign="center"
					bg="green.500"
					color="white"
					mt="-10"
					ml="-5"
					w="12"
				>
					{sliderValue}%
				</SliderMark>
				<SliderTrack bg="green.100">
					<SliderFilledTrack bg="green.500" />
				</SliderTrack>
				<SliderThumb boxSize={6}>
					<Box color="green.500" as={MdGraphicEq} />
				</SliderThumb>
			</Slider>
		</Box>
	)
}
