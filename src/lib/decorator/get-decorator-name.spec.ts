import { parse } from "@typescript-eslint/parser";
import { AST_NODE_TYPES } from "@typescript-eslint/types";

import { getDecoratorName } from "./get-decorator-name";

describe("getDecoratorName", () => {
	const getADecoratorNode = (decorator: string) => {
		const [classA] = parse(`@${decorator} class A {}`).body;

		if (classA.type === AST_NODE_TYPES.ClassDeclaration) {
			return classA.decorators![0];
		}

		throw new Error("Decorator is wrongly set");
	};

	const names = ["A", "B", "c", "d", "myDecorator", "YOUR_decorator", "GET", "Post"];

	it("should return the name of simple decorators", () => {
		for (const name of names) {
			const decorator = getADecoratorNode(name);
			expect(getDecoratorName(decorator)).toBe(name);
		}
	});

	describe("Decorator factories", () => {
		it("should return the name of an empty factory", () => {
			for (const name of names) {
				const decorator = getADecoratorNode(`${name}()`);
				expect(getDecoratorName(decorator)).toBe(name);
			}
		});

		it("should return the name of a factory with parameters", () => {
			for (const name of names) {
				const decorator = getADecoratorNode(`${name}("parameter", 123, {})`);
				expect(getDecoratorName(decorator)).toBe(name);
			}
		});
	});

	describe("factory of factory of ... of decorator factories", () => {
		it("should return the name of an empty factory of ... factory", () => {
			for (const name of names) {
				const decorator = getADecoratorNode(`${name}()()`);
				expect(getDecoratorName(decorator)).toBe(name);
			}
		});

		it("should return the name of a factory of ... factory with parameters", () => {
			for (const name of names) {
				const decorator = getADecoratorNode(`${name}("parameter")(123)({})`);
				expect(getDecoratorName(decorator)).toBe(name);
			}
		});
	});

	it("should fail when it is not a decorator", () => {
		expect(() =>
			getDecoratorName({
				expression: {
					elements: [],
					loc: { end: { column: 0, line: 0 }, start: { column: 0, line: 0 } },
					range: [0, 0],
					type: AST_NODE_TYPES.ArrayPattern
				},
				loc: { end: { column: 0, line: 0 }, start: { column: 0, line: 0 } },
				range: [0, 0],
				type: AST_NODE_TYPES.Decorator
			})
		).toThrow();
	});
});
