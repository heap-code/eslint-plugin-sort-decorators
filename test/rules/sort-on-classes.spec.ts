import { SORT_ON_CLASSES_NAME, sortOnClasses } from "../../src/rules/sort-on-classes";
import { tester } from "../tester";

tester.run(SORT_ON_CLASSES_NAME, sortOnClasses, {
	valid: [],

	invalid: []
});
