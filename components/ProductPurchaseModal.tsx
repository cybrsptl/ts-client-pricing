import Link from "next/link"
import React, { useRef } from "react"
import {
	Box,
	Button,
	FlexProps,
	Heading,
	ListItem,
	Modal,
	ModalBody,
	ModalCloseButton,
	ModalContent,
	ModalOverlay,
	OrderedList,
	Text,
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
				<Box mb={10}>
					<Heading size="lg" mt={4}>
						Welcome to the Teleseer beta!
					</Heading>
					<Text fontSize="md">
						We&apos;re excited to share the launch journey with you.
					</Text>
				</Box>

				<Box mb={10}>
					Please ensure the following for a streamlined setup experience:
					<OrderedList pl={4} mt={4} spacing={2} mb={4}>
						<ListItem>
							You have a US billing address.
							<Box fontSize="xs" fontStyle="italic">
								If you don&apos;t have a US billing address,{" "}
								<Link href={"mailto:hello@cyberspatial.com"} target="_blank">
									contact us
								</Link>{" "}
								before purchase.
							</Box>
						</ListItem>
						<ListItem>You have a Google account to use for sign-in.</ListItem>
						<ListItem>
							Please use your Google email as your purchase contact email.
						</ListItem>
					</OrderedList>
				</Box>

				<Box fontSize="xs" mb={6} color="theme_text_dark">
					Your usage of Teleseer is subject to the Cyberspatial Inc.
					<br />
					<a href="https://teleseer.com/terms" target="blank">
						Terms of Service
					</a>{" "}
					and{" "}
					<a href="https://teleseer.com/privacy" target="blank">
						Privacy Policy
					</a>
					<br />
					<br />
					By sign­ing up you ag­ree to rec­eive per­io­dic pro­duct
					lau­nch/upd­ate emails from Cyber­spatial. Your infor­ma­tion will
					never be sold. You can un­sub­scribe at any time.
				</Box>

				{/* eslint-disable-next-line react/jsx-no-target-blank */}
				<Box textAlign="center">
					<Text as="div" mb={4}>
						Ready to go?
					</Text>

					{/* eslint-disable-next-line react/jsx-no-target-blank */}
					<a
						href={`${product.purchaseLink}?prefilled_email=${encodeURIComponent(
							userEmail || ""
						)}&ts_email=${encodeURIComponent(userEmail || "")}`}
						target="_blank"
						style={{ textDecoration: "none" }}
						onClick={onClose}
					>
						<Button px={6} mb={6} ref={initialRef} variant="primary">
							Purchase {product.name.replace(/[0-9]/g, "")} Subscription
						</Button>
					</a>
				</Box>
			</>
		)
	}

	return (
		<Modal
			isOpen={productToPurchase !== null}
			onClose={onClose}
			initialFocusRef={initialRef}
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
				top={`${Math.max(-20, (viewport.height - 700) / 2)}px`}
				maxW="40rem"
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
						p: 4,
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
					<ModalBody>{RenderContent()}</ModalBody>
					{/* </Box>
					</Stack> */}
				</Box>
			</ModalContent>
		</Modal>
	)
}

export default ProductPurchaseModal
