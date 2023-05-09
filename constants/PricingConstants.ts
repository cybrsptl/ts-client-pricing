export enum PricingBillingMode {
	MONTHLY = "MONTHLY",
	ANNUAL = "ANNUAL",
}

export const PricingBillingModeToStripe = {
	[PricingBillingMode.MONTHLY]: "month",
	[PricingBillingMode.ANNUAL]: "year",
}
