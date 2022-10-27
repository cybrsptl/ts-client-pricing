import * as React from "react"
import { FiCheck } from "react-icons/fi"
import {
	Box,
	HStack,
	List,
	ListIcon,
	ListItem,
	ListItemProps,
	ListProps,
} from "@chakra-ui/react"

export const PricingList = ({ children, ...props }: ListProps) => (
	<List spacing={2} textAlign="left" fontSize="sm" {...props}>
		{children}
	</List>
)

export const PricingListItem = ({ children, ...props }: ListItemProps) => (
	<ListItem {...props}>
		<HStack>
			<Box>
				<ListIcon as={FiCheck} color="green.500" />
			</Box>
			<Box>{children}</Box>
		</HStack>
	</ListItem>
)
