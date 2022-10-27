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
import { PricingFeatures } from "../constants/CustomPricingData"
import { PricingBillingMode } from "../constants/PricingConstants"
import { PricingAccountForTierType } from "../constants/PricingTypes"
import { PricingFeature } from "./PricingFeature"

interface ProductFeaturesTableProps extends TableProps {
	billingMode: PricingBillingMode
	billingTier: number
	accountTypesForChosenTier: PricingAccountForTierType[]
}

export const ProductFeaturesTable = (props: ProductFeaturesTableProps) => {
	const { billingMode, billingTier, accountTypesForChosenTier, ...tableProps } =
		props

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
								colSpan={accountTypesForChosenTier.length + 1}
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
								{accountTypesForChosenTier.map((product, id) => (
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
			))}
		</>
	)
}
