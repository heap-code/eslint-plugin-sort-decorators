import { createSortRule } from "../lib/sort-rule";

export const SORT_ON_ACCESSORS_NAME = "sort-on-accessors";

export const sortOnAccessors = createSortRule({
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
	name: SORT_ON_ACCESSORS_NAME
});
