import * as React from "react"
import { useAuthUser } from "@auth/components/AuthUserProvider"
import { Button, Table, TableProps, Tbody, Td, Tr } from "@chakra-ui/react"
import { useTenants } from "@common/components/AppTenantsProvider"
import AppConfig from "@common/constants/AppConfig"
import { PricingAccountForTierType } from "../constants/PricingTypes"

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
					{Object.values(products).map((product) => (
						<Td key={product.name} borderBottomWidth="0px">
							{/* <Stack spacing="3"> */}
							{/* <Button variant="primary" width="full">
									Buy now
								</Button> */}
							{/* <Button variant="secondary" width="full">
									Talk to sales
								</Button> */}
							{/* </Stack> */}
							{product.purchaseLink && !product.isDisabled && (
								/* eslint-disable-next-line react/jsx-no-target-blank */
								<a
									href={`${
										product.purchaseLink
									}?prefilled_email=${encodeURIComponent(
										userInfo?.email
									)}&ts_email=${encodeURIComponent(userInfo?.email)}`}
									target="_blank"
								>
									<Button
										variant={product.isDisabled ? "solid" : "primary"}
										size={product.isDisabled ? "sm" : "lg"}
										height={12}
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
						</Td>
					))}
				</Tr>
			</Tbody>
		</Table>
	)
}
