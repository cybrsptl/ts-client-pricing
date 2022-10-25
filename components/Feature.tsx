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
	if (key && key.endsWith("_by_tier")) {
		return <>{value}</>
	}

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
		if (React.isValidElement(value)) {
			return value
		}
		return <>WIP</>
		//	return <>{JSON.stringify(value)}</>
	}

	return <>{value}</>
}
