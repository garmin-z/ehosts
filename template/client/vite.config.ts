import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";

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
		port: 16330,
		// proxy: {// 跨域代理
		// 	"/api": {
		// 		target: "http://192.168.1.111:16033",
		// 		changeOrigin: true,
		// 		rewrite: (path) => path.replace(/^\/api/, "")
		// 	},
		// }
	},
	css: {
		postcss: {
			plugins: [
				pxToViewport({
					viewportWidth: 1280, // 视口宽度，对应设计稿宽度
					viewportHeight: 720, // 视口高度，对应设计稿高度
					unitPrecision: 3, // 指定px转换之后的小数位数
					viewportUnit: "vw", // 转换的单位
					fontViewportUnit: "vw", // 字体使用的单位
					replace: true, //  是否直接更换属性值，而不添加备用属性
					selectorBlackList: [".ignore", ".hairlines"], // 指定不转换的类
					exclude: /(\/|\\)(node_modules)(\/|\\)/, //禁止更改第三方UI框架样式
					minPixelValue: 1, // 小于或等于1px不转换
					mediaQuery: true, // 允许在媒体查询中转换
				})
			]
		}
	},
});

