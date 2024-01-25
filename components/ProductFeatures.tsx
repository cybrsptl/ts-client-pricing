import {
	Box,
	Button,
	Flex,
	HStack,
	Heading,
	Icon,
	Table,
	Tbody,
	Td,
	Text,
	Th,
	Thead,
	Tooltip,
	Tr,
	VStack,
} from "@chakra-ui/react"
import { FiInfo } from "react-icons/fi"

import { PricingFeature } from "./PricingFeature"
import { PricingFeatures } from "../constants/CustomPricingData"
import { CustomButtonStyles } from "../constants/CustomStyles"
import { PricingBillingMode } from "../constants/PricingConstants"
import { PricingAccountType } from "../constants/PricingTypes"

interface ProductFeaturesProps {
	billingMode: PricingBillingMode
	billingTier: number
	products: PricingAccountType[]
	stripePriceIdToPurchase?: string
}

export const ProductFeatures = (props: ProductFeaturesProps) => {
	const { billingMode, billingTier, products, stripePriceIdToPurchase } = props

	const cellColor = {
		pro: "cell_blue",
	}

	const tableWrapper = {
		position: "relative",
		overflowX: "auto",
		whiteSpace: "nowrap",
	}

	const stickyColumnWidth = {
		minWidth: "100px",
		maxWidth: "300px",
	}

	const stickyColumn = {
		...stickyColumnWidth,
		position: "sticky",
		backgroundColor: `theme-bg !important`,
		left: "0px",
		zIndex: 1,
	}

	return (
		<>
			<Heading fontSize={36} fontWeight={500} textAlign="center" mb={12}>
				Compare features
			</Heading>

			<Box sx={{ w: "100%" }}>
				<Box sx={tableWrapper}>
					<Table
						variant="unstyled"
						sx={{
							th: { fontSize: "lg" },
							tr: {
								td: {
									border: "none",
									paddingTop: "0px",
									paddingBottom: "0px",
								},
							},
						}}
					>
						<Thead>
							{/* Tier columns - Starter / Pro / Etc */}
							<Tr>
								<Td sx={stickyColumnWidth}>&nbsp;</Td>
								{products.map((product, id) => (
									<Td key={id} style={{ textAlign: "center" }} color="muted">
										<VStack pt={4}>
											<Box fontSize={24} fontWeight={500}>
												{product.tierShort["title"]}
											</Box>

											<Box>{product.tierShort["subtitle"]}</Box>

											<Box pt={2} pb={4}>
												{product.pricePerMonth ? (
													<>
														${product.pricePerMonth.toLocaleString()} per month
													</>
												) : (
													<>&nbsp;</>
												)}
											</Box>

											<Button
												onClick={product.goActionMethod}
												variant="outline"
												size="xs"
												sx={{
													height: 8,
													px: 6,
													...{
														textDecoration: "none",
														marginTop: "1rem",
													},
													...(product.goButtonStyle ??
														CustomButtonStyles.white),
												}}
												isDisabled={product.isDisabled}
												isLoading={!!stripePriceIdToPurchase}
											>
												{product.tierShort["go"] ?? product.go}
											</Button>
										</VStack>
									</Td>
								))}
							</Tr>
						</Thead>
						<Tbody>
							{/* Feature sections - Resources/Telemetry Ingest/etc */}
							{PricingFeatures.map((feature, featureId) => (
								<>
									<Tr>
										<Th
											// colSpan={products.length + 1}
											color="section_color_dark"
											fontSize="sm"
											borderColor="blue.800"
											border="none"
											pt={[4, 8]}
											sx={stickyColumn}
										>
											{feature.category}
										</Th>
										{products.map((product, index) => (
											<Th
												key={index}
												style={{ textAlign: "center" }}
												color="muted"
												// width={`${(100 - 33) / products.length}%`}
												border="none"
												pt={[4, 8]}
											>
												<Box
													px="10px"
													borderBottom="1px solid"
													borderBottomColor="section_color_dark"
													opacity=".2"
													lineHeight={"1px"}
												>
													&nbsp;
												</Box>
											</Th>
										))}
									</Tr>

									{/* Feature row heading cells - Project Downloads/SSO/etc */}
									{feature.items.map((item, index) => (
										<Tr key={index}>
											<Td sx={stickyColumn}>
												<HStack spacing="1" alignItems={"center"} pt={4}>
													<Text noOfLines={1}>{item.name}</Text>
													{item.tooltip && (
														<Tooltip
															label={item.tooltip}
															placement="bottom-start"
														>
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

											{/* Feature cell values - 2GB/Unlimited/✔/etc */}
											{products.map((product, id) => (
												<Td
													key={id}
													style={{ textAlign: "center" }}
													color="muted"
												>
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
																	? product.features[feature.sectionKey][
																			item.key
																	  ] ?? product.features[item.key]
																	: false
															}
															{...{ billingMode, billingTier }}
														/>
													</Box>
												</Td>
											))}
										</Tr>
									))}
								</>
							))}
						</Tbody>
					</Table>
				</Box>
			</Box>
		</>
	)
}
