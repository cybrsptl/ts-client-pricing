import * as React from "react"
import { FiCheck, FiMinus } from "react-icons/fi"
import { Icon } from "@chakra-ui/react"

interface FeatureProps {
	value: string | number | boolean | object
}

export const Feature = (props: FeatureProps) => {
	if (typeof props.value === "boolean") {
		return (
			<Icon
				as={props.value ? FiCheck : FiMinus}
				boxSize="6"
				color={props.value ? "accent" : "subtle"}
			/>
		)
	}

	if (typeof props.value === "object") {
		return <>{JSON.stringify(props.value)}</>
	}

	return <>{props.value}</>
}
