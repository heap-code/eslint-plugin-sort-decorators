import { ESLintUtils } from "@typescript-eslint/utils";

import { SortRuleMessageIds } from "./sort-rule.message-ids";
import { SortRuleOptions } from "./sort-rule.options";
import schema from "./sort-rule.options.schema.json";

type SortRule = ESLintUtils.RuleWithMetaAndName<[SortRuleOptions], SortRuleMessageIds>;

/** The information to create a "sort-decorators" rule */
export interface SortRuleParams {
	createRule: SortRule["create"];
	description: SortRule["meta"]["docs"]["description"];
	name: SortRule["name"];
}

const sortRuleCreator = ESLintUtils.RuleCreator<{ requiresTypeChecking: boolean }>(name => name);

/**
 * @param rule the parameter to create a rule
 * @returns the created rule
 */
export function createSortRule(rule: SortRuleParams) {
	return sortRuleCreator({
		create: rule.createRule,
		defaultOptions: [{ autoFix: false, caseSensitive: true, direction: "asc" }],
		meta: {
			schema: [schema as never],

			docs: { description: rule.description, requiresTypeChecking: false },
			fixable: "code",
			messages: {
				"incorrect-order":
					"Expected decorators to be in sorted order. `@{{ after }}` should be before `@{{ previous }}`.",
			},
			type: "layout",
		},
		name: rule.name,
	});
}
