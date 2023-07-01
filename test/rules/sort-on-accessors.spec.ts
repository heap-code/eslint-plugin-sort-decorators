import { SORT_ON_ACCESSORS_NAME, sortOnAccessors } from "../../src/rules";
import { tester } from "../tester";

tester.run(SORT_ON_ACCESSORS_NAME, sortOnAccessors, {
	valid: [
		{
			code: `
			class MyClass {
				@Single
				public get accessor() { return 0; }
			}`,
			name: "Single decorator on accessor"
		},
		{
			code: `
			class MyClass {
				@A
				@B @C
				public get accessor() { return 0; }
			}`,
			name: "Basic decorators ordering"
		},
		{
			code: `
			class MyClass {
				@A()
				@B(1)
				@C({}, "abc")
				public get accessor() { return 0; }
			}`,
			name: "Basic decorator factories ordering"
		},
		{
			code: `
			class MyClass {
				@A() @B
				@C()() @D
				public get accessor() { return 0; }
			}`,
			name: "Decorators mixed with factories"
		},
		{
			code: `
			class MyClass {
				@aCc
				@abd()
				public get accessor() { return 0; }
			}`,
			name: "Case sensitive",
			options: [{ caseSensitive: true }]
		},
		{
			code: `
			class MyClass {
				@abd() @aCc
				public get accessor() { return 0; }
			}`,
			name: "Case insensitive",
			options: [{ caseSensitive: false }]
		},
		{
			code: `
			@B @A @C
			class MyClass {
				@b @a @c
				public property?: number;
			}`,
			name: "Not applied if not on an accessor"
		},
		{
			code: `
			@B @A @C
			class MyClass {
				@b @a @c
				public property?: number;
			}`,
			name: "Not applied if not on an accessor (with autoFix)",
			options: [{ autoFix: true }]
		}
	],

	invalid: [
		{
			code: `
			class MyClass {
				@B
				@A
				public get accessor() { return 0; }
			}`,
			errors: [{ messageId: "incorrect-order" }],
			name: "Fix simple decorators ordering",
			options: [{ autoFix: true }],
			output: `
			class MyClass {
				@A
				@B
				public get accessor() { return 0; }
			}`
		},
		{
			code: `
			class MyClass {
				@C({}, "abc")
				@A()
				public get accessor() { return 0; }
			}`,
			errors: [{ messageId: "incorrect-order" }],
			name: "Fix basic decorator factories ordering",
			options: [{ autoFix: true }],
			output: `
			class MyClass {
				@A()
				@C({}, "abc")
				public get accessor() { return 0; }
			}`
		},
		{
			code: `
			class MyClass {
				@B @A()
				public get accessor() { return 0; }
			}`,
			errors: [{ messageId: "incorrect-order" }],
			name: "Fix decorators mixed with factories",
			options: [{ autoFix: true }],
			output: `
			class MyClass {
				@A() @B
				public get accessor() { return 0; }
			}`
		},
		{
			code: `
			class MyClass {
				@abd()
				@aCc
				public get accessor() { return 0; }
			}`,
			errors: [{ messageId: "incorrect-order" }],
			name: "Fix case sensitive",
			options: [{ autoFix: true, caseSensitive: true }],
			output: `
			class MyClass {
				@aCc
				@abd()
				public get accessor() { return 0; }
			}`
		},
		{
			code: `
			class MyClass {
				@aCc @abd()
				public get accessor() { return 0; }
			}`,
			errors: [{ messageId: "incorrect-order" }],
			name: "Fix case insensitive",
			options: [{ autoFix: true, caseSensitive: false }],
			output: `
			class MyClass {
				@abd() @aCc
				public get accessor() { return 0; }
			}`
		},
		{
			code: `
			class MyClass {
				@B @D @A @C
				public get accessor() { return 0; }
			}`,
			errors: [{ messageId: "incorrect-order" }],
			name: "Fix with multiple decorators",
			options: [{ autoFix: true }],
			output: `
			class MyClass {
				@A @B @C @D
				public get accessor() { return 0; }
			}`
		},
		{
			code: `
			class MyClass {
				@D @A @C @B
				public get accessor() { return 0; }
			}`,
			errors: [{ messageId: "incorrect-order" }, { messageId: "incorrect-order" }],
			name: "Fix with multiple decorators (2 errors detected)"
		},
		{
			code: `
			class MyClass {
				@D @A @C @B
				public get accessor() { return 0; }
			}`,
			errors: [{ messageId: "incorrect-order" }],
			name: "Fix with multiple decorators",
			options: [{ autoFix: true }],
			output: `
			class MyClass {
				@A @B @C @D
				public get accessor() { return 0; }
			}`
		},
		{
			code: `
			class MyClass {
				@D @C @B @A
				public get accessor() { return 0; }
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
				public get accessor() { return 0; }
			}`,
			errors: [{ messageId: "incorrect-order" }],
			name: "Fix reverse order",
			options: [{ autoFix: true }],
			output: `
			class MyClass {
				@A @B @C @D
				public get accessor() { return 0; }
			}`
		},
		{
			code: `
			class MyClass {
				@D @A @C @B
				public get accessor() { return 0; }
			}`,
			errors: [{ messageId: "incorrect-order" }],
			name: "Fix reverse order (desc)",
			options: [{ autoFix: true, direction: "desc" }],
			output: `
			class MyClass {
				@D @C @B @A
				public get accessor() { return 0; }
			}`
		}
	]
});
