import Image from "next/image"
import React, { useRef } from "react"
import {
	Box,
	Button,
	FlexProps,
	Modal,
	ModalBody,
	ModalCloseButton,
	ModalContent,
	ModalOverlay,
	Stack,
} from "@chakra-ui/react"
import useIsMobile from "@common/hooks/useIsMobile"
import useViewport from "@common/hooks/useViewport"
import { PricingAccountForTierType } from "../constants/PricingTypes"

interface ProductPurchaseModalProps extends FlexProps {
	products: PricingAccountForTierType[]
	productToPurchase: string | null
	setProductToPurchase: (prodType: string | null) => void
	userEmail?: string
}

const ProductPurchaseModal = ({
	products,
	productToPurchase,
	setProductToPurchase,
	userEmail,
	...rest
}: ProductPurchaseModalProps) => {
	const isMobile = useIsMobile()
	const viewport = useViewport()
	const initialRef = useRef<HTMLInputElement>()

	const onClose = () => {
		setProductToPurchase(null)
	}

	const RenderContent = () => {
		if (!products) {
			return "Warning: No products found"
		}
		const product = products.find((p) => p.prodType === productToPurchase)
		if (!product) {
			return "Warning: Product not found"
		}

		return (
			<>
				<ul>
					<li>Product ID: {productToPurchase}</li>
					<li>ToS | Priv Policy</li>
					<li>use your main email</li>
					<li>use your main email</li>
				</ul>

				{/* eslint-disable-next-line react/jsx-no-target-blank */}
				<a
					href={`${product.purchaseLink}?prefilled_email=${encodeURIComponent(
						userEmail || ""
					)}&ts_email=${encodeURIComponent(userEmail || "")}`}
					target="_blank"
					style={{ textDecoration: "none" }}
					onClick={onClose}
				>
					<Button
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
				</a>
			</>
		)
	}

	return (
		<Modal
			isOpen={productToPurchase !== null}
			onClose={onClose}
			// initialFocusRef={initialRef}
			// isCentered // note: this crops the upper-half of our mobile content when mobile users have a keyboard open. Using dynamically computed modalTop instead
			motionPreset="slideInBottom"
			scrollBehavior="outside"
		>
			<ModalOverlay
				style={{
					backgroundColor: "rgba(0,0,0,0.8)",
					backdropFilter: "blur(4px)",
				}}
			/>
			<ModalContent
				top={`${Math.max(-20, (viewport.height - 1200) / 2)}px`}
				maxW="60rem"
				style={{ position: "absolute" }}
				bg="none"
				shadow="none"
				paddingBottom={10}
			>
				{!isMobile && (
					<Box
						style={{
							left: 0,
							top: 0,
							bottom: 0,
							right: 0,
							filter: `blur(50px)`,
							position: "absolute",
							opacity: 1,
							backgroundImage:
								"linear-gradient(90deg,#5ddcff,#3c67e3 43%,#4e00c2)",
						}}
					>
						&nbsp;
					</Box>
				)}
				<Box
					sx={{
						bg: "#19191d",
						left: 0,
						top: 0,
						bottom: 0,
						right: 0,
						position: "relative",
						borderRadius: "xl",
					}}
				>
					{/* <Stack direction={"row"}>
						{!isMobile && (
							<Box w="100%">
								<Box
									sx={{
										width: "100%",
										height: "100%",
										position: "relative",
										borderLeftRadius: "xl",
										overflow: "hidden",
									}}
								>
									<Image
										src={require("/public/img/bg_alien_mothership_vertical.jpg")}
										alt={""}
										layout="fill"
										objectFit="cover"
										quality={80}
										placeholder="blur"
									/>
								</Box>
							</Box>
						)}
						<Box w="100%" pl={{ base: 4, lg: 8 }} pr={{ base: 4, lg: 8 }}> */}
					<ModalCloseButton />
					<ModalBody minHeight="400px">{RenderContent()}</ModalBody>
					{/* </Box>
					</Stack> */}
				</Box>
			</ModalContent>
		</Modal>
	)
}

export default ProductPurchaseModal
