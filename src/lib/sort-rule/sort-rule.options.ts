export interface SortRuleOptions {
	/**
	 * Automatically fix the order.
	 * When set to `true`, only one error is reported and the whole set of decorators is fixed.
	 *
	 * @default false
	 */
	autoFix?: boolean;
	/**
	 * If true, enforce properties to be in case-sensitive order.
	 *
	 * @default true
	 */
	caseSensitive?: boolean;
	/**
	 * Specify the direction of the ordering.
	 *
	 * @default "asc"
	 */
	direction?: "asc" | "desc";
}
