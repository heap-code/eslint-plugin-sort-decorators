import { LeftHandSideExpression } from "@typescript-eslint/types/dist/generated/ast-spec";
import { AST_NODE_TYPES, TSESTree } from "@typescript-eslint/utils";

/**
 * @param decorator the decorator node to get the name from
 * @returns the name of the given decorator
 */
export function getDecoratorName(decorator: TSESTree.Decorator): string {
	const getName = (expression: LeftHandSideExpression): string => {
		switch (expression.type) {
			case AST_NODE_TYPES.CallExpression:
				return getName(expression.callee);

			case AST_NODE_TYPES.Identifier:
				return expression.name;
		}

		throw new Error("Not a valid decorator.");
	};

	return getName(decorator.expression);
}
