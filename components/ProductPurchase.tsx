import { useEffect } from "react"
import Stripe from "stripe"
import AppConfig from "@common/constants/AppConfig"
import useAppToast from "@common/hooks/useAppToast"
import useAxios from "@common/hooks/useAxios"
import { loadStripe } from "@stripe/stripe-js"

interface ProductPurchaseProps {
	stripePriceIdToPurchase: string | null
	setStripePriceIdToPurchase: (prodType: string | null) => void
}

const ProductPurchase = ({
	stripePriceIdToPurchase,
	setStripePriceIdToPurchase,
}: ProductPurchaseProps) => {
	const axiosInstance = useAxios()
	const toast = useAppToast()

	// Initiate Stripe checkout session and redirect client whenever stripePriceIdToPurchase is populated
	const initiateStripeCheckoutSession = async () => {
		const stripe = await loadStripe(
			AppConfig.stripe_test_mode
				? process.env.NEXT_PUBLIC_STRIPE_PUB_KEY_TEST
				: process.env.NEXT_PUBLIC_STRIPE_PUB_KEY_PROD
		)

		try {
			const checkoutResponse = await axiosInstance
				.post("/billing/checkout", {
					price: stripePriceIdToPurchase,
					success_url: `https://${AppConfig.app_domain}`,
					cancel_url: `https://${AppConfig.app_domain}`,
				})
				.catch((e) => {
					throw new Error(`Purchase activation failed: ` + e.message)
				})
			const checkoutData: Stripe.Checkout.Session = checkoutResponse.data

			if (!checkoutData?.url) {
				throw new Error(
					`Purchase activation failed` + (checkoutData as any)?.message
						? `: ${(checkoutData as any)?.message}`
						: ""
				)
			}

			// Redirect to Checkout
			const { error } = await stripe!.redirectToCheckout({
				// Make the id field from the Checkout Session creation API response
				// available to this file, so you can provide it as parameter here
				// instead of the {{CHECKOUT_SESSION_ID}} placeholder.
				sessionId: checkoutData.id,
			})

			// Checkout redirection failed due to a browser or network error
			throw new Error(
				`Purchase redirect failed. Please try again or contact support (${error.message})})`
			)
		} catch (error) {
			toast({
				status: "error",
				title: error.message,
			})
			setStripePriceIdToPurchase(null)
		}
	}

	useEffect(() => {
		if (stripePriceIdToPurchase) {
			initiateStripeCheckoutSession()
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [stripePriceIdToPurchase])

	return null
}

export default ProductPurchase
