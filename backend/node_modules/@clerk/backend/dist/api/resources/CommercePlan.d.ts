import type { BillingMoneyAmount } from '@clerk/types';
import { Feature } from './Feature';
import type { BillingPlanJSON } from './JSON';
/**
 * The `BillingPlan` object is similar to the [`BillingPlanResource`](/docs/reference/javascript/types/billing-plan-resource) object as it holds information about a plan, as well as methods for managing it. However, the `BillingPlan` object is different in that it is used in the [Backend API](https://clerk.com/docs/reference/backend-api/tag/commerce/get/commerce/plans) and is not directly accessible from the Frontend API.
 *
 * @experimental This is an experimental API for the Billing feature that is available under a public beta, and the API is subject to change. It is advised to [pin](https://clerk.com/docs/pinning) the SDK version and the clerk-js version to avoid breaking changes.
 */
export declare class BillingPlan {
    /**
     * The unique identifier for the plan.
     */
    readonly id: string;
    /**
     * The ID of the product the plan belongs to.
     */
    readonly productId: string;
    /**
     * The name of the plan.
     */
    readonly name: string;
    /**
     * The URL-friendly identifier of the plan.
     */
    readonly slug: string;
    /**
     * The description of the plan.
     */
    readonly description: string | undefined;
    /**
     * Whether the plan is the default plan.
     */
    readonly isDefault: boolean;
    /**
     * Whether the plan is recurring.
     */
    readonly isRecurring: boolean;
    /**
     * Whether the plan has a base fee.
     */
    readonly hasBaseFee: boolean;
    /**
     * Whether the plan is displayed in the `<PriceTable/>` component.
     */
    readonly publiclyVisible: boolean;
    /**
     * The monthly fee of the plan.
     */
    readonly fee: BillingMoneyAmount;
    /**
     * The annual fee of the plan.
     */
    readonly annualFee: BillingMoneyAmount;
    /**
     * The annual fee of the plan on a monthly basis.
     */
    readonly annualMonthlyFee: BillingMoneyAmount;
    /**
     * The type of payer for the plan.
     */
    readonly forPayerType: 'org' | 'user';
    /**
     * The features the plan offers.
     */
    readonly features: Feature[];
    constructor(
    /**
     * The unique identifier for the plan.
     */
    id: string, 
    /**
     * The ID of the product the plan belongs to.
     */
    productId: string, 
    /**
     * The name of the plan.
     */
    name: string, 
    /**
     * The URL-friendly identifier of the plan.
     */
    slug: string, 
    /**
     * The description of the plan.
     */
    description: string | undefined, 
    /**
     * Whether the plan is the default plan.
     */
    isDefault: boolean, 
    /**
     * Whether the plan is recurring.
     */
    isRecurring: boolean, 
    /**
     * Whether the plan has a base fee.
     */
    hasBaseFee: boolean, 
    /**
     * Whether the plan is displayed in the `<PriceTable/>` component.
     */
    publiclyVisible: boolean, 
    /**
     * The monthly fee of the plan.
     */
    fee: BillingMoneyAmount, 
    /**
     * The annual fee of the plan.
     */
    annualFee: BillingMoneyAmount, 
    /**
     * The annual fee of the plan on a monthly basis.
     */
    annualMonthlyFee: BillingMoneyAmount, 
    /**
     * The type of payer for the plan.
     */
    forPayerType: 'org' | 'user', 
    /**
     * The features the plan offers.
     */
    features: Feature[]);
    static fromJSON(data: BillingPlanJSON): BillingPlan;
}
//# sourceMappingURL=CommercePlan.d.ts.map