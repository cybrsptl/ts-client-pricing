import * as React from "react"
import { FiInfo } from "react-icons/fi"
import {
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
import PricingAccounts, {
	PricingFeatures,
} from "../constants/CustomPricingData"
import { PricingBillingMode } from "../constants/PricingConstants"
import { Feature } from "./Feature"

interface ProductFeaturesTableProps extends TableProps {
	billingMode: PricingBillingMode
	billingTier: number
}

export const ProductFeaturesTable = (props: ProductFeaturesTableProps) => {
	const { billingMode, billingTier, ...tableProps } = props

	return (
		<>
			{PricingFeatures.map((feature, featureId) => (
				<Table
					key={featureId}
					sx={{ tableLayout: "fixed" }}
					variant="striped"
					{...tableProps}
				>
					<Thead>
						<Tr>
							<Th
								colSpan={PricingAccounts.length + 1}
								color="accent"
								fontSize="sm"
								borderColor="green.500"
							>
								{feature.category}
							</Th>
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
								{PricingAccounts.map((product, id) => (
									<Td
										key={id}
										// textAlign={
										// 	"center"
										// 	// PricingAccountTypes.length > 1 ? "center" : "right"
										// }
										style={{ textAlign: "center" }}
										height="16"
										color="muted"
									>
										<Feature
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
			))}
		</>
	)
}
