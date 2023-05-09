/* eslint-disable react/jsx-no-target-blank */
import * as React from "react"
import { FiInfo } from "react-icons/fi"
import {
	Box,
	Button,
	Flex,
	Heading,
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
	VStack,
} from "@chakra-ui/react"
import { PricingFeatures } from "../constants/CustomPricingData"
import { PricingBillingMode } from "../constants/PricingConstants"
import { PricingAccountForTierType } from "../constants/PricingTypes"
import { PricingFeature } from "./PricingFeature"
import { ButtonStyle, ThemeColor } from "utils/theme"
import useIsMobile from "@common/hooks/useIsMobile"

interface ProductFeaturesProps extends TableProps {
	billingMode: PricingBillingMode
	billingTier: number
	products: PricingAccountForTierType[]
	theme: ThemeColor
}

export const ProductFeatures = (props: ProductFeaturesProps) => {
	const isMobile = useIsMobile()
	const { billingMode, billingTier, products, theme, ...tableProps } = props

	const cellColor = {
		starter: "cell_light",
		pro: "cell_blue",
		team: "cell_dark",
	}

	return (
		<>
			<Heading fontSize={36} textAlign="center" mb={12}>
				Compare features
			</Heading>
			<Box w="100%" overflowX="auto">
				<Table
					// sx={{ tableLayout: "fixed" }}
					variant="striped"
					{...tableProps}
				>
					<Thead>
						<Tr>
							<Th width="25%" border="none"></Th>
							{products.map((product, index) => (
								<Th
									key={index}
									width={`${(100 - 33) / products.length}%`}
									border="none"
								/>
							))}
						</Tr>
					</Thead>
					<Tbody>
						<Tr>
							<Td></Td>
							{products.map((product, id) => (
								<Td key={id} style={{ textAlign: "center" }} color="muted">
									<VStack pt={4}>
										<Text fontSize={24} fontWeight={500}>
											{product.tierShort["title"]}
										</Text>
										<Text>{product.tierShort["subtitle"]}</Text>
										<Text>{product.tierShort[""]}cost</Text>
										<a
											href={"http://"}
											target="_blank"
											style={{
												textDecoration: "none",
												marginTop: "1rem",
											}}
										>
											<Button
												variant="outline"
												size="xs"
												borderRadius={16}
												height={8}
												px={6}
												sx={
													product.prodType === "starter"
														? ButtonStyle.white
														: product.prodType === "pro"
														? ButtonStyle.blue
														: ButtonStyle.dark
												}
											>
												{product.tierShort["go"]}
											</Button>
										</a>
									</VStack>
								</Td>
							))}
						</Tr>
					</Tbody>
				</Table>
			</Box>
			{PricingFeatures.map((feature, featureId) => (
				<Box key={featureId} w="100%" overflowX="auto" mt="1rem !important">
					<Table
						// sx={{ tableLayout: "fixed" }}
						variant="striped"
						{...tableProps}
					>
						<Thead>
							<Tr>
								<Th
									// colSpan={products.length + 1}
									color={theme.text}
									fontSize="sm"
									borderColor="blue.800"
									width="25%"
									border="none"
								>
									{feature.category}
								</Th>
								{products.map((product, index) => (
									<Th
										key={index}
										style={{ textAlign: "center" }}
										color="muted"
										width={`${(100 - 33) / products.length}%`}
										border="none"
									>
										<Box
											px="10px"
											borderBottom="1px solid"
											borderBottomColor={theme.lightButtonBorder}
											opacity=".2"
											lineHeight={"1px"}
										>
											&nbsp;
										</Box>
									</Th>
								))}
							</Tr>
						</Thead>
						<Tbody>
							{feature.items.map((item, index) => (
								<Tr key={index}>
									<Td>
										<HStack spacing="1" alignItems={"center"} pt={4}>
											<Text>{item.name}</Text>
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
										<Td key={id} style={{ textAlign: "center" }} color="muted">
											<Box
												pt={4}
												color={
													feature.category !== "Resources" &&
													cellColor[product.prodType]
												}
											>
												<PricingFeature
													key={item.key}
													value={
														product.features[feature.sectionKey]
															? product.features[feature.sectionKey][item.key]
															: false
													}
													{...{ billingMode, billingTier }}
												/>
											</Box>
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
