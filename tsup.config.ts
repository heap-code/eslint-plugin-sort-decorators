// tsup.config.ts
import { defineConfig } from "tsup";

export default defineConfig({
	clean: true,
	dts: true,
	entry: ["./src/index.ts"],
	minify: true,
	outDir: "./dist",
	sourcemap: true,
	treeshake: true,
	tsconfig: "./tsconfig.json",
});
