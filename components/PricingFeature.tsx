import * as React from "react"
import { FiCheck, FiDollarSign, FiMinus } from "react-icons/fi"
import { Icon } from "@chakra-ui/react"
import { PricingBillingMode } from "../constants/PricingConstants"

interface PricingFeatureProps {
	key?: string
	value: string | number | boolean | object
	billingMode?: PricingBillingMode
	billingTier?: number
}

export const PricingFeature = ({ value }: PricingFeatureProps) => {
	if (typeof value === "boolean") {
		return (
			<Icon
				as={value ? FiCheck : FiMinus}
				boxSize="6"
				color={value ? "accent" : "subtle"}
			/>
		)
	}

	if (value === "$") {
		return <Icon as={FiDollarSign} boxSize="5" color={"subtle"} />
	}

	if (typeof value === "object") {
		console.log("Product feature object value", value)
		console.log("React.isValidElement", React.isValidElement(value))
		if (React.isValidElement(value)) {
			return value
		}

		return <>{value}</>
	}

	return <>{value}</>
}
