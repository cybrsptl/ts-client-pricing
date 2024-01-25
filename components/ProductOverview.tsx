import {
	Box,
	Button,
	Center,
	Flex,
	HStack,
	Heading,
	Link,
	Switch,
	TableProps,
	Text,
	VStack,
} from "@chakra-ui/react"

import { CustomButtonStyles } from "../constants/CustomStyles"
import { PricingBillingMode } from "../constants/PricingConstants"
import { PricingAccountType } from "../constants/PricingTypes"
interface ProductOverviewProps extends TableProps {
	products: PricingAccountType[]
	billingMode: PricingBillingMode
	setBillingMode: (PricingBillingMode) => void
	billingTier: number
	userEmail?: string
	stripePriceIdToPurchase?: string
	purchaseEnabled?: boolean
	tenantTierName?: string
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
		tenantTierName,
		...containerProps
	} = props

	const ctaButton = (product: PricingAccountType) => {
		if (product.isBelowDesiredLimits) {
			return (
				<Button
					variant="outline"
					size="sm"
					borderColor="theme-border-color"
					color="theme-button-dark"
					isDisabled={true}
				>
					Too small for {billingTier} GB DUA
				</Button>
			)
		}

		return (
			<Button
				onClick={product.goActionMethod}
				variant={"outline"}
				size={"sm"}
				fontWeight="semibold"
				paddingLeft="2em"
				paddingRight="2em"
				sx={{
					height: 8,
					px: 6,
					...{
						textDecoration: "none",
						marginTop: "1rem",
					},
					...(product.goButtonStyle ?? CustomButtonStyles.white),
				}}
				isLoading={!!stripePriceIdToPurchase}
				isDisabled={product.isDisabled}
			>
				{product.go}
			</Button>
		)
	}

	return (
		<>
			<Center>
				<HStack mt={2}>
					<Link
						onClick={() => {
							setBillingMode(PricingBillingMode.MONTHLY)
						}}
						sx={{
							_hover: {
								textDecoration: "none",
							},
							color:
								billingMode === PricingBillingMode.MONTHLY
									? "theme-primary-active"
									: "auto",
						}}
					>
						Monthly
					</Link>
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
					<Link
						onClick={() => {
							setBillingMode(PricingBillingMode.ANNUAL)
						}}
						sx={{
							_hover: {
								textDecoration: "none",
							},
							color:
								billingMode === PricingBillingMode.ANNUAL
									? "theme-primary-active"
									: "auto",
						}}
					>
						Yearly
						<span style={{ fontSize: 12, marginLeft: "4px" }}>(save 20%)</span>
					</Link>
				</HStack>
			</Center>
			<Center>
				<Flex
					{...containerProps}
					sx={{
						justifyContent: "center",
						alignItems: "top",
						flexWrap: "wrap",
						width: "100%",
						maxWidth: "1000px",
						gap: 4,
						pb: 1,
					}}
				>
					{products
						.filter((p) => !p.hideOverviewCard)
						.map((product, id) => (
							<Box
								key={id}
								// flex="1 0 30%"
								width="300px"
								// minWidth={"240px"}
								// maxWidth={"340px"}
								rounded="lg"
								overflow="hidden"
							>
								<Box
									bg={"theme-accent"}
									sx={{
										textAlign: "center",
										overflow: "hidden",
										position: "relative",
										opacity:
											product.isDisabled || product.isBelowDesiredLimits
												? 0.5
												: 1,
										cursor:
											product.isDisabled || product.isBelowDesiredLimits
												? "not-allowed"
												: "auto",
										borderColor: "theme-bg-white",
										borderTopWidth: "6px",
										height: "100%",
										backgroundColor: "theme-bg-white",
										p: [4, 4, 6],
										boxShadow: "lg",
										...(product.cardStyle ?? {}),
									}}
								>
									<VStack
										width="100%"
										height="100%"
										alignItems="center"
										justifyContent="space-between"
									>
										<Box>
											<Text
												fontSize="24px"
												fontWeight="bold"
												letterSpacing="wider"
											>
												{product.name.replace(/[0-9]/g, "")}
											</Text>
											<Text fontSize="xs" paddingBottom={8}>
												{product.subTitle}
											</Text>

											{product.freeTrialCode ? (
												<>
													<Heading
														fontSize="28px"
														as="span"
														color="default"
														ml={4}
													>
														$0
													</Heading>
													<Text fontSize="xs" mt={1}>
														Free for 30 days
													</Text>
													{/* {product.pricePerMonth && (
														<Text fontSize="xs" mt={1}>
															Renews at $
															{product.pricePerMonth.toLocaleString()} month
														</Text>
													)} */}
												</>
											) : (
												<>
													{product.pricePerMonth && (
														<Heading
															fontSize="28px"
															as="span"
															color="default"
															ml={4}
														>
															${product.pricePerMonth.toLocaleString()} per
															month
														</Heading>
													)}
													{product.pricePerMonthBilledMonthly && (
														<Text fontSize="xs" mt={1}>
															Paid annually or $
															{product.pricePerMonthBilledMonthly.toLocaleString()}{" "}
															paid monthly
														</Text>
													)}
													{product.pricePerMonthBilledAnnually && (
														<Text fontSize="xs" mt={1}>
															Paid monthly or $
															{product.pricePerMonthBilledAnnually.toLocaleString()}{" "}
															paid annually
														</Text>
													)}
													{product.annualBillingOnly && (
														<Text fontSize="sm" mt={1}>
															Annual billing only
														</Text>
													)}
												</>
											)}

											{product.features.resources["perGb"] && (
												<Text
													fontSize={16}
													fontWeight="bold"
													pt={4}
												>{`${product.features.resources["perGb"]} per GB`}</Text>
											)}

											<VStack whiteSpace="normal" mt={8}>
												{typeof product.description === "function"
													? product.description(product)
													: product.description}
											</VStack>
										</Box>
										<Box width="100%">
											<Text fontSize="sm" fontWeight="500" py={4}>
												{product.footer}
											</Text>
											{ctaButton(product)}
										</Box>
									</VStack>
								</Box>
							</Box>
						))}
				</Flex>
			</Center>
		</>
	)
}
