import * as React from "react"
import { useAuthUser } from "@auth/components/AuthUserProvider"
import { Button } from "@chakra-ui/react"
import { PricingBillingMode } from "../constants/PricingConstants"

interface DevPricingButtonProps {
	caption: string
	href: string
}

export const DevPricingButton = ({ caption, href }: DevPricingButtonProps) => {
	const { userInfo } = useAuthUser()

	return (
		// eslint-disable-next-line react/jsx-no-target-blank
		<a
			href={`${href}?prefilled_email=${encodeURIComponent(userInfo?.email)}`}
			target="_blank"
		>
			<Button
				variant={"primary"}
				size={"sm"}
				sx={{
					bg: "green.500",
					_hover: {
						bg: "green.400",
					},
					mb: 2,
					width: "100%",
				}}
			>
				{caption}
			</Button>
		</a>
	)
}
