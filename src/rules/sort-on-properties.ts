import { AST_NODE_TYPES } from "@typescript-eslint/types";

import { createSortRule, sortRuleListener } from "../lib/sort-rule";

export const SORT_ON_PROPERTIES_NAME = "sort-on-properties";

export const sortOnProperties = createSortRule({
	create: (context, [optionsWithDefault]) => {
		const { autoFix } = optionsWithDefault;

		return autoFix
			? {
					PropertyDefinition({ decorators }) {
						sortRuleListener(context, decorators ?? [], optionsWithDefault);
					}
			  }
			: {
					Decorator(node) {
						const { parent } = node;
						if (parent?.type !== AST_NODE_TYPES.PropertyDefinition) {
							// Only for property decorator
							return;
						}

						// eslint-disable-next-line @typescript-eslint/no-non-null-assertion -- the current node comes from there
						const decorators = parent.decorators!;

						// Get only the decorators after the current one
						const nodeIndex = decorators.findIndex(decorator => decorator === node);
						sortRuleListener(context, decorators.slice(nodeIndex), optionsWithDefault);
					}
			  };
	},
	meta: {
		docs: {
			description: "Enforces order of properties decorators"
		}
	},
	name: SORT_ON_PROPERTIES_NAME
});
