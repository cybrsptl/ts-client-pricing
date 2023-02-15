import Stripe from "stripe"
import AppConfig from "@common/constants/AppConfig"
import useAppToast from "@common/hooks/useAppToast"
import useAxios from "@common/hooks/useAxios"
import { loadStripe } from "@stripe/stripe-js"

interface ProductPurchaseProps {
	stripePriceIdToPurchase: string | null
}

const ProductPurchase = ({ stripePriceIdToPurchase }: ProductPurchaseProps) => {
	const axiosInstance = useAxios()
	const toast = useAppToast()

	if (!stripePriceIdToPurchase) {
		return null
	}

	const activateStripeCheckout = async () => {
		const stripe = await loadStripe(
			AppConfig.stripe_test_mode
				? process.env.NEXT_PUBLIC_STRIPE_PUB_KEY_TEST
				: process.env.NEXT_PUBLIC_STRIPE_PUB_KEY_PROD
		)

		const checkoutResponse = await axiosInstance.post("/billing/checkout", {
			price: stripePriceIdToPurchase,
			success_url: `https://${AppConfig.app_domain}`,
			cancel_url: `https://${AppConfig.app_domain}`,
		})
		const checkoutData: Stripe.Checkout.Session = checkoutResponse.data

		if (checkoutResponse.status === 500 || !checkoutData?.url) {
			toast({
				status: "error",
				title:
					`Purchase activation failed` + (checkoutData as any)?.message
						? `: ${(checkoutData as any)?.message}`
						: "",
			})
			return null
		}

		// Redirect to Checkout.
		const { error } = await stripe!.redirectToCheckout({
			// Make the id field from the Checkout Session creation API response
			// available to this file, so you can provide it as parameter here
			// instead of the {{CHECKOUT_SESSION_ID}} placeholder.
			sessionId: checkoutData.id,
		})

		// `redirectToCheckout` failed due to a browser or network error
		toast({
			status: "error",
			title: `Purchase redirect failed. Please try again or contact support (${error.message})})`,
		})
	}

	activateStripeCheckout()
	return null
}

export default ProductPurchase
