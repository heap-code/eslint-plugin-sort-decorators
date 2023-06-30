import { SORT_ON_PARAMETERS_NAME, sortOnParameters } from "../../src/rules";
import { tester } from "../tester";

tester.run(SORT_ON_PARAMETERS_NAME, sortOnParameters, {
	valid: [],

	invalid: []
});
