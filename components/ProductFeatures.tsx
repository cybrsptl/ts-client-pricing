import * as React from "react"
import { FiInfo } from "react-icons/fi"
import {
	Box,
	Button,
	Center,
	Flex,
	HStack,
	Heading,
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
import { ButtonStyle, ThemeColor, colors } from "@common/utils/theme"
import { PricingFeatures } from "../constants/CustomPricingData"
import { PricingBillingMode } from "../constants/PricingConstants"
import { PricingAccountForTierType } from "../constants/PricingTypes"
import { PricingFeature } from "./PricingFeature"

interface ProductFeaturesProps extends TableProps {
	billingMode: PricingBillingMode
	billingTier: number
	products: PricingAccountForTierType[]
	theme: ThemeColor
}

export const ProductFeatures = (props: ProductFeaturesProps) => {
	const { billingMode, billingTier, products, theme, ...tableProps } = props

	const cellColor = {
		starter: "cell_light",
		pro: "cell_blue",
		team: "cell_dark",
	}

	const tableWrapperOuter = {
		width: "1000px",
		maxWidth: "100vw",
	}

	const tableWrapperInner = {
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
		backgroundColor: `${colors.bg_lighter} !important`,
		left: "0px",
		zIndex: 1,
	}

	return (
		<>
			<Heading fontSize={36} fontWeight={500} textAlign="center" mb={12}>
				Compare features
			</Heading>

			<Center>
				<Box sx={tableWrapperOuter}>
					<Box sx={tableWrapperInner}>
						<Table variant="striped" {...tableProps}>
							<Thead>
								{/* Tier columns - Starter / Pro / Etc */}
								<Tr>
									<Td sx={stickyColumnWidth}>&nbsp;</Td>
									{products.map((product, id) => (
										<Td key={id} style={{ textAlign: "center" }} color="muted">
											<VStack pt={4}>
												<Text fontSize={24} fontWeight={500}>
													{product.tierShort["title"]}
												</Text>
												<Text>{product.tierShort["subtitle"]}</Text>

												<Text>
													{product.pricePerMonth ? (
														<>
															${product.pricePerMonth.toLocaleString()} per
															month
														</>
													) : (
														<>&nbsp;</>
													)}
												</Text>
												<a
													href={"http://go.teleseer.com"}
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
							</Thead>
							<Tbody>
								{/* Feature sections - Resources/Telemetry Ingest/etc */}
								{PricingFeatures.map((feature, featureId) => (
									<>
										<Tr>
											<Th
												// colSpan={products.length + 1}
												color={theme.text}
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
														borderBottomColor={theme.lightButtonBorder}
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
			</Center>
		</>
	)
}
