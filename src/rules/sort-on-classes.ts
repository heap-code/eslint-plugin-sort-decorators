import { AST_NODE_TYPES } from "@typescript-eslint/types";

import { createSortRule, sortRuleListener } from "../lib/sort-rule";

export const SORT_ON_CLASSES_NAME = "sort-on-classes";

export const sortOnClasses = createSortRule({
	create: (context, [optionsWithDefault]) => {
		const { autoFix } = optionsWithDefault;

		return autoFix
			? {
					ClassDeclaration({ decorators }) {
						sortRuleListener(context, decorators ?? [], optionsWithDefault);
					}
			  }
			: {
					Decorator(node) {
						const { parent } = node;
						if (parent?.type !== AST_NODE_TYPES.ClassDeclaration) {
							// Only for classes decorators
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
			description: "Enforces order of class decorators"
		}
	},
	name: SORT_ON_CLASSES_NAME
});
