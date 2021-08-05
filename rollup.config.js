import resolve from "@rollup/plugin-node-resolve";
import { babel } from "@rollup/plugin-babel";
import { terser } from "rollup-plugin-terser";

let developmentMode = !!process.env.ROLLUP_WATCH;

const config = {
	input: "./src/app.js",
	output: {
		entryFileNames: `[${developmentMode ? "name" : "hash"}].js`,
		chunkFileNames: `[${developmentMode ? "name" : "hash"}].js`,
		assetFileNames: `[${developmentMode ? "name" : "hash"}][extname]`,
		format: "es",
		dir: "dist",
		plugins: [],
	},

	preserveEntrySignatures: false,
	treeshake: !developmentMode,

	plugins: [
		resolve({
			customResolveOptions: {
				moduleDirectories: ["node_modules"],
			},
		}),

		babel({
			babelHelpers: "bundled",
			compact: true,
			presets: [
				[
					require.resolve("@babel/preset-env"),
					{
						targets: ["defaults", "not ie 11", "not ie_mob 11"],
						useBuiltIns: false,
						shippedProposals: true,
						modules: false,
						bugfixes: true,
					},
				],
			],
		}),

		// minify js code
		!developmentMode &&
			terser({
				format: { comments: false },
			}),
	].filter(Boolean),
};

export default config;
