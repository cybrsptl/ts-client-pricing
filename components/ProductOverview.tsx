import * as React from "react"
import {
	Box,
	Button,
	Flex,
	HStack,
	Heading,
	TableProps,
	Text,
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
	const { products, userEmail, billingTier, tenantTierName, purchaseEnabled } =
		props

	return (
		<HStack spacing={2} width="100%" alignItems="top" justifyContent="center">
			{products.map((product, id) => (
				<Box key={id} flex="1">
					<Card
						sx={{
							textAlign: "center",
							overflow: "hidden",
							position: "relative",
						}}
					>
						{product.isPopular && (
							<CardBadge /*colorScheme="green"*/>Popular</CardBadge>
						)}
						{product.isComingSoon && (
							<CardBadge /*colorScheme="gray"*/>Invite-Only</CardBadge>
						)}
						<Text
							fontSize="md"
							textTransform="uppercase"
							fontWeight="bold"
							letterSpacing="wider"
							height={12}
							paddingTop={2}
						>
							{product.name}
						</Text>
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
						{product.purchaseLink && !product.isDisabled && (
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
									mt={8}
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
					</Card>
				</Box>
			))}
		</HStack>
	)
}
