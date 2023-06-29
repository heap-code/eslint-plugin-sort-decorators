import { ESLintUtils } from "@typescript-eslint/utils";

// https://typescript-eslint.io/developers/custom-rules#utils-package

export const SORT_DECORATORS_NAME = "sort-decorators";

export const sortDecorators = ESLintUtils.RuleCreator(name => name)({
	create: () => {
		throw new Error("Not implemented yet");
	},
	defaultOptions: [],
	meta: {
		docs: {
			// TODO
			description: "",
			recommended: "warn",
			requiresTypeChecking: false
		},
		fixable: "code",
		messages: {
			// TODO
		},
		schema: [],
		type: "suggestion"
	},
	name: SORT_DECORATORS_NAME
});
