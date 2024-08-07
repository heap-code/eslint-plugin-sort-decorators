import { AST_NODE_TYPES, TSESTree } from "@typescript-eslint/utils";

import { createSortRule, sortRuleListener } from "../lib/sort-rule";

export const SORT_ON_ACCESSORS_NAME = "sort-on-accessors";

export const sortOnAccessors = createSortRule({
	createRule: (context, [optionsWithDefault]) => {
		const { autoFix } = optionsWithDefault;

		const getDecorated = (node: TSESTree.Decorator) => {
			const { parent } = node;

			// Only get the decorated node, if it is an accessor
			if (parent?.type === AST_NODE_TYPES.MethodDefinition && parent.kind === "get") {
				return parent;
			}

			return false;
		};

		return autoFix
			? {
					// TODO: a selector for the accessors only
					Decorator(node) {
						const parent = getDecorated(node);
						if (!parent) {
							return;
						}

						const decorators = parent.decorators;

						// Run the listener only when on the first node
						if (decorators[0] === node) {
							sortRuleListener(context, decorators, optionsWithDefault);
						}
					},
				}
			: {
					Decorator(node) {
						const parent = getDecorated(node);
						if (!parent) {
							return;
						}

						const decorators = parent.decorators;

						// Get only the decorators after the current one
						const nodeIndex = decorators.findIndex(decorator => decorator === node);
						sortRuleListener(context, decorators.slice(nodeIndex), optionsWithDefault);
					},
				};
	},
	description: "Enforces order of accessors decorators",
	name: SORT_ON_ACCESSORS_NAME,
});
