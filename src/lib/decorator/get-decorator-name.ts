import { TSESTree } from "@typescript-eslint/utils";

/**
 * @param decorator the decorator node to get the name from
 * @returns the name of the given decorator
 */
export function getDecoratorName(decorator: TSESTree.Decorator): string {
	const getName = (expression: typeof decorator.expression): string => {
		switch (expression.type) {
			case TSESTree.AST_NODE_TYPES.CallExpression:
				return getName(expression.callee as never);

			case TSESTree.AST_NODE_TYPES.Identifier:
				return expression.name;
		}

		throw new Error("Not a valid decorator.");
	};

	return getName(decorator.expression);
}
