import { AST_NODE_TYPES } from "@typescript-eslint/types";
import { TSESTree } from "@typescript-eslint/utils";

import { createSortRule, sortRuleListener } from "../lib/sort-rule";

export const SORT_ON_PARAMETERS_NAME = "sort-on-parameters";

export const sortOnParameters = createSortRule({
	create: (context, [optionsWithDefault]) => {
		const { autoFix } = optionsWithDefault;

		const getDecorated = (node: TSESTree.Decorator) => {
			const { parent } = node;

			// Only get the decorated node, if it is on a method
			if (
				parent?.type === AST_NODE_TYPES.TSParameterProperty ||
				(parent?.type === AST_NODE_TYPES.Identifier &&
					parent.parent?.type === AST_NODE_TYPES.FunctionExpression)
			) {
				return parent;
			}

			return false;
		};

		return autoFix
			? {
					// TODO: a selector for the parameters only
					Decorator(node) {
						const parent = getDecorated(node);
						if (!parent) {
							return;
						}

						// eslint-disable-next-line @typescript-eslint/no-non-null-assertion -- the current node comes from there
						const decorators = parent.decorators!;

						// Run the listener only when on the first node
						if (decorators[0] === node) {
							sortRuleListener(context, decorators, optionsWithDefault);
						}
					}
			  }
			: {
					Decorator(node) {
						const parent = getDecorated(node);
						if (!parent) {
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
			description: "Enforces order of parameters decorators"
		}
	},
	name: SORT_ON_PARAMETERS_NAME
});
