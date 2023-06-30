import { SORT_ON_PROPERTIES_NAME, sortOnProperties } from "../../src/rules";
import { tester } from "../tester";

tester.run(SORT_ON_PROPERTIES_NAME, sortOnProperties, {
	valid: [],

	invalid: []
});
