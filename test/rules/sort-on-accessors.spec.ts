import { SORT_ON_ACCESSORS_NAME, sortOnAccessors } from "../../src/rules";
import { tester } from "../tester";

tester.run(SORT_ON_ACCESSORS_NAME, sortOnAccessors, {
	valid: [],

	invalid: []
});
