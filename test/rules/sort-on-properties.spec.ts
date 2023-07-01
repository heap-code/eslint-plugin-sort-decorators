import { SORT_ON_PROPERTIES_NAME, sortOnProperties } from "../../src/rules";
import { tester } from "../tester";

tester.run(SORT_ON_PROPERTIES_NAME, sortOnProperties, {
	valid: [
		{
			code: `
			class MyClass {
				@Single
				public property?: number;
			}`,
			name: "Single decorator on accessor"
		},
		{
			code: `
			class MyClass {
				@A
				@B @C
				public property?: number;
			}`,
			name: "Basic decorators ordering"
		},
		{
			code: `
			class MyClass {
				@A()
				@B(1)
				@C({}, "abc")
				public property?: number;
			}`,
			name: "Basic decorator factories ordering"
		},
		{
			code: `
			class MyClass {
				@A() @B
				@C()() @D
				public property?: number;
			}`,
			name: "Decorators mixed with factories"
		},
		{
			code: `
			class MyClass {
				@aCc
				@abd()
				public property?: number;
			}`,
			name: "Case sensitive",
			options: [{ caseSensitive: true }]
		},
		{
			code: `
			class MyClass {
				@abd() @aCc
				public property?: number;
			}`,
			name: "Case insensitive",
			options: [{ caseSensitive: false }]
		},
		{
			code: `
			class MyClass {
				@b @a @c
				protected get accessor() { return 0; }
			}`,
			name: "Not applied if not on a property"
		},
		{
			code: `
			class MyClass {
				@b @a @c
				protected get accessor() { return 0; }
			}`,
			name: "Not applied if not on a property (with autoFix)",
			options: [{ autoFix: true }]
		}
	],

	invalid: [
		{
			code: `
			class MyClass {
				@B
				@A
				public property?: number;
			}`,
			errors: [{ messageId: "incorrect-order" }],
			name: "Fix simple decorators ordering",
			options: [{ autoFix: true }],
			output: `
			class MyClass {
				@A
				@B
				public property?: number;
			}`
		},
		{
			code: `
			class MyClass {
				@C({}, "abc")
				@A()
				public property?: number;
			}`,
			errors: [{ messageId: "incorrect-order" }],
			name: "Fix basic decorator factories ordering",
			options: [{ autoFix: true }],
			output: `
			class MyClass {
				@A()
				@C({}, "abc")
				public property?: number;
			}`
		},
		{
			code: `
			class MyClass {
				@B @A()
				public property?: number;
			}`,
			errors: [{ messageId: "incorrect-order" }],
			name: "Fix decorators mixed with factories",
			options: [{ autoFix: true }],
			output: `
			class MyClass {
				@A() @B
				public property?: number;
			}`
		},
		{
			code: `
			class MyClass {
				@abd()
				@aCc
				public property?: number;
			}`,
			errors: [{ messageId: "incorrect-order" }],
			name: "Fix case sensitive",
			options: [{ autoFix: true, caseSensitive: true }],
			output: `
			class MyClass {
				@aCc
				@abd()
				public property?: number;
			}`
		},
		{
			code: `
			class MyClass {
				@aCc @abd()
				public property?: number;
			}`,
			errors: [{ messageId: "incorrect-order" }],
			name: "Fix case insensitive",
			options: [{ autoFix: true, caseSensitive: false }],
			output: `
			class MyClass {
				@abd() @aCc
				public property?: number;
			}`
		},
		{
			code: `
			class MyClass {
				@B @D @A @C
				public property?: number;
			}`,
			errors: [{ messageId: "incorrect-order" }],
			name: "Fix with multiple decorators",
			options: [{ autoFix: true }],
			output: `
			class MyClass {
				@A @B @C @D
				public property?: number;
			}`
		},
		{
			code: `
			class MyClass {
				@D @A @C @B
				public property?: number;
			}`,
			errors: [{ messageId: "incorrect-order" }],
			name: "Fix with multiple decorators (3 errors detected)",
			options: [{ autoFix: true }],
			output: `
			class MyClass {
				@A @B @C @D
				public property?: number;
			}`
		},
		{
			code: `
			class MyClass {
				@D @C @B @A
				public property?: number;
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
				@D @C @B @A
				public property?: number;
			}`,
			errors: [{ messageId: "incorrect-order" }],
			name: "Fix reverse order",
			options: [{ autoFix: true }],
			output: `
			class MyClass {
				@A @B @C @D
				public property?: number;
			}`
		},
		{
			code: `
			class MyClass {
				@D @A @C @B
				public property?: number;
			}`,
			errors: [{ messageId: "incorrect-order" }],
			name: "Fix reverse order (desc)",
			options: [{ autoFix: true, direction: "desc" }],
			output: `
			class MyClass {
				@D @C @B @A
				public property?: number;
			}`
		}
	]
});
