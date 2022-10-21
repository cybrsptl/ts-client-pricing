import * as React from "react"
import {
	Button,
	Stack,
	Table,
	TableProps,
	Tbody,
	Td,
	Tr,
} from "@chakra-ui/react"
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
							<Stack spacing="3">
								<Button variant="primary" width="full">
									Buy now
								</Button>
								<Button variant="secondary" width="full">
									Talk to sales
								</Button>
							</Stack>
						</Td>
					))}
				</Tr>
			</Tbody>
		</Table>
	)
}
