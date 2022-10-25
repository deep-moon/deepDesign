import { nodeResolve } from "@rollup/plugin-node-resolve";
import json from "@rollup/plugin-json";
import typescript from "rollup-plugin-typescript2";
import commonjs from "@rollup/plugin-commonjs";
import sass from "rollup-plugin-sass";

const overrides = {
  compilerOptions: {
    declaration: true,
  },
  exclude: [
    "src/**/*.test.tsx",
    "src/**/*.stories.tsx",
    "src/**/*.stories.mdx",
    "src/setupTest.ts",
  ],
};
const config = {
  // entry
  input: "src/index.tsx",
  plugins: [
    json(),
    commonjs(),
    typescript({
      tsconfigOverride: overrides,
    }),
    nodeResolve(),
    sass({
      output: "dist/index.css",
    }),
  ],
};
export default config;
