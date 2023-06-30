import { createSortRule } from "../lib/sort-rule";

export const SORT_ON_CLASSES_NAME = "sort-on-classes";

export const sortOnClasses = createSortRule({
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
	name: SORT_ON_CLASSES_NAME
});
