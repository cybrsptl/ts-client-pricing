import * as React from "react"
import {
	Badge,
	Box,
	Flex,
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
import { PricingBillingMode } from "../constants/PricingConstants"
import { PricingAccountForTierType } from "../constants/PricingTypes"

interface ProductOverviewTableProps extends TableProps {
	products: PricingAccountForTierType[]
	billingMode: PricingBillingMode
	billingTier: number
}

export const ProductOverviewTable = (props: ProductOverviewTableProps) => {
	const { products, billingMode, billingTier, ...tableProps } = props
	return (
		<Table sx={{ tableLayout: "fixed" }} {...tableProps}>
			<Thead>
				<Tr>
					{products.length > 1 && <Td />}
					{products.map((product, id) => (
						<Td
							key={id}
							fontSize="xl"
							fontWeight="semibold"
							verticalAlign="bottom"
						>
							<VStack width="100%" justifyContent={"space-around"}>
								{product.isPopular && (
									<Badge colorScheme="green">Popular</Badge>
								)}
								{product.isComingSoon && (
									<Badge colorScheme="gray">Coming Soon</Badge>
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
							{!product.isBelowDesiredLimits && product.pricePerMonth && (
								<>
									<Flex
										direction="row"
										align="baseline"
										justifyContent="space-between"
									>
										<Heading size="lg" color="default">
											${product.pricePerMonth.toLocaleString()}
										</Heading>
										<Box fontSize="sm" color="muted">
											/mo
										</Box>
									</Flex>
									{product.pricePerMonth && product.dataInGB && (
										<Flex
											direction="row"
											align="baseline"
											justifyContent="space-between"
										>
											<Heading size="sm" color="default" ml={3}>
												$
												{(product.pricePerMonth / product.dataInGB)
													.toFixed(2)
													.toLocaleString()}
											</Heading>
											<Box fontSize="sm" color="muted">
												/GB
											</Box>
										</Flex>
									)}
								</>
							)}
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

							<Box color="muted" whiteSpace="normal">
								{product.isBelowDesiredLimits ? (
									<Text fontSize="xs" fontStyle="italic">
										(Insufficient for {billingTier} GB analysis workloads)
									</Text>
								) : product.annualBillingOnly ? (
									<i>Annual billing only.</i>
								) : (
									<i>{product.description}</i>
								)}
							</Box>
							{/* </Stack>
							</Stack> */}
						</Td>
					))}
				</Tr>
			</Tbody>
		</Table>
	)
}
