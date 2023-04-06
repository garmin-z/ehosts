import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";

import { visualizer } from "rollup-plugin-visualizer";
import postcss from "rollup-plugin-postcss";
import pxToViewport from "postcss-px-to-viewport";
import {createStyleImportPlugin, AntdResolve} from "vite-plugin-style-import";

// https://vitejs.dev/config/
export default defineConfig({
	plugins: [
		react(),
		// visualizer({ open: true }),
		createStyleImportPlugin({
			resolves:[AntdResolve()]
		}),
		// postcss({
		// 	plugins: [
		// 		pxToViewport({
		// 			unitToConvert: "px",
		// 			viewportWidth: 750,
		// 			viewportHeight: 1334,
		// 			unitPrecision: 5,
		// 			propList: ["*"],
		// 			viewportUnit: "vw",
		// 			fontViewportUnit: "vw",
		// 			selectorBlackList: [],
		// 			minPixelValue: 1,
		// 			mediaQuery: false,
		// 			replace: true,
		// 			exclude: /node_modules/,
		// 			include: undefined,
		// 			landscape: false,
		// 			landscapeUnit: "vw",
		// 			landscapeWidth: 568
		// 		})
		// 	]
		// })
	],
	build: {

	},
	resolve: {
		alias: {
			"@": path.resolve(__dirname, "src"),
		}
	},
	server: {
		hmr: {
			overlay: false,
		},
		port: 16033,
		proxy: {// 跨域代理
			"/apis": {
				target: "http://192.168.1.111:3001",
				changeOrigin: true,
				rewrite: (path) => path.replace(/^\/apis/, "")
			},
		}
	}

});

