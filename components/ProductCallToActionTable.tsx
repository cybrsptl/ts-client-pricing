import * as React from "react"
import { useAuthUser } from "@auth/components/AuthUserProvider"
import { Button, Table, TableProps, Tbody, Td, Tr } from "@chakra-ui/react"
import { useTenants } from "@common/components/AppTenantsProvider"
import AppConfig from "@common/constants/AppConfig"
import { PricingAccountForTierType } from "../constants/CustomPricingData"

interface ProductCallToActionTableProps extends TableProps {
	products: PricingAccountForTierType[]
}

export const ProductCallToActionTable = (
	props: ProductCallToActionTableProps
) => {
	const { products, ...tableProps } = props
	const { userInfo } = useAuthUser()
	const { activeTenant } = useTenants()

	if (activeTenant?.tier?.name.toUpperCase() !== "FREE") {
		return
	}

	return (
		<Table sx={{ tableLayout: "fixed" }} {...tableProps}>
			<Tbody>
				<Tr>
					{products.length > 1 && <Td borderBottomWidth="0px" />}
					{products.map((_, id) => (
						<Td key={id} borderBottomWidth="0px">
							{/* <Stack spacing="3"> */}
							{/* <Button variant="primary" width="full">
									Buy now
								</Button> */}
							{/* <Button variant="secondary" width="full">
									Talk to sales
								</Button> */}
							{/* </Stack> */}
							{!products[id].isDisabled && (
								/* eslint-disable-next-line react/jsx-no-target-blank */
								<a
									href={`${
										AppConfig.stripe_customer_portal_url
									}?prefilled_email=${encodeURIComponent(
										userInfo?.email
									)}&ts_email=${encodeURIComponent(userInfo?.email)}`}
									target="_blank"
								>
									<Button
										variant={products[id].isDisabled ? "solid" : "primary"}
										size={products[id].isDisabled ? "sm" : "lg"}
										height={12}
										sx={
											products[id].isDisabled
												? {}
												: {
														bg: "green.500",
														_hover: {
															bg: "green.400",
														},
												  }
										}
										disabled={products[id].isDisabled}
									>
										{products[id].isDisabled ? "Coming Soon" : "Buy Now"}
									</Button>
								</a>
							)}
						</Td>
					))}
				</Tr>
			</Tbody>
		</Table>
	)
}
