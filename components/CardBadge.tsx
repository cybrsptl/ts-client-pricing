import * as React from "react"
import { Flex, FlexProps, Text } from "@chakra-ui/react"

interface CardBadgeProps extends FlexProps {
	color?: string
	textColor?: string
}

export const CardBadge = (props: CardBadgeProps) => {
	const { children, color, textColor, ...flexProps } = props
	return (
		<Flex
			bg={color ?? "gray.500"}
			position="absolute"
			right="-72px"
			top="34px"
			// top={5}
			width="240px"
			transform="rotate(45deg)"
			py={1}
			justifyContent="center"
			alignItems="center"
			zIndex={9}
			{...flexProps}
		>
			<Text
				fontSize="xs"
				textTransform="uppercase"
				fontWeight="bold"
				letterSpacing="wider"
				color={textColor ?? "gray.800"}
			>
				{children}
			</Text>
		</Flex>
	)
}
