import { createSortRule } from "../lib/sort-rule";

export const SORT_ON_PARAMETERS_NAME = "sort-on-parameters";

export const sortOnParameters = createSortRule({
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
	name: SORT_ON_PARAMETERS_NAME
});
