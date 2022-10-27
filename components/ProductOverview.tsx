import * as React from "react"
import {
	Box,
	Button,
	Flex,
	HStack,
	Heading,
	TableProps,
	Text,
	VStack,
} from "@chakra-ui/react"
import Card from "@common/components/Card"
import { PricingBillingMode } from "../constants/PricingConstants"
import { PricingAccountForTierType } from "../constants/PricingTypes"
import { CardBadge } from "./CardBadge"

interface ProductOverviewProps extends TableProps {
	products: PricingAccountForTierType[]
	billingMode: PricingBillingMode
	billingTier: number
	userEmail?: string
	tenantTierName?: string
	purchaseEnabled?: boolean
}

export const ProductOverview = (props: ProductOverviewProps) => {
	const { products, userEmail, billingTier, purchaseEnabled } = props

	return (
		<HStack
			spacing={8}
			width="100%"
			alignItems="top"
			justifyContent="center"
			pb={8}
		>
			{products.map((product, id) => (
				<Box key={id} flex="1">
					<Card
						sx={{
							textAlign: "center",
							overflow: "hidden",
							position: "relative",
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
									<CardBadge colorScheme="green">Popular</CardBadge>
								)}
								{product.isComingSoon && <CardBadge>Waitlist</CardBadge>}
								<Text
									fontSize="md"
									textTransform="uppercase"
									fontWeight="bold"
									letterSpacing="wider"
									height={8}
									paddingTop={2}
								>
									{product.name}
								</Text>
								<Text fontSize="xs" pb={4}>
									{product.subTitle}
								</Text>
								{!product.isBelowDesiredLimits && product.pricePerMonth && (
									<Box maxWidth={"130px"} margin="auto">
										<Flex
											direction="row"
											align="baseline"
											justifyContent="space-between"
										>
											<Heading size="lg" color="default" ml={4}>
												${product.pricePerMonth.toLocaleString()}
											</Heading>
											<Box fontSize="sm" color="muted" fontWeight="bold">
												/mo
											</Box>
										</Flex>
										{product.pricePerMonth && product.dataInGB && (
											<Flex
												direction="row"
												align="baseline"
												justifyContent="space-between"
											>
												<Heading size="sm" color="default" ml={7}>
													$
													{(product.pricePerMonth / product.dataInGB)
														.toFixed(2)
														.toLocaleString()}
												</Heading>
												<Box
													fontSize="xs"
													color="muted"
													fontWeight="bold"
													mr={1}
												>
													/GB
												</Box>
											</Flex>
										)}
									</Box>
								)}
								{product.annualBillingOnly && (
									<Text fontSize="sm" fontStyle="italic" mt={6} mb={9}>
										Annual billing only.
									</Text>
								)}

								<Box color="muted" whiteSpace="normal" mt={6}>
									{typeof product.description === "function"
										? product.description()
										: product.description}
								</Box>
							</Box>
							<Box width="100%">
								{product.isBelowDesiredLimits && (
									<Text fontSize="sm" fontStyle="italic" mt={6}>
										Too small for {billingTier} GB analysis workloads.
									</Text>
								)}
								{purchaseEnabled &&
									product.purchaseLink &&
									!product.isDisabled && (
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
												variant={product.isDisabled ? "solid" : "primary"}
												size={product.isDisabled ? "sm" : "md"}
												// height={18}
												width="100%"
												mt={6}
												sx={
													product.isDisabled
														? {}
														: {
																bg: "green.500",
																_hover: {
																	bg: "green.400",
																},
														  }
												}
												disabled={product.isDisabled}
											>
												{product.isDisabled ? "Coming Soon" : "Buy Now"}
											</Button>
										</a>
									)}
							</Box>
						</VStack>
					</Card>
				</Box>
			))}
		</HStack>
	)
}
