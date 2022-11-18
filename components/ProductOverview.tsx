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
	setProductToPurchase: (prodType: string | null) => void
}

export const ProductOverview = (props: ProductOverviewProps) => {
	const {
		products,
		userEmail,
		billingTier,
		purchaseEnabled,
		setProductToPurchase,
		...containerProps
	} = props

	return (
        <HStack
			spacing={8}
			width="100%"
			alignItems="top"
			justifyContent="center"
			pb={1}
			minHeight="520px"
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
							borderColor="theme_hilight"
							boxShadow="0px 0px 5px 0px rgba(41,41,41,0.9)"
							{...product.boxProps}
						>
							<VStack width="100%" height="100%" justifyContent="space-between">
								<Box>
									{product.isPopular && (
										<CardBadge colorScheme="blue">Popular</CardBadge>
									)}
									{/* {product.isComingSoon && <CardBadge>Waitlist</CardBadge>} */}
									<Text
										fontSize="lg"
										fontWeight="bold"
										letterSpacing="wider"
										paddingBottom={2}
									>
										{product.name.replace(/[0-9]/g, "")}
									</Text>
									<Text fontSize="sm" paddingBottom={6} color="theme_text_desc">
										{product.subTitle}
									</Text>
									{product.pricePerMonth && (
										<>
											<Heading fontSize="25px" as="span" color="default" ml={4}>
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
										<Text fontSize="sm" color="theme_text_desc" mt={1}>
											Paid annually or ${product.pricePerMonthBilledMonthly}{" "}
											paid monthly
										</Text>
									)}
									{product.pricePerMonthBilledAnnually && (
										<Text fontSize="sm" color="theme_text_desc" mt={1}>
											Paid monthly or ${product.pricePerMonthBilledAnnually}{" "}
											paid annually
										</Text>
									)}
									{product.annualBillingOnly && (
										<Text fontSize="sm" color="theme_text_desc" mt={1}>
											Annual billing only
										</Text>
									)}

									<Box color="muted" whiteSpace="normal" mt={8}>
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
									<Text fontSize="sm" fontWeight="semibold" py={4}>
										{product.footer}
									</Text>
									{product.isBelowDesiredLimits ? (
										<Text
											fontSize="sm"
											fontStyle="italic"
											border="1px solid grey"
											rounded="lg"
											padding={1.5}
										>
											Too small for {billingTier} GB analysis workloads
										</Text>
									) : purchaseEnabled &&
									  product.purchaseLink &&
									  !product.isDisabled ? (
										<Button
											onClick={() => {
												setProductToPurchase(product.prodType)
											}}
											variant={
												"outline"
												// product.isDisabled
												// 	? "outline"
												// 	: product.isPopular
												// 	? "primary"
												// 	: "outline"
											}
											size={"sm"}
											// height={18}
											// width="100%"
											// minWidth={"8rem"}
											fontWeight="semibold"
											paddingLeft="2em"
											paddingRight="2em"
											sx={
												product.isDisabled || !product.isPopular
													? {
															color: "white",
													  }
													: {
															color: "white",
															borderColor: "blue.500",
															_hover: {
																backgroundColor: "blue.800",
															},
													  }
											}
											disabled={product.isDisabled}
										>
											{product.isDisabled
												? "Coming Soon"
												: `Choose ${product.name.replace(/[0-9]/g, "")}`}
										</Button>
									) : (
										<Box
											fontSize="sm"
											width="fit-content"
											border="1px solid grey"
											rounded="md"
											height="32px"
											lineHeight="30px"
											paddingLeft="2em"
											paddingRight="2em"
											margin="auto"
											fontWeight="semibold"
										>
											Coming Soon
										</Box>
									)}
								</Box>
							</VStack>
						</Box>
					</Box>
				))}
		</HStack>
    );
}
