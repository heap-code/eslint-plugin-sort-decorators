import { AST_NODE_TYPES } from "@typescript-eslint/utils";

import { createSortRule, sortRuleListener } from "../lib/sort-rule";

export const SORT_ON_PROPERTIES_NAME = "sort-on-properties";

export const sortOnProperties = createSortRule({
	createRule: (context, [optionsWithDefault]) => {
		const { autoFix } = optionsWithDefault;

		return autoFix
			? {
					PropertyDefinition({ decorators }) {
						sortRuleListener(context, decorators ?? [], optionsWithDefault);
					},
				}
			: {
					Decorator(node) {
						const { parent } = node;
						if (parent?.type !== AST_NODE_TYPES.PropertyDefinition) {
							// Only for property decorator
							return;
						}

						const decorators = parent.decorators;

						// Get only the decorators after the current one
						const nodeIndex = decorators.findIndex(decorator => decorator === node);
						sortRuleListener(context, decorators.slice(nodeIndex), optionsWithDefault);
					},
				};
	},
	description: "Enforces order of properties decorators",
	name: SORT_ON_PROPERTIES_NAME,
});
