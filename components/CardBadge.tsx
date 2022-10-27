import * as React from "react"
import { Flex, FlexProps, Text } from "@chakra-ui/react"

interface CardBadgeProps extends FlexProps {
	colorScheme?: string
}

export const CardBadge = (props: CardBadgeProps) => {
	const { children, colorScheme, ...flexProps } = props
	return (
		<Flex
			bg={colorScheme === "green" ? "green.500" : "gray.500"}
			position="absolute"
			right="-88px"
			top={5}
			width="240px"
			transform="rotate(45deg)"
			py={1}
			justifyContent="center"
			alignItems="center"
			{...flexProps}
		>
			<Text
				fontSize="xs"
				textTransform="uppercase"
				fontWeight="bold"
				letterSpacing="wider"
				colorScheme="green"
				// color={"white" "gray.800")}
			>
				{children}
			</Text>
		</Flex>
	)
}
