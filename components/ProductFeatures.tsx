import * as React from "react"
import { FiInfo } from "react-icons/fi"
import {
	Box,
	Flex,
	HStack,
	Icon,
	Table,
	TableProps,
	Tbody,
	Td,
	Text,
	Th,
	Thead,
	Tooltip,
	Tr,
} from "@chakra-ui/react"
import { PricingFeatures } from "../constants/CustomPricingData"
import { PricingBillingMode } from "../constants/PricingConstants"
import { PricingAccountForTierType } from "../constants/PricingTypes"
import { PricingFeature } from "./PricingFeature"

interface ProductFeaturesProps extends TableProps {
	billingMode: PricingBillingMode
	billingTier: number
	products: PricingAccountForTierType[]
}

export const ProductFeatures = (props: ProductFeaturesProps) => {
	const { billingMode, billingTier, products, ...tableProps } = props

	return (
		<>
			{PricingFeatures.map((feature, featureId) => (
				<Box key={featureId} w="100%" overflowX="auto">
					<Table
						// sx={{ tableLayout: "fixed" }}
						variant="striped"
						{...tableProps}
					>
						<Thead>
							<Tr>
								<Th
									// colSpan={products.length + 1}
									color="accent"
									fontSize="sm"
									borderColor="blue.800"
									width="33%"
								>
									{feature.category}
								</Th>
								{products.map((product, id) => (
									<Th
										key={id}
										style={{ textAlign: "center" }}
										borderColor="blue.800"
										color="muted"
										width={`${(100 - 33) / products.length}%`}
									>
										{product.name}
									</Th>
								))}
							</Tr>
						</Thead>
						<Tbody>
							{feature.items.map((item, id) => (
								<Tr key={id}>
									<Td fontWeight="semibold">
										<HStack spacing="1">
											<Text fontWeight="semibold">{item.name}</Text>
											{item.tooltip && (
												<Tooltip label={item.tooltip} placement="bottom-start">
													<Flex justify="center">
														<Icon
															as={FiInfo}
															boxSize="4"
															color="muted"
															alignSelf="bottom"
														/>
													</Flex>
												</Tooltip>
											)}
										</HStack>
									</Td>
									{products.map((product, id) => (
										<Td
											key={id}
											style={{ textAlign: "center" }}
											height="16"
											color="muted"
										>
											<PricingFeature
												key={item.key}
												value={product.features[item.key]}
												{...{ billingMode, billingTier }}
											/>
										</Td>
									))}
								</Tr>
							))}
						</Tbody>
					</Table>
				</Box>
			))}
		</>
	)
}
