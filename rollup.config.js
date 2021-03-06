import resolve from "@rollup/plugin-node-resolve";
import { terser } from "rollup-plugin-terser";
import html from "@open-wc/rollup-plugin-html";
import replace from "@rollup/plugin-replace";
import strip from "@rollup/plugin-strip";
import copy from "rollup-plugin-copy";
import typescript from "@rollup/plugin-typescript";

export default {
  input: "index.html",
  output: {
    dir: "dist",
    format: "es",
    sourcemap: false
  },
  plugins: [
    resolve({
      exportConditions: ['production']
    }),
    replace({
      "preventAssignment": true,
      "process.env.NODE_ENV": JSON.stringify(
        process.env.NODE_ENV || "production"
      ),
    }),
    html(),
    typescript({
      tsconfig: "tsconfig.json"
    }),
    terser(),
    strip({
      functions: ["console.log"],
    }),
    copy({
      targets: [
        { src: "images/**", dest: "dist/images/" },
        { src: "styles/global.css", dest: "dist/styles/" },
        { src: "manifest.json", dest: "dist/" },
        { src: "main.e65ce0a5.js", dest: "dist/" }
      ],
    })
  ],
  preserveEntrySignatures: 'strict',
};
