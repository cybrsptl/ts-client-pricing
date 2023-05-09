import Link from "next/link"
import React, { useRef, useState } from "react"
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
	Stat,
	StatNumber,
	Text,
} from "@chakra-ui/react"
import useIsMobile from "@common/hooks/useIsMobile"
import useViewport from "@common/hooks/useViewport"

interface ProductTrialModalProps extends FlexProps {
	displayModal: boolean
	setIsDisplayed: (boolean) => void
}

const ProductTrialModal = ({
	displayModal,
	setIsDisplayed,
}: ProductTrialModalProps) => {
	const isMobile = useIsMobile()
	const viewport = useViewport()
	const initialRef = useRef<HTMLInputElement>()
	const [signedUp, setSignedUp] = useState(false)

	const onSubmit = () => {
		setSignedUp(true)
	}

	const onClose = () => {
		setSignedUp(false)
		setIsDisplayed(false)
	}

	const RenderContent = () => {
		return (
			<>
				<Box mb={10}>
					<Heading size="lg" mt={4}>
						Let&apos;s start your trial!
					</Heading>
					<Text fontSize="md">
						We&apos;re excited to get you up and running with your free Starter
						trial.
					</Text>
					<Text fontSize="md">
						The Starter trial allows you to process up to
						<Text
							sx={{
								display: "inline",
								marginLeft: "4px",
								fontWeight: "bold",
								fontSize: "24px",
								lineHeight: "24px",
							}}
						>
							10 GB
						</Text>{" "}
						of data.
					</Text>
				</Box>

				{!signedUp ? (
					<Box textAlign="center">
						<Text as="div" mb={4} fontSize="lg">
							Congratulations on setting up your Teleseer trial!
						</Text>

						<Text as="div" mb={10} color="theme_text_dark">
							You can now login via a Google associated email address or you can
							click <Link href="https://go.teleseer.com/auth/reset">here</Link>{" "}
							to set up a custom password for a non-Google email address.
						</Text>

						<Text as="div" mb={4} fontStyle="italic" color="theme_text_dark">
							Let&apos;s dive right in!
						</Text>

						{/* eslint-disable-next-line react/jsx-no-target-blank */}
						<a
							href={`https://go.teleseer.com`}
							target="_blank"
							style={{ textDecoration: "none" }}
							onClick={onSubmit}
						>
							<Button
								px={6}
								minWidth="350px"
								mb={6}
								ref={initialRef}
								variant="primary"
							>
								Enter Teleseer
							</Button>
						</a>
					</Box>
				) : (
					<>
						<Box mb={10}>
							Please ensure the following for a streamlined setup experience:
							<OrderedList pl={4} mt={4} spacing={2} mb={4}>
								<ListItem>You have a valid credit card.</ListItem>
								<ListItem>
									You have a US or UK billing address.
									<Box fontSize="xs" fontStyle="italic">
										If you don&apos;t have a US/UK billing address,{" "}
										<Link
											href={"mailto:hello@cyberspatial.com"}
											target="_blank"
										>
											please contact us
										</Link>{" "}
										before starting your trial.
									</Box>
								</ListItem>
								<ListItem>
									Please use the same email address for your trial contact and
									your account login.
								</ListItem>
							</OrderedList>
						</Box>

						<Box fontSize="xs" mb={10} color="theme_text_dark">
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
								href=""
								target="_blank"
								style={{ textDecoration: "none" }}
								onClick={onSubmit}
							>
								<Button px={6} mb={6} ref={initialRef} variant="primary">
									Start trial
								</Button>
							</a>
						</Box>
					</>
				)}
			</>
		)
	}

	return (
		<Modal
			isOpen={displayModal}
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
					<ModalCloseButton />
					<ModalBody>{RenderContent()}</ModalBody>
				</Box>
			</ModalContent>
		</Modal>
	)
}

export default ProductTrialModal
