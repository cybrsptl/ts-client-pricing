import * as React from "react"
import {
	Badge,
	HStack,
	Heading,
	Stack,
	Table,
	TableProps,
	Tbody,
	Td,
	Text,
	Thead,
	Tr,
	VStack,
} from "@chakra-ui/react"
import { PricingAccountForTierType } from "../constants/CustomPricingData"

interface ProductOverviewTableProps extends TableProps {
	products: PricingAccountForTierType[]
}

export const ProductOverviewTable = (props: ProductOverviewTableProps) => {
	const { products, ...tableProps } = props
	return (
		<Table sx={{ tableLayout: "fixed" }} {...tableProps}>
			<Thead>
				<Tr>
					{products.length > 1 && <Td />}
					{products.map((product, id) => (
						<Td key={id} fontSize="xl" fontWeight="semibold">
							<VStack width="100%" justifyContent={"space-around"}>
								{product.isPopular && (
									<Badge colorScheme="green">Popular</Badge>
								)}
								<Text>{product.name}</Text>
							</VStack>
						</Td>
					))}
				</Tr>
			</Thead>
			<Tbody>
				<Tr>
					{products.length > 1 && <Td borderBottomWidth="0px" />}
					{products.map((product, id) => (
						<Td
							key={id}
							whiteSpace="normal"
							borderBottomWidth="0px"
							justifyContent="center"
							style={{ textAlign: "center" }}
						>
							{/* <Stack spacing="6">
								<Stack spacing="4"> */}
							{/* {product?.price_per_gb && (
										<Stack direction="row" align="baseline" spacing="1">
											<Heading size="lg" color="default">
												{product.price}
											</Heading>
											<Text fontWeight="medium" fontSize="medium" color="muted">
												/mo
											</Text>
										</Stack>
									)} */}

							<Text
								color="muted"
								fontSize="sm"
								whiteSpace="normal"
								// fontStyle={"italic"}
							>
								{product.description}
							</Text>
							{/* </Stack>
							</Stack> */}
						</Td>
					))}
				</Tr>
			</Tbody>
		</Table>
	)
}
