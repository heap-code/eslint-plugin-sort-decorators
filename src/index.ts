import { TSESLint } from "@typescript-eslint/utils";

import { SORT_DECORATORS_NAME, sortDecorators } from "./rules";

export default {
	rules: {
		[SORT_DECORATORS_NAME]: sortDecorators
	}
} satisfies TSESLint.Linter.Plugin;
