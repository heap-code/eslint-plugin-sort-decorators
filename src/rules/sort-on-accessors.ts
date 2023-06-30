import { ESLintUtils } from "@typescript-eslint/utils";

export const SORT_ON_ACCESSORS_NAME = "sort-on-accessors";

export const sortOnAccessors = ESLintUtils.RuleCreator(name => name)({
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
	name: SORT_ON_ACCESSORS_NAME
});
