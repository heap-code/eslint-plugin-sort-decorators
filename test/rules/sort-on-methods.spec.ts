import { SORT_ON_METHODS_NAME, sortOnMethods } from "../../src/rules";
import { tester } from "../tester";

tester.run(SORT_ON_METHODS_NAME, sortOnMethods, {
	valid: [],

	invalid: []
});
