import { SORT_ON_CLASSES_NAME, sortOnClasses } from "../../src/rules";
import { tester } from "../tester";

tester.run(SORT_ON_CLASSES_NAME, sortOnClasses, {
	valid: [
		{
			code: `
			@Single
			class MyClass {}`,
			name: "Single decorator on accessor"
		},
		{
			code: `
			@A
			@B @C
			class MyClass {}`,
			name: "Basic decorators ordering"
		},
		{
			code: `
			@A()
			@B(1)
			@C({}, "abc")
			class MyClass {}`,
			name: "Basic decorator factories ordering"
		},
		{
			code: `
			@A() @B
			@C()() @D
			class MyClass {}`,
			name: "Decorators mixed with factories"
		},
		{
			code: `
			@aCc
			@abd()
			class MyClass {}`,
			name: "Case sensitive",
			options: [{ caseSensitive: true }]
		},
		{
			code: `
			@abd() @aCc
			class MyClass {}`,
			name: "Case insensitive",
			options: [{ caseSensitive: false }]
		},
		{
			code: `
			@a @bc @bc @d
			class MyClass {}`,
			name: "Duplicated names"
		},
		{
			code: `
			class MyClass {
				@b @a @c
				public run() { return 0; }
			}`,
			name: "Not applied if not on a class"
		},
		{
			code: `
			class MyClass {
				@b @a @c
				public run() { return 0; }
			}`,
			name: "Not applied if not on a class (with autoFix)",
			options: [{ autoFix: true }]
		}
	],

	invalid: [
		{
			code: `
			@B
			@A
			class MyClass {}`,
			errors: [{ messageId: "incorrect-order" }],
			name: "Fix simple decorators ordering",
			options: [{ autoFix: true }],
			output: `
			@A
			@B
			class MyClass {}`
		},
		{
			code: `
			@C({}, "abc")
			@A()
			class MyClass {}`,
			errors: [{ messageId: "incorrect-order" }],
			name: "Fix basic decorator factories ordering",
			options: [{ autoFix: true }],
			output: `
			@A()
			@C({}, "abc")
			class MyClass {}`
		},
		{
			code: `
			@B @A()
			class MyClass {}`,
			errors: [{ messageId: "incorrect-order" }],
			name: "Fix decorators mixed with factories",
			options: [{ autoFix: true }],
			output: `
			@A() @B
			class MyClass {}`
		},
		{
			code: `
			@abd()
			@aCc
			class MyClass {}`,
			errors: [{ messageId: "incorrect-order" }],
			name: "Fix case sensitive",
			options: [{ autoFix: true, caseSensitive: true }],
			output: `
			@aCc
			@abd()
			class MyClass {}`
		},
		{
			code: `
			@aCc @abd()
			class MyClass {}`,
			errors: [{ messageId: "incorrect-order" }],
			name: "Fix case insensitive",
			options: [{ autoFix: true, caseSensitive: false }],
			output: `
			@abd() @aCc
			class MyClass {}`
		},
		{
			code: `
			@B @D @A @C
			class MyClass {}`,
			errors: [{ messageId: "incorrect-order" }],
			name: "Fix with multiple decorators",
			options: [{ autoFix: true }],
			output: `
			@A @B @C @D
			class MyClass {}`
		},
		{
			code: `
			@D @A @C @B
			class MyClass {}`,
			errors: [{ messageId: "incorrect-order" }, { messageId: "incorrect-order" }],
			name: "With multiple decorators (2 errors detected)"
		},
		{
			code: `
			@D @A @C @B
			class MyClass {}`,
			errors: [{ messageId: "incorrect-order" }],
			name: "Fix with multiple decorators",
			options: [{ autoFix: true }],
			output: `
			@A @B @C @D
			class MyClass {}`
		},
		{
			code: `
			@D @C @B @A
			class MyClass {}`,
			errors: [
				{ messageId: "incorrect-order" },
				{ messageId: "incorrect-order" },
				{ messageId: "incorrect-order" }
			],
			name: "Reverse order"
		},
		{
			code: `
			@D @C @B @A
			class MyClass {}`,
			errors: [{ messageId: "incorrect-order" }],
			name: "Fix reverse order",
			options: [{ autoFix: true }],
			output: `
			@A @B @C @D
			class MyClass {}`
		},
		{
			code: `
			@D @A @C @B
			class MyClass {}`,
			errors: [{ messageId: "incorrect-order" }],
			name: "Fix reverse order (desc)",
			options: [{ autoFix: true, direction: "desc" }],
			output: `
			@D @C @B @A
			class MyClass {}`
		},
		{
			code: `
			@D @A @C @A
			class MyClass {}`,
			errors: [{ messageId: "incorrect-order" }],
			name: "Fix with duplicated names",
			options: [{ autoFix: true }],
			output: `
			@A @A @C @D
			class MyClass {}`
		}
	]
});
