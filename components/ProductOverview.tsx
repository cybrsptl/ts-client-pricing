import NextLink from "next/link"
import {
	Box,
	Button,
	Center,
	Flex,
	HStack,
	Heading,
	Switch,
	TableProps,
	Text,
	VStack,
} from "@chakra-ui/react"
import useIsMobile from "@common/hooks/useIsMobile"
import { ButtonStyle, ThemeColor } from "@common/utils/theme"
import { PricingBillingMode } from "../constants/PricingConstants"
import { PricingAccountForTierType } from "../constants/PricingTypes"
interface ProductOverviewProps extends TableProps {
	products: PricingAccountForTierType[]
	billingMode: PricingBillingMode
	setBillingMode: (PricingBillingMode) => void
	billingTier: number
	userEmail?: string
	stripePriceIdToPurchase?: string
	purchaseEnabled?: boolean
	tenantTierName?: string
	theme: ThemeColor
	setStripePriceIdToPurchase: (prodType: string | null) => void
}

export const ProductOverview = (props: ProductOverviewProps) => {
	const {
		products,
		userEmail,
		billingTier,
		billingMode,
		setBillingMode,
		purchaseEnabled,
		stripePriceIdToPurchase,
		setStripePriceIdToPurchase,
		tenantTierName,
		theme,
		...containerProps
	} = props

	const ctaButton = (product: PricingAccountForTierType, theme: ThemeColor) => {
		if (product.isBelowDesiredLimits) {
			return (
				<Text
					fontSize="xs"
					fontStyle="italic"
					border="1px solid"
					borderColor={theme.whiteButtonText}
					color={theme.darkButtonText}
					borderRadius={16}
					padding={1.5}
				>
					Too small for {billingTier} GB analysis workloads
				</Text>
			)
		}

		if (!purchaseEnabled) {
			return (
				<NextLink href="https://go.teleseer.com" target="_blank" legacyBehavior>
					<Button
						variant={"outline"}
						size={"sm"}
						// height={18}
						width="80%"
						// minWidth={"8rem"}
						fontWeight="semibold"
						paddingLeft="2em"
						paddingRight="2em"
						borderWidth={2}
						borderRadius={16}
						color={theme.lightButtonText}
						sx={product.goButtonStyle ?? ButtonStyle.white}
						isLoading={!!stripePriceIdToPurchase}
						disabled={product.isDisabled}
					>
						{product.go}
					</Button>
				</NextLink>
			)
		}

		return (
			<Button
				onClick={() => {
					setStripePriceIdToPurchase(product.priceId)
				}}
				variant={"outline"}
				size={"sm"}
				fontWeight="semibold"
				paddingLeft="2em"
				paddingRight="2em"
				sx={{
					color: "white",
					...product.cardStyle,
				}}
				isLoading={!!stripePriceIdToPurchase}
				isDisabled={
					product.isDisabled ||
					product.isComingSoon ||
					product.isBelowDesiredLimits
				}
			>
				{product.freeTrialDays && tenantTierName?.toUpperCase() !== "EXPIRED"
					? "Start Free Trial"
					: `Purchase ${product.name.replace(/[0-9]/g, "")}`}
			</Button>
		)
	}

	return (
		<>
			<Center>
				<HStack mt={2}>
					<Text>Monthly</Text>
					<Switch
						size="md"
						isChecked={billingMode === PricingBillingMode.ANNUAL}
						onChange={() => {
							setBillingMode(
								billingMode === PricingBillingMode.ANNUAL
									? PricingBillingMode.MONTHLY
									: PricingBillingMode.ANNUAL
							)
						}}
					/>
					<Text>
						Yearly
						<span style={{ fontSize: 12, marginLeft: "4px" }}>(save 20%)</span>
					</Text>
				</HStack>
			</Center>
			<Flex
				sx={{
					justifyContent: "center",
					alignItems: "top",
					gap: 4,
					flexWrap: "wrap",
					px: 8,
					pb: 1,
				}}
				{...containerProps}
			>
				{products
					.filter((p) => !p.hideOverviewCard)
					.map((product, id) => (
						<Box key={id} flexBasis={"240px"} flexGrow={0.25} flexShrink={0.25}>
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
								p={[4, 4, 6]}
								height="100%"
								backgroundColor={theme.tierBg === "light" ? "#FFF" : "inherit"}
								borderRadius="lg"
								borderWidth="1px"
								borderTop={"6px solid"}
								borderColor={
									product.prodType === "starter"
										? "white"
										: theme.lightButtonBorder
								}
								boxShadow="0px 0px 5px 0px rgba(41,41,41,0.9)"
								{...product.boxProps}
							>
								<VStack
									width="100%"
									height="100%"
									alignItems="center"
									justifyContent="space-between"
								>
									<Box>
										{/* {product.isComingSoon && <CardBadge>Waitlist</CardBadge>} */}
										<Text
											fontSize="24px"
											fontWeight="bold"
											letterSpacing="wider"
											color={theme.tierName}
										>
											{product.name.replace(/[0-9]/g, "")}
										</Text>
										<Text
											fontSize="14px"
											paddingBottom={6}
											color={theme.tierSubtitle}
										>
											{product.subTitle}
										</Text>
										{product.pricePerMonth && (
											<>
												<Heading
													fontSize="28px"
													as="span"
													color="default"
													ml={4}
												>
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
										{product.pricePerMonthBilledMonthly && (
											<Text fontSize="sm" color={theme.costSubtitle} mt={1}>
												Paid annually or ${product.pricePerMonthBilledMonthly}{" "}
												paid monthly
											</Text>
										)}
										{product.pricePerMonthBilledAnnually && (
											<Text fontSize="sm" color={theme.costSubtitle} mt={1}>
												Paid monthly or ${product.pricePerMonthBilledAnnually}{" "}
												paid annually
											</Text>
										)}
										{product.annualBillingOnly && (
											<Text fontSize="sm" color={theme.cost} mt={1}>
												Annual billing only
											</Text>
										)}
										{/* <Text
											fontSize={16}
											pt={6}
										>{`$${product.perGb}/mo per extra GB`}</Text> */}

										<VStack
											whiteSpace="normal"
											mt={8}
											color={theme.tierBullets}
										>
											{typeof product.description === "function"
												? product.description(product)
												: product.description}
										</VStack>
									</Box>
									<Box width="100%" color={theme.tierSubtitle}>
										<Text fontSize="sm" fontWeight="500" py={4}>
											{product.footer}
										</Text>
										{ctaButton(product, theme)}
									</Box>
								</VStack>
							</Box>
						</Box>
					))}
			</Flex>
		</>
	)
}
