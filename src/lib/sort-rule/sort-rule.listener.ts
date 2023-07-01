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

	// Get the name of a decorator given the options
	const getName = (decorator: TSESTree.Decorator) => {
		const name = getDecoratorName(decorator);
		return caseSensitive ? name : name.toLowerCase();
	};

	// The comparator of names
	const compare = (a: string, b: string) => {
		// swap parameters when the direction is reverted
		[a, b] = direction === "desc" ? [b, a] : [a, b];

		// `localCompare` messes with the upperCase
		if (a === b) {
			return 0;
		}

		return a < b ? -1 : 1;
	};

	// Get the decorator names only once
	const decoratorsWithName = decorators.map(decorator => ({
		name: getName(decorator),
		node: decorator
	}));

	const createFix = (fixer: TSESLint.RuleFixer, decorators: typeof decoratorsWithName) => {
		// Chunk of code strongly inspired from:
		// https://github.com/mthadley/eslint-plugin-sort-destructure-keys/blob/ccb0d52cb48a55668aff209e1cec4197a16bd23b/lib/rules/sort-destructure-keys.js#L158

		const sourceCode = context.getSourceCode();
		const sourceText = sourceCode.getText();

		const sorted = decorators
			.slice()
			.sort(({ name: a }, { name: b }) => compare(a, b))
			.map(({ node }) => node);

		const newText = sorted.map((child, i) => {
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
			[decorators[0].node.range[0], decorators[decorators.length - 1].node.range[1]],
			newText.join("")
		);
	};

	const sortRule = (decorators: typeof decoratorsWithName) => {
		if (decorators.length <= 1) {
			// Nothing to test when there is less than 1 decorator
			return;
		}

		const [{ name: currentName }, ...remaining] = decorators;

		for (const { name, node } of remaining) {
			if (compare(currentName, name) > 0) {
				context.report({
					data: {
						after: name,
						previous: currentName
					},
					fix: autoFix ? fixer => createFix(fixer, decorators) : undefined,
					messageId: "incorrect-order",
					node
				});

				return;
			}
		}

		if (autoFix) {
			// On autoFix, all decorators are tested to be able to fix them all
			sortRule(decorators.slice(1));
		}
	};

	sortRule(decoratorsWithName);
}
