import * as React from "react"
import { Flex, FlexProps, Text } from "@chakra-ui/react"

export const CardBadge = (props: FlexProps) => {
	const { children, ...flexProps } = props
	return (
		<Flex
			bg={"green.500"}
			position="absolute"
			right={-20}
			top={6}
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
