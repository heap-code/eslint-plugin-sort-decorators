import { ESLintUtils } from "@typescript-eslint/utils";

import { SORT_DECORATORS_NAME, sortDecorators } from "./sort-decorators";

new ESLintUtils.RuleTester({
	parser: "@typescript-eslint/parser"
}).run(SORT_DECORATORS_NAME, sortDecorators, {
	valid: [],

	invalid: []
});
