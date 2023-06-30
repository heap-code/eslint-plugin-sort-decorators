import { SORT_ON_PARAMETERS_NAME, sortOnParameters } from "../../src/rules";
import { tester } from "../tester";

tester.run(SORT_ON_PARAMETERS_NAME, sortOnParameters, {
	valid: [
		{
			code: `
			class MyClass {
				public run(
					@Single
					parameter?: number
				) { return 0; }
			}`,
			name: "Single decorator on accessor"
		},
		{
			code: `
			class MyClass {
				public run(
					@A
					@B @C
					parameter?: number
				) { return 0; }
			}`,
			name: "Basic decorators ordering"
		},
		{
			code: `
			class MyClass {
				public run(
					@A()
					@B(1)
					@C({}, "abc")
					parameter?: number
				) { return 0; }
			}`,
			name: "Basic decorator factories ordering"
		},
		{
			code: `
			class MyClass {
				public run(
					@A() @B
					@C()() @D
					parameter?: number
				) { return 0; }
			}`,
			name: "Decorators mixed with factories"
		},
		{
			code: `
			class MyClass {
				public run(
					@aCc
					@abd()
					parameter?: number
				) { return 0; }
			}`,
			name: "Case sensitive",
			options: [{ caseSensitive: true }]
		},
		{
			code: `
			class MyClass {
				public run(
					@abd() @aCc
					parameter?: number
				) { return 0; }
			}`,
			name: "Case insensitive",
			options: [{ caseSensitive: false }]
		}
	],

	invalid: [
		{
			code: `
			class MyClass {
				public run(
					@B
					@A
					parameter?: number
				) { return 0; }
			}`,
			errors: [{ messageId: "incorrect-order" }],
			name: "Fix simple decorators ordering",
			options: [{ autoFix: true }],
			output: `
			class MyClass {
				public run(
					@A
					@B
					parameter?: number
				) { return 0; }
			}`
		},
		{
			code: `
			class MyClass {
				public run(
					@C({}, "abc")
					@A()
					parameter?: number
				) { return 0; }
			}`,
			errors: [{ messageId: "incorrect-order" }],
			name: "Fix basic decorator factories ordering",
			options: [{ autoFix: true }],
			output: `
			class MyClass {
				public run(
					@A()
					@C({}, "abc")
					parameter?: number
				) { return 0; }
			}`
		},
		{
			code: `
			class MyClass {
				public run(
					@B @A()
					parameter?: number
				) { return 0; }
			}`,
			errors: [{ messageId: "incorrect-order" }],
			name: "Fix decorators mixed with factories",
			options: [{ autoFix: true }],
			output: `
			class MyClass {
				public run(
					@A() @B
					parameter?: number
				) { return 0; }
			}`
		},
		{
			code: `
			class MyClass {
				public run(
					@abd()
					@aCc
					parameter?: number
				) { return 0; }
			}`,
			errors: [{ messageId: "incorrect-order" }],
			name: "Fix case sensitive",
			options: [{ autoFix: true, caseSensitive: true }],
			output: `
			class MyClass {
				public run(
					@aCc
					@abd()
					parameter?: number
				) { return 0; }
			}`
		},
		{
			code: `
			class MyClass {
				public run(
					@aCc @abd()
					parameter?: number
				) { return 0; }
			}`,
			errors: [{ messageId: "incorrect-order" }],
			name: "Fix case insensitive",
			options: [{ autoFix: true, caseSensitive: false }],
			output: `
			class MyClass {
				public run(
					@abd() @aCc
					parameter?: number
				) { return 0; }
			}`
		},
		{
			code: `
			class MyClass {
				public run(
					@B @D @A @C
					parameter?: number
				) { return 0; }
			}`,
			errors: [{ messageId: "incorrect-order" }],
			name: "Fix with multiple decorators",
			options: [{ autoFix: true }],
			output: `
			class MyClass {
				public run(
					@A @B @C @D
					parameter?: number
				) { return 0; }
			}`
		},
		{
			code: `
			class MyClass {
				public run(
					@D @A @C @B
					parameter?: number
				) { return 0; }
			}`,
			errors: [
				{ messageId: "incorrect-order" },
				{ messageId: "incorrect-order" },
				{ messageId: "incorrect-order" }
			],
			name: "Fix with multiple decorators (3 errors detected)"
		},
		{
			code: `
			class MyClass {
				public run(
					@D @A @C @B
					parameter?: number
				) { return 0; }
			}`,
			errors: [{ messageId: "incorrect-order" }],
			name: "Fix with multiple decorators (2 errors detected)",
			options: [{ autoFix: true }],
			output: `
			class MyClass {
				public run(
					@A @B @C @D
					parameter?: number
				) { return 0; }
			}`
		},
		{
			code: `
			class MyClass {
				public run(
					@D @C @B @A
					parameter?: number
				) { return 0; }
			}`,
			errors: [
				{ messageId: "incorrect-order" },
				{ messageId: "incorrect-order" },
				{ messageId: "incorrect-order" }
			],
			name: "Reverse order"
		},
		{
			code: `
			class MyClass {
				public run(
					@D @C @B @A
					parameter?: number
				) { return 0; }
			}`,
			errors: [{ messageId: "incorrect-order" }],
			name: "Fix reverse order",
			options: [{ autoFix: true }],
			output: `
			class MyClass {
				public run(
					@A @B @C @D
					parameter?: number
				) { return 0; }
			}`
		},
		{
			code: `
			class MyClass {
				public run(
					@D @A @C @B
					parameter?: number
				) { return 0; }
			}`,
			errors: [{ messageId: "incorrect-order" }],
			name: "Fix reverse order (desc)",
			options: [{ autoFix: true, direction: "desc" }],
			output: `
			class MyClass {
				public run(
					@D @C @B @A
					parameter?: number
				) { return 0; }
			}`
		}
	]
});
