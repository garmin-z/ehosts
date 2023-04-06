declare module "@ant-design/pro-components"
declare module "@ant-design/use-emotion-css"
declare module "three-stl-loader"

// check the vite-plugin-require-transform params'type 
export type VitePluginRequireTransformParamsType = {
    //filter files that should enter the plugin
    fileRegex?: RegExp = /.ts$|.tsx$/,
    //prefix that would plugin into the requireSpecifier 
    importPrefix?= '_vite_plugin_require_transform_',
    //to deal with the requireSpecifier
    importPathHandler?: Function
}

declare module "*.stl"