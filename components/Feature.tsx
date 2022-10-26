import * as React from "react"
import { FiCheck, FiMinus } from "react-icons/fi"
import { Icon } from "@chakra-ui/react"
import { PricingBillingMode } from "../constants/PricingConstants"

interface FeatureProps {
	key?: string
	value: string | number | boolean | object
	billingMode?: PricingBillingMode
	billingTier?: number
}

export const Feature = ({
	key,
	value,
	billingMode,
	billingTier,
}: FeatureProps) => {
	// if (key && key.endsWith("ByTier")) {
	// 	return <>{value}</>
	// }

	if (typeof value === "boolean") {
		return (
			<Icon
				as={value ? FiCheck : FiMinus}
				boxSize="6"
				color={value ? "accent" : "subtle"}
			/>
		)
	}

	if (typeof value === "object") {
		console.log("Product feature object value", value)
		console.log("React.isValidElement", React.isValidElement(value))
		if (React.isValidElement(value)) {
			return value
		}

		return <>{value}</>
		//	return <>{JSON.stringify(value)}</>
	}

	return <>{value}</>
}
