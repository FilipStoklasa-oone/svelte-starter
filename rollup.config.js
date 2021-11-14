import svelte from "rollup-plugin-svelte";
import commonjs from "@rollup/plugin-commonjs";
import resolve from "@rollup/plugin-node-resolve";
import livereload from "rollup-plugin-livereload";
import { terser } from "rollup-plugin-terser";
import sveltePreprocess from "svelte-preprocess";
import typescript from "@rollup/plugin-typescript";
import css from "rollup-plugin-css-only";

const production = process.env.NODE_ENV === "production";

export default [
  // Client bundle
  {
    input: "src/main.ts",
    output: {
      sourcemap: true,
      format: "iife",
      name: "app",
      file: "public/build/bundle.js",
    },
    plugins: [
      svelte({
        preprocess: sveltePreprocess({
          sourceMap: !production,
          postcss: {
            plugins: [require("tailwindcss"), require("autoprefixer")],
          },
        }),
        compilerOptions: {
          hydratable: true,
          dev: !production,
        },
      }),
      css({ output: "bundle.css" }),
      resolve({
        browser: true,
        dedupe: ["svelte"],
      }),
      commonjs(),
      typescript({
        sourceMap: !production,
        inlineSources: !production,
      }),
      !production &&
        livereload({
          watch: "public/App.js",
          delay: 200,
        }),
      production && terser(),
    ],
  },
  // Server bundle
  {
    input: "src/App.svelte",
    output: {
      exports: "default",
      sourcemap: false,
      format: "cjs",
      name: "app",
      file: "public/App.js",
    },
    plugins: [
      svelte({
        compilerOptions: {
          generate: "ssr",
        },
      }),
      css({ output: false }),
      resolve(),
      commonjs(),
      production && terser(),
    ],
  },
];
