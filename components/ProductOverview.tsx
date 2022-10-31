import * as React from "react"
import {
	Box,
	Button,
	HStack,
	Heading,
	TableProps,
	Text,
	VStack,
} from "@chakra-ui/react"
import { PricingBillingMode } from "../constants/PricingConstants"
import { PricingAccountForTierType } from "../constants/PricingTypes"
import { CardBadge } from "./CardBadge"
import { PricingList, PricingListItem } from "./PricingDescList"

interface ProductOverviewProps extends TableProps {
	products: PricingAccountForTierType[]
	billingMode: PricingBillingMode
	billingTier: number
	userEmail?: string
	tenantTierName?: string
	purchaseEnabled?: boolean
}

export const ProductOverview = (props: ProductOverviewProps) => {
	const {
		products,
		userEmail,
		billingTier,
		purchaseEnabled,
		...containerProps
	} = props

	return (
		<HStack
			spacing={8}
			width="100%"
			alignItems="top"
			justifyContent="center"
			pb={1}
			{...containerProps}
		>
			{products
				.filter((p) => !p.hideOverviewCard)
				.map((product, id) => (
					<Box key={id} flex="1">
						<Box
							bg={"theme_accent"}
							rounded="lg"
							sx={{
								textAlign: "center",
								overflow: "hidden",
								position: "relative",
								opacity:
									product.isDisabled ||
									product.isComingSoon ||
									product.isBelowDesiredLimits
										? 0.5
										: 1,
								cursor:
									product.isDisabled ||
									product.isComingSoon ||
									product.isBelowDesiredLimits
										? "not-allowed"
										: "auto",
							}}
							p={6}
							height="100%"
							borderRadius="lg"
							borderWidth="1px"
							borderColor={product.borderColor || "theme_hilight"}
						>
							<VStack width="100%" height="100%" justifyContent="space-between">
								<Box>
									{product.isPopular && (
										<CardBadge colorScheme="blue">Popular</CardBadge>
									)}
									{/* {product.isComingSoon && <CardBadge>Waitlist</CardBadge>} */}
									<Text
										fontSize="md"
										textTransform="uppercase"
										fontWeight="bold"
										letterSpacing="wider"
										height={8}
										paddingTop={2}
									>
										{product.name.replace(/[0-9]/g, "")}
									</Text>
									{product.pricePerMonth && (
										<>
											<Heading size="md" as="span" color="default" ml={4}>
												${product.pricePerMonth.toLocaleString()} per month
											</Heading>
											{/* <Text
												fontSize="sm"
												as="span"
												color="muted"
												fontWeight="bold"
												ml={1}
											>
												/mo
											</Text> */}
										</>
									)}
									{product.annualBillingOnly && (
										<Text fontSize="sm" fontStyle="italic" mt={3} mb={7}>
											Annual billing only.
										</Text>
									)}

									<Box color="muted" whiteSpace="normal" mt={6}>
										<PricingList mb={2}>
											<PricingListItem>
												<>{product.features.data} data under analysis</>
											</PricingListItem>
											<PricingListItem>
												<>{product.features.xfer} monthly transfer limit</>
											</PricingListItem>
											<PricingListItem>
												<>{product.features.assets} total assets</>
											</PricingListItem>
											<PricingListItem>
												<>{product.features.projects} total projects</>
											</PricingListItem>
										</PricingList>

										{typeof product.description === "function"
											? product.description(product)
											: product.description}
									</Box>
								</Box>
								<Box width="100%">
									<Text fontSize="xs" mt={12} pb={4}>
										{product.footer}
									</Text>
									{product.isBelowDesiredLimits ? (
										<Text
											fontSize="sm"
											fontStyle="italic"
											border="1px solid grey"
											rounded="lg"
											padding={2}
										>
											Too small for {billingTier} GB analysis workloads
										</Text>
									) : purchaseEnabled &&
									  product.purchaseLink &&
									  !product.isDisabled ? (
										/* eslint-disable-next-line react/jsx-no-target-blank */
										<a
											href={`${
												product.purchaseLink
											}?prefilled_email=${encodeURIComponent(
												userEmail
											)}&ts_email=${encodeURIComponent(userEmail)}`}
											target="_blank"
										>
											<Button
												variant={
													product.isDisabled
														? "outline"
														: product.isPopular
														? "primary"
														: "outline"
												}
												size={"md"}
												// height={18}
												width="100%"
												sx={
													product.isDisabled || !product.isPopular
														? {}
														: {
																bg: "blue.500",
																_hover: {
																	bg: "blue.400",
																},
														  }
												}
												disabled={product.isDisabled}
											>
												{product.isDisabled
													? "Coming Soon"
													: `Chose ${product.name.replace(/[0-9]/g, "")}`}
											</Button>
										</a>
									) : (
										<Text
											fontSize="sm"
											fontStyle="italic"
											border="1px solid grey"
											rounded="lg"
											padding={2}
											fontWeight="bold"
										>
											Coming Soon
										</Text>
									)}
								</Box>
							</VStack>
						</Box>
					</Box>
				))}
		</HStack>
	)
}
