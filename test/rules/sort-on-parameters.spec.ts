import { SORT_ON_PARAMETERS_NAME, sortOnParameters } from "../../src/rules";
import { tester } from "../tester";

tester.run(SORT_ON_PARAMETERS_NAME, sortOnParameters, {
	valid: [
		{
			code: `
			class MyClass {
				public run(parameter?: number) { return 0; }
			}`,
			name: "Without any decorator on parameter"
		},
		{
			code: `
			class MyClass {
				public run(parameter?: number) { return 0; }
			}`,
			name: "Without any decorator on parameter (with autoFix)",
			options: [{ autoFix: true }]
		},
		{
			code: `
			class MyClass {
				public run(
					@Single
					parameter?: number
				) { return 0; }
			}`,
			name: "Single decorator on parameter"
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
				public constructor(
					@A
					@B @C
					parameter?: number
				) { }
			}`,
			name: "Basic decorators ordering (on a constructor)"
		},
		{
			code: `
			class MyClass {
				public constructor(
					@A @B @C
					public readonly publicRO?: number,
					@A @B @C
					protected readonly protectedRO?: number,
					@A @B @C
					private readonly privateRO?: number,

					@A @B @C
					readonly ro?: number,

					@A @B @C
					public publicRW?: number,
					@A @B @C
					protected protectedRW?: number,
					@A @B @C
					private privateRW?: number,
				) { }
			}`,
			name: "Basic decorators ordering (on a constructor with accessibility modifier)"
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
		},
		{
			code: `
			@B @A @C
			class MyClass {
				@b @a @c
				public property?: number;
			}`,
			name: "Not applied if not on a parameter"
		},
		{
			code: `
			@B @A @C
			class MyClass {
				@b @a @c
				public property?: number;
			}`,
			name: "Not applied if not on a parameter (with autoFix)",
			options: [{ autoFix: true }]
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
				public constructor(
					@B
					@A
					parameter?: number
				) { }
			}`,
			errors: [{ messageId: "incorrect-order" }],
			name: "Fix simple decorators ordering (on a constructor)",
			options: [{ autoFix: true }],
			output: `
			class MyClass {
				public constructor(
					@A
					@B
					parameter?: number
				) { }
			}`
		},
		{
			code: `
			class MyClass {
				public constructor(
					@C @A @B
					public readonly publicRO?: number,
					@C @A @B
					protected readonly protectedRO?: number,
					@C @A @B
					private readonly privateRO?: number,

					@B @A @C
					readonly ro?: number,

					@C @A @B
					public publicRW?: number,
					@C @A @B
					protected protectedRW?: number,
					@C @A @B
					private privateRW?: number,
				) { }
			}`,
			errors: Array(7).fill({ messageId: "incorrect-order" }),
			name: "Fix basic decorators ordering (on a constructor with accessibility modifier)",
			options: [{ autoFix: true }],
			output: `
			class MyClass {
				public constructor(
					@A @B @C
					public readonly publicRO?: number,
					@A @B @C
					protected readonly protectedRO?: number,
					@A @B @C
					private readonly privateRO?: number,

					@A @B @C
					readonly ro?: number,

					@A @B @C
					public publicRW?: number,
					@A @B @C
					protected protectedRW?: number,
					@A @B @C
					private privateRW?: number,
				) { }
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
			errors: [{ messageId: "incorrect-order" }, { messageId: "incorrect-order" }],
			name: "Fix with multiple decorators (2 errors detected)"
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
