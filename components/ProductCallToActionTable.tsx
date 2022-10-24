import * as React from "react"
import { Button, Table, TableProps, Tbody, Td, Tr } from "@chakra-ui/react"
import AppConfig from "@common/constants/AppConfig"
import { PricingServicesType } from "../constants/PricingData"

interface ProductCallToActionTableProps extends TableProps {
	products: PricingServicesType[]
}

export const ProductCallToActionTable = (
	props: ProductCallToActionTableProps
) => {
	const { products, ...tableProps } = props
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
							{/* eslint-disable-next-line react/jsx-no-target-blank */}
							<a href={AppConfig.stripe_customer_portal_url} target="_blank">
								<Button
									variant={products[id].isDisabled ? "solid" : "primary"}
									size="lg"
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
									{products[id].isDisabled ? "Soon" : "Buy Now"}
								</Button>
							</a>
						</Td>
					))}
				</Tr>
			</Tbody>
		</Table>
	)
}
