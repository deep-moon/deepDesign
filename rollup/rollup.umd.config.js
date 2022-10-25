import basicConfig from "./rollup.config";
import replace from "@rollup/plugin-replace";
import { terser } from "rollup-plugin-terser";
const config = {
  ...basicConfig,
  output: [
    {
      name: "DeepDesign",
      file: "dist/index.umd.js",
      format: "umd",
      exports: "named",
      globals: {
        react: "React",
        "react-dom": "ReactDom",
      },
      plugins: [terser()],
    },
  ],
  plugins: [
    replace({
      "process.env.NODE_ENV": JSON.stringify("production"),
    }),
    ...basicConfig.plugins,
  ],
  external: ["react", "react-dom"],
};
export default config;
