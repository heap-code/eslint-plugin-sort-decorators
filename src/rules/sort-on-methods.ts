import { createSortRule } from "../lib/sort-rule";

export const SORT_ON_METHODS_NAME = "sort-on-methods";

export const sortOnMethods = createSortRule({
	create: () => {
		throw new Error("Not implemented yet");
	},
	meta: {
		docs: {
			// TODO
			description: "",
			recommended: "warn",
			requiresTypeChecking: false
		}
	},
	name: SORT_ON_METHODS_NAME
});
