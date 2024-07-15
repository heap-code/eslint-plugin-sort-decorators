import { AST_NODE_TYPES } from "@typescript-eslint/utils";

import { createSortRule, sortRuleListener } from "../lib/sort-rule";

export const SORT_ON_METHODS_NAME = "sort-on-methods";

export const sortOnMethods = createSortRule({
	createRule: (context, [optionsWithDefault]) => {
		const { autoFix } = optionsWithDefault;

		return autoFix
			? {
					MethodDefinition({ decorators, kind }) {
						if (kind !== "method") {
							// Ignore if not a method
							return;
						}

						sortRuleListener(context, decorators ?? [], optionsWithDefault);
					},
				}
			: {
					Decorator(node) {
						const { parent } = node;
						if (parent?.type !== AST_NODE_TYPES.MethodDefinition) {
							// Only for methods decorators
							return;
						}

						const decorators = parent.decorators;

						// Get only the decorators after the current one
						const nodeIndex = decorators.findIndex(decorator => decorator === node);
						sortRuleListener(context, decorators.slice(nodeIndex), optionsWithDefault);
					},
				};
	},
	description: "Enforces order of methods decorators",
	name: SORT_ON_METHODS_NAME,
});
