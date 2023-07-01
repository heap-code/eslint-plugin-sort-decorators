import { TSESTree, TSESLint } from "@typescript-eslint/utils";

import { SortRuleMessageIds } from "./sort-rule.message-ids";
import { SortRuleOptions } from "./sort-rule.options";
import { getDecoratorName } from "../decorator";

/**
 * The rule listener for sorting the decorators
 *
 * @param context the context the rule is listening
 * @param decorators the decorators to test (and fix)
 * @param options the rule options
 */
export function sortRuleListener(
	context: TSESLint.RuleContext<SortRuleMessageIds, [SortRuleOptions]>,
	decorators: TSESTree.Decorator[],
	options: SortRuleOptions
) {
	const { autoFix, caseSensitive, direction } = options;

	// Get the name of a decorator
	const getName = (decorator: TSESTree.Decorator) => {
		const name = getDecoratorName(decorator);
		return caseSensitive ? name : name.toLowerCase();
	};

	const compare = (a: string, b: string) => {
		const [a1, b1] = direction === "desc" ? [b, a] : [a, b];

		// `localCompare` messes with the upperCase
		if (a1 === b1) {
			return 0;
		}

		return a1 < b1 ? -1 : 1;
	};

	const decoratorsWithName = decorators.map(decorator => ({
		name: getName(decorator),
		node: decorator
	}));

	const sortRule = (decorators: typeof decoratorsWithName) => {
		if (decorators.length <= 1) {
			return;
		}

		const [{ name: currentName, node: currentNode }, ...remaining] = decorators;

		for (const { name } of remaining) {
			if (compare(currentName, name) > 0) {
				context.report({
					fix: autoFix
						? fixer => {
								const sourceCode = context.getSourceCode();
								const sourceText = sourceCode.getText();

								const sorted = decorators
									.slice()
									.sort(({ name: a }, { name: b }) => compare(a, b));

								const newText = sorted.map(({ node: child }, i) => {
									const textAfter =
										i === sorted.length - 1
											? // If it's the last item, there's no text after to append.
											  ""
											: // Otherwise, we need to grab the text after the original node.
											  sourceText.slice(
													decorators[i].node.range[1], // End index of the current node .
													decorators[i + 1].node.range[0] // Start index of the next node.
											  );

									return sourceCode.getText(child) + textAfter;
								});

								return fixer.replaceTextRange(
									[
										decorators[0].node.range[0],
										decorators[decorators.length - 1].node.range[1]
									],
									newText.join("")
								);
						  }
						: undefined,
					messageId: "incorrect-order",
					node: currentNode
				});

				return;
			}
		}

		if (autoFix) {
			sortRule(decorators.slice(1));
		}
	};

	sortRule(decoratorsWithName);
}
