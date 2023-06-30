import { ESLintUtils, TSESLint } from "@typescript-eslint/utils";

import { SortRuleMessageIds } from "./sort-rule.message-ids";
import { SortRuleOptions } from "./sort-rule.options";

type SortRule = ESLintUtils.RuleWithMetaAndName<
	[SortRuleOptions],
	SortRuleMessageIds,
	TSESLint.RuleListener
>;

/**
 * The information to create a "sort-decorators" rule
 */
export interface SortRuleWithMetaAndName extends Omit<SortRule, "defaultOptions" | "meta"> {
	meta: Omit<SortRule["meta"], "fixable" | "messages" | "schema" | "type">;
}

const sortRuleCreator = ESLintUtils.RuleCreator(name => name);

/**
 * @param ruleMeta the parameter to create a rule
 * @returns the created rule
 */
export function createSortRule(ruleMeta: SortRuleWithMetaAndName) {
	return sortRuleCreator({
		...ruleMeta,
		defaultOptions: [{ caseSensitive: true }],
		meta: {
			...ruleMeta.meta,
			fixable: "code",
			messages: {
				"incorrect-order":
					"Decorator {{ decorator }} should be placed before {{ previousDecorator }}."
			},
			schema: {
				// TODO
			},
			type: "layout"
		}
	});
}
