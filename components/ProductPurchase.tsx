import Stripe from "stripe"
import AppConfig from "@common/constants/AppConfig"
import useAxios from "@common/hooks/useAxios"
import { loadStripe } from "@stripe/stripe-js"
import { PricingAccountForTierType } from "../constants/PricingTypes"

interface ProductPurchaseProps {
	products: PricingAccountForTierType[]
	productToPurchase: string | null
	setProductToPurchase: (prodType: string | null) => void
	userEmail?: string
	userStripeId?: string
}

const ProductPurchase = ({
	products,
	productToPurchase,
	setProductToPurchase,
	userEmail,
	userStripeId,
	...rest
}: ProductPurchaseProps) => {
	const axiosInstance = useAxios()

	if (!productToPurchase) {
		return null
	}

	const product = products.find((p) => p.prodType === productToPurchase)
	if (!product) {
		console.error("Warning: Product not found")
		return null
	}

	console.log("product", product)

	const activateStripeCheckout = async () => {
		const stripe = await loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUB_KEY_TEST)

		const checkoutResponse = await axiosInstance.post("/billing/checkout", {
			price: "price_1MZSPlGUyP9kXnfZlmsCzuJb",
			success_url: AppConfig.app_domain,
			cancel_url: AppConfig.app_domain,
		})
		const checkoutData: Stripe.Checkout.Session = checkoutResponse.data
		console.log("checkoutResponse: ", checkoutResponse)
		console.log("checkoutData: ", checkoutData)

		if (checkoutResponse.status === 500) {
			console.error((checkoutData as any).message)
			return null
		}

		// Redirect to Checkout.
		const { error } = await stripe!.redirectToCheckout({
			// Make the id field from the Checkout Session creation API response
			// available to this file, so you can provide it as parameter here
			// instead of the {{CHECKOUT_SESSION_ID}} placeholder.
			sessionId: checkoutData.id,
		})

		// If `redirectToCheckout` fails due to a browser or network
		// error, display the localized error message to your customer
		// using `error.message`.
		console.warn(error.message)
	}

	activateStripeCheckout()

	return null
}

export default ProductPurchase
