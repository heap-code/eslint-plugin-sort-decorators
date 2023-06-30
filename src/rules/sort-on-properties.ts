import { createSortRule } from "../lib/sort-rule";

export const SORT_ON_PROPERTIES_NAME = "sort-on-properties";

export const sortOnProperties = createSortRule({
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
	name: SORT_ON_PROPERTIES_NAME
});
